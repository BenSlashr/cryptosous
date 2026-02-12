import Papa from 'papaparse';
import type { Acquisition, Cession, CsvPlatform, CsvParseResult } from './types';
import { generateId } from './constants';

/**
 * Detecte la plateforme a partir des headers CSV.
 */
export function detectPlatform(headers: string[]): CsvPlatform {
  const h = headers.map((s) => s.trim().toLowerCase());
  if (h.includes('user_id') && h.includes('operation')) return 'binance';
  if (h.includes('transaction type') && h.includes('spot price at transaction')) return 'coinbase';
  if (h.includes('txid') && h.includes('refid') && h.includes('aclass')) return 'kraken';
  // Bybit: "Transaction Time", "Type", "Amount", "Coin"
  if (h.includes('transaction time') && h.includes('coin') && h.some((x) => x === 'type')) return 'bybit';
  // Bitpanda: "Transaction ID", "Transaction Type", "Amount Fiat"
  if (h.includes('transaction id') && h.includes('amount fiat')) return 'bitpanda';
  // Crypto.com: "Transaction Kind", "Transaction Description", "Native Amount"
  if (h.includes('transaction kind') && h.includes('native amount')) return 'cryptocom';
  // Ledger Live: "Operation Type", "Currency Ticker", "Operation Amount"
  if (h.includes('operation type') && h.includes('currency ticker') && h.includes('operation amount')) return 'ledger';
  // Trade Republic (TR Exporter): "Date"/"Datum", "Type"/"Typ", "Shares"/"Anzahl", "Amount"/"Betrag"
  if ((h.includes('shares') || h.includes('anzahl')) && (h.includes('amount') || h.includes('betrag')) && (h.includes('isin') || h.includes('asset'))) return 'traderepublic';
  return 'unknown';
}

/**
 * Parse un CSV brut et retourne les transactions.
 */
export function parseCsvFile(csvText: string): CsvParseResult {
  const warnings: string[] = [];

  // Coinbase met des lignes metadata avant les vraies donnees
  const lines = csvText.split('\n');
  let startLine = 0;
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    if (
      lines[i].toLowerCase().includes('timestamp') &&
      lines[i].toLowerCase().includes('transaction type')
    ) {
      startLine = i;
      break;
    }
  }
  const cleanedCsv = startLine > 0 ? lines.slice(startLine).join('\n') : csvText;

  const parsed = Papa.parse<Record<string, string>>(cleanedCsv, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  if (parsed.errors.length > 0) {
    warnings.push(`${parsed.errors.length} erreur(s) de parsing CSV.`);
  }

  const headers = parsed.meta.fields || [];
  const platform = detectPlatform(headers);

  if (platform === 'unknown') {
    warnings.push(
      'Plateforme non reconnue. Formats supportes : Binance, Coinbase, Kraken, Trade Republic, Bybit, Bitpanda, Crypto.com, Ledger Live. ' +
      'Les transactions ont ete importees au mieux - verifiez les montants.'
    );
    return parseGeneric(parsed.data, warnings);
  }

  const parsers: Record<string, (rows: Record<string, string>[], w: string[]) => CsvParseResult> = {
    binance: parseBinance,
    coinbase: parseCoinbase,
    kraken: parseKraken,
    bybit: parseBybit,
    bitpanda: parseBitpanda,
    cryptocom: parseCryptocom,
    ledger: parseLedger,
    traderepublic: parseTradeRepublic,
  };

  const parser = parsers[platform];
  return parser ? parser(parsed.data, warnings) : parseGeneric(parsed.data, warnings);
}

function parseBinance(rows: Record<string, string>[], warnings: string[]): CsvParseResult {
  const acquisitions: Acquisition[] = [];
  const cessions: Cession[] = [];
  let skippedCryptoCrypto = 0;

  for (const row of rows) {
    const op = (row['Operation'] || '').toLowerCase();
    const coin = row['Coin'] || '';
    const change = parseFloat(row['Change'] || '0');
    const dateStr = row['UTC_Time'] || '';

    if (!dateStr || isNaN(change)) continue;

    const date = dateStr.split(' ')[0]; // YYYY-MM-DD

    // Achats fiat (EUR depense pour acheter de la crypto)
    if (op.includes('buy') && coin === 'EUR' && change < 0) {
      acquisitions.push({
        id: generateId(),
        date,
        montantEur: Math.abs(change),
        description: 'Achat Binance',
      });
      continue;
    }

    // Ventes fiat (crypto vendue contre des EUR)
    if (op.includes('sell') && coin === 'EUR' && change > 0) {
      cessions.push({
        id: generateId(),
        date,
        description: `Vente Binance - ${change.toFixed(2)} EUR`,
        prixDeCession: change,
        valeurGlobalePortefeuille: 0, // A renseigner par l'utilisateur
      });
      continue;
    }

    // Depots fiat : ignores (deposer des EUR sur Binance n'est pas un achat de crypto)

    // Crypto-crypto : non imposable, on skip
    if (!['EUR', 'USDT', 'USDC', 'BUSD'].includes(coin) && !op.includes('deposit')) {
      skippedCryptoCrypto++;
    }
  }

  if (skippedCryptoCrypto > 0) {
    warnings.push(
      `${skippedCryptoCrypto} operations crypto-crypto ignorees (non imposables en France).`,
    );
  }

  if (cessions.length > 0) {
    warnings.push(
      'VGP (valeur globale du portefeuille) non disponible dans le CSV Binance. ' +
      'Ajustez le VGP manuellement pour chaque cession.',
    );
  }

  return { platform: 'binance', acquisitions, cessions, warnings };
}

function parseCoinbase(rows: Record<string, string>[], warnings: string[]): CsvParseResult {
  const acquisitions: Acquisition[] = [];
  const cessions: Cession[] = [];

  for (const row of rows) {
    const type = (row['Transaction Type'] || '').toLowerCase();
    const amount = parseFloat(row['Subtotal'] || row['Total (inclusive of fees)'] || '0');
    const currency = (row['Currency'] || '').toUpperCase();
    const dateStr = row['Timestamp'] || '';

    if (!dateStr || isNaN(amount)) continue;
    const date = dateStr.split('T')[0]; // ISO date

    if (type === 'buy' && amount > 0) {
      acquisitions.push({
        id: generateId(),
        date,
        montantEur: amount,
        description: `Achat ${row['Asset'] || 'crypto'} Coinbase`,
      });
    }

    if (type === 'sell' && amount > 0) {
      cessions.push({
        id: generateId(),
        date,
        description: `Vente ${row['Asset'] || 'crypto'} Coinbase`,
        prixDeCession: amount,
        valeurGlobalePortefeuille: 0,
      });
    }

    // Ignore send, receive, convert (crypto-crypto)
  }

  if (cessions.length > 0) {
    warnings.push(
      'VGP non disponible dans le CSV Coinbase. Ajustez manuellement.',
    );
  }

  return { platform: 'coinbase', acquisitions, cessions, warnings };
}

function parseKraken(rows: Record<string, string>[], warnings: string[]): CsvParseResult {
  const acquisitions: Acquisition[] = [];
  const cessions: Cession[] = [];

  // Kraken uses non-standard codes
  const normalizeAsset = (asset: string): string => {
    const map: Record<string, string> = {
      XXBT: 'BTC', XETH: 'ETH', XXRP: 'XRP', XLTC: 'LTC',
      ZEUR: 'EUR', ZUSD: 'USD', XXLM: 'XLM', XDOT: 'DOT',
    };
    return map[asset.toUpperCase()] || asset.toUpperCase();
  };

  // Group by refid
  const groups = new Map<string, typeof rows>();
  for (const row of rows) {
    const refid = row['refid'] || '';
    if (!refid) continue;
    if (!groups.has(refid)) groups.set(refid, []);
    groups.get(refid)!.push(row);
  }

  for (const [, group] of groups) {
    if (group.length === 0) continue;

    const type = (group[0]['type'] || '').toLowerCase();
    const dateStr = group[0]['time'] || '';
    const date = dateStr.split(' ')[0];

    if (type === 'trade') {
      let eurAmount = 0;
      let isBuy = false;
      let asset = '';

      for (const row of group) {
        const a = normalizeAsset(row['asset'] || '');
        const amount = parseFloat(row['amount'] || '0');

        if (a === 'EUR') {
          eurAmount = Math.abs(amount);
          isBuy = amount < 0; // EUR negative = buying crypto
        } else {
          asset = a;
        }
      }

      if (eurAmount > 0 && isBuy) {
        acquisitions.push({
          id: generateId(),
          date,
          montantEur: eurAmount,
          description: `Achat ${asset} Kraken`,
        });
      } else if (eurAmount > 0 && !isBuy) {
        cessions.push({
          id: generateId(),
          date,
          description: `Vente ${asset} Kraken`,
          prixDeCession: eurAmount,
          valeurGlobalePortefeuille: 0,
        });
      }
    }

    // Depots fiat ignores (deposer des EUR n'est pas un achat de crypto)
  }

  if (cessions.length > 0) {
    warnings.push(
      'VGP non disponible dans le CSV Kraken. Ajustez manuellement.',
    );
  }

  return { platform: 'kraken', acquisitions, cessions, warnings };
}

function parseBybit(rows: Record<string, string>[], warnings: string[]): CsvParseResult {
  const acquisitions: Acquisition[] = [];
  const cessions: Cession[] = [];

  for (const row of rows) {
    const type = (row['Type'] || '').toLowerCase();
    const coin = (row['Coin'] || '').toUpperCase();
    const amount = parseFloat(row['Amount'] || '0');
    const dateStr = row['Transaction Time'] || '';

    if (!dateStr || isNaN(amount) || amount === 0) continue;
    const date = dateStr.split(' ')[0].split('T')[0];

    if (type.includes('buy') && coin === 'EUR' && amount < 0) {
      acquisitions.push({
        id: generateId(),
        date,
        montantEur: Math.abs(amount),
        description: 'Achat Bybit',
      });
    }

    if (type.includes('sell') && coin === 'EUR' && amount > 0) {
      cessions.push({
        id: generateId(),
        date,
        description: `Vente Bybit - ${amount.toFixed(2)} EUR`,
        prixDeCession: amount,
        valeurGlobalePortefeuille: 0,
      });
    }
  }

  if (cessions.length > 0) {
    warnings.push('VGP non disponible dans le CSV Bybit. Ajustez manuellement.');
  }

  return { platform: 'bybit', acquisitions, cessions, warnings };
}

function parseBitpanda(rows: Record<string, string>[], warnings: string[]): CsvParseResult {
  const acquisitions: Acquisition[] = [];
  const cessions: Cession[] = [];

  for (const row of rows) {
    const type = (row['Transaction Type'] || '').toLowerCase();
    const amountFiat = parseFloat(row['Amount Fiat'] || '0');
    const asset = row['Asset'] || row['Cryptocoin'] || '';
    const dateStr = row['Timestamp'] || row['Date'] || '';

    if (!dateStr || isNaN(amountFiat) || amountFiat === 0) continue;
    const date = dateStr.split(' ')[0].split('T')[0];

    if (type === 'buy' && amountFiat > 0) {
      acquisitions.push({
        id: generateId(),
        date,
        montantEur: amountFiat,
        description: `Achat ${asset} Bitpanda`,
      });
    }

    if (type === 'sell' && amountFiat > 0) {
      cessions.push({
        id: generateId(),
        date,
        description: `Vente ${asset} Bitpanda`,
        prixDeCession: amountFiat,
        valeurGlobalePortefeuille: 0,
      });
    }
  }

  if (cessions.length > 0) {
    warnings.push('VGP non disponible dans le CSV Bitpanda. Ajustez manuellement.');
  }

  return { platform: 'bitpanda', acquisitions, cessions, warnings };
}

function parseCryptocom(rows: Record<string, string>[], warnings: string[]): CsvParseResult {
  const acquisitions: Acquisition[] = [];
  const cessions: Cession[] = [];

  for (const row of rows) {
    const kind = (row['Transaction Kind'] || '').toLowerCase();
    const nativeAmount = parseFloat(row['Native Amount'] || '0');
    const currency = (row['Native Currency'] || '').toUpperCase();
    const desc = row['Transaction Description'] || '';
    const dateStr = row['Timestamp UTC'] || row['Timestamp'] || '';

    if (!dateStr || isNaN(nativeAmount) || nativeAmount === 0) continue;
    const date = dateStr.split(' ')[0].split('T')[0];

    // Crypto.com: "viban_purchase" = achat, "viban_card_top_up" / "crypto_withdrawal" = vente
    if ((kind.includes('purchase') || kind === 'buy') && currency === 'EUR') {
      acquisitions.push({
        id: generateId(),
        date,
        montantEur: Math.abs(nativeAmount),
        description: `Achat Crypto.com${desc ? ' - ' + desc : ''}`,
      });
    }

    if ((kind.includes('withdrawal') || kind === 'sell' || kind.includes('top_up')) && currency === 'EUR' && nativeAmount > 0) {
      cessions.push({
        id: generateId(),
        date,
        description: `Vente Crypto.com${desc ? ' - ' + desc : ''}`,
        prixDeCession: nativeAmount,
        valeurGlobalePortefeuille: 0,
      });
    }
  }

  if (cessions.length > 0) {
    warnings.push('VGP non disponible dans le CSV Crypto.com. Ajustez manuellement.');
  }

  return { platform: 'cryptocom', acquisitions, cessions, warnings };
}

function parseLedger(rows: Record<string, string>[], warnings: string[]): CsvParseResult {
  const acquisitions: Acquisition[] = [];
  const cessions: Cession[] = [];

  for (const row of rows) {
    const opType = (row['Operation Type'] || '').toLowerCase();
    const ticker = (row['Currency Ticker'] || '').toUpperCase();
    const amount = parseFloat(row['Operation Amount'] || '0');
    const counterValue = parseFloat(row['Counter Value Amount'] || row['Countervalue Amount'] || '0');
    const dateStr = row['Operation Date'] || '';

    if (!dateStr || isNaN(amount)) continue;
    const date = dateStr.split(' ')[0].split('T')[0];
    const eurAmount = isNaN(counterValue) ? 0 : Math.abs(counterValue);

    // Ledger Live: "IN" = reception (potentiel achat), "OUT" = envoi (potentielle vente)
    if (opType === 'in' && eurAmount > 0) {
      acquisitions.push({
        id: generateId(),
        date,
        montantEur: eurAmount,
        description: `Reception ${ticker} Ledger`,
      });
    }

    if (opType === 'out' && eurAmount > 0) {
      cessions.push({
        id: generateId(),
        date,
        description: `Envoi ${ticker} Ledger`,
        prixDeCession: eurAmount,
        valeurGlobalePortefeuille: 0,
      });
    }
  }

  if (acquisitions.length > 0 || cessions.length > 0) {
    warnings.push(
      'Ledger Live exporte les receptions et envois, pas les achats/ventes. ' +
      'Verifiez que chaque ligne correspond bien a un achat ou une vente contre des EUR.',
    );
  }
  if (cessions.length > 0) {
    warnings.push('VGP non disponible dans le CSV Ledger Live. Ajustez manuellement.');
  }

  return { platform: 'ledger', acquisitions, cessions, warnings };
}

function parseTradeRepublic(rows: Record<string, string>[], warnings: string[]): CsvParseResult {
  const acquisitions: Acquisition[] = [];
  const cessions: Cession[] = [];

  for (const row of rows) {
    // Support EN (TR Exporter) and DE column names
    const type = (row['Type'] || row['Typ'] || '').toLowerCase();
    const asset = row['Asset'] || row['Name'] || row['ISIN'] || '';
    const amount = parseFloat(row['Amount'] || row['Betrag'] || '0');
    const dateStr = row['Date'] || row['Datum'] || '';

    if (!dateStr || isNaN(amount) || amount === 0) continue;
    // Handle both YYYY-MM-DD and DD.MM.YYYY formats
    let date = dateStr.split(' ')[0].split('T')[0];
    if (date.includes('.')) {
      const parts = date.split('.');
      if (parts.length === 3) date = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    const isBuy = type === 'buy' || type === 'kauf' || type === 'achat';
    const isSell = type === 'sell' || type === 'verkauf' || type === 'vente';

    if (isBuy && Math.abs(amount) > 0) {
      acquisitions.push({
        id: generateId(),
        date,
        montantEur: Math.abs(amount),
        description: `Achat ${asset} Trade Republic`,
      });
    }

    if (isSell && Math.abs(amount) > 0) {
      cessions.push({
        id: generateId(),
        date,
        description: `Vente ${asset} Trade Republic`,
        prixDeCession: Math.abs(amount),
        valeurGlobalePortefeuille: 0,
      });
    }
  }

  if (cessions.length > 0) {
    warnings.push('VGP non disponible dans le CSV Trade Republic. Ajustez manuellement.');
  }

  return { platform: 'traderepublic', acquisitions, cessions, warnings };
}

function parseGeneric(rows: Record<string, string>[], warnings: string[]): CsvParseResult {
  const acquisitions: Acquisition[] = [];
  const cessions: Cession[] = [];

  // Try to find common column names
  for (const row of rows) {
    const type = (row['type'] || row['Type'] || row['operation'] || '').toLowerCase();
    const amount = parseFloat(row['amount'] || row['Amount'] || row['montant'] || '0');
    const date = row['date'] || row['Date'] || row['timestamp'] || '';

    if (!date || isNaN(amount) || amount === 0) continue;
    const normalizedDate = date.split('T')[0].split(' ')[0];

    if (type.includes('buy') || type.includes('achat') || type.includes('deposit')) {
      acquisitions.push({
        id: generateId(),
        date: normalizedDate,
        montantEur: Math.abs(amount),
        description: `Import CSV - ${type}`,
      });
    }

    if (type.includes('sell') || type.includes('vente') || type.includes('withdrawal')) {
      cessions.push({
        id: generateId(),
        date: normalizedDate,
        description: `Import CSV - ${type}`,
        prixDeCession: Math.abs(amount),
        valeurGlobalePortefeuille: 0,
      });
    }
  }

  return { platform: 'unknown', acquisitions, cessions, warnings };
}
