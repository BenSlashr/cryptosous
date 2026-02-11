import { useState, useEffect, useCallback } from 'react';

export const POPULAR_COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
];

export const CURRENCIES = [
  { code: 'eur', symbol: '\u20AC', name: 'Euro' },
  { code: 'usd', symbol: '$', name: 'Dollar US' },
  { code: 'gbp', symbol: '\u00A3', name: 'Livre Sterling' },
  { code: 'chf', symbol: 'CHF', name: 'Franc Suisse' },
];

interface PriceData {
  [key: string]: { [currency: string]: number };
}

interface CryptoConverterProps {
  defaultCoin?: string;
  defaultCurrency?: string;
}

export default function CryptoConverter({ defaultCoin = 'bitcoin', defaultCurrency = 'eur' }: CryptoConverterProps) {
  const [amount, setAmount] = useState('1');
  const [fromCoin, setFromCoin] = useState(defaultCoin);
  const [toCurrency, setToCurrency] = useState(defaultCurrency);
  const [prices, setPrices] = useState<PriceData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');

  const fetchPrices = useCallback(async () => {
    try {
      setError('');
      const ids = POPULAR_COINS.map((c) => c.id).join(',');
      const vs = CURRENCIES.map((c) => c.code).join(',');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vs}`
      );
      if (!res.ok) throw new Error('Erreur API');
      const data: PriceData = await res.json();
      setPrices(data);
      setLastUpdate(new Date().toLocaleTimeString('fr-FR'));
      setLoading(false);
    } catch {
      setError('Impossible de charger les prix. Réessayez dans quelques secondes.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const coinData = POPULAR_COINS.find((c) => c.id === fromCoin);
  const currencyData = CURRENCIES.find((c) => c.code === toCurrency);
  const price = prices[fromCoin]?.[toCurrency] ?? 0;
  const numAmount = parseFloat(amount) || 0;
  const result = numAmount * price;

  const formatNumber = (n: number) => {
    if (n >= 1000) return n.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
    if (n >= 1) return n.toLocaleString('fr-FR', { maximumFractionDigits: 4 });
    return n.toLocaleString('fr-FR', { maximumFractionDigits: 8 });
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
      {/* Result Display */}
      <div className="text-center mb-8 pb-6 border-b border-[var(--color-border)]">
        {loading ? (
          <div className="h-12 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-sm text-[var(--color-negative)]">{error}</p>
        ) : (
          <>
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              {numAmount} {coinData?.symbol} =
            </p>
            <p
              className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {currencyData?.symbol}
              {formatNumber(result)}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              1 {coinData?.symbol} = {currencyData?.symbol}
              {formatNumber(price)} - Mis à jour à {lastUpdate}
            </p>
          </>
        )}
      </div>

      {/* Input Controls */}
      <div className="space-y-4">
        {/* Amount + Crypto */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
            Montant
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="any"
              className="flex-grow px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]/30 transition-all text-lg font-mono"
              placeholder="1"
            />
            <select
              value={fromCoin}
              onChange={(e) => setFromCoin(e.target.value)}
              className="px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold)] cursor-pointer min-w-[140px]"
            >
              {POPULAR_COINS.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.symbol} - {coin.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center">
            <svg
              className="w-4 h-4 text-[var(--color-text-muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Currency */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
            Devise
          </label>
          <div className="grid grid-cols-4 gap-2">
            {CURRENCIES.map((cur) => (
              <button
                key={cur.code}
                onClick={() => setToCurrency(cur.code)}
                className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                  toCurrency === cur.code
                    ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                {cur.symbol} {cur.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick amounts */}
      <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-text-muted)] mb-2">Montants rapides</p>
        <div className="flex flex-wrap gap-2">
          {['0.1', '0.5', '1', '5', '10', '100'].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className="px-3 py-1.5 rounded-md text-xs font-mono border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] transition-all cursor-pointer"
            >
              {val} {coinData?.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Refresh */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={fetchPrices}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors cursor-pointer flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Rafraîchir les prix
        </button>
      </div>
    </div>
  );
}
