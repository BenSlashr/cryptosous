/**
 * Moteur de templates pour les pages comparateur crypto.
 * Génère 105 pages de comparaison à partir des 15 cryptos majeures.
 */

import type { CoinMarketData } from './crypto-templates';

type Category = 'layer1' | 'layer2' | 'defi' | 'meme' | 'infrastructure' | 'exchange' | 'stablecoin' | 'gaming' | 'ai' | 'storage' | 'privacy' | 'payment' | 'other';

// ── Top 15 cryptos pour comparaisons ──────────────────────
export const COMPARISON_COINS = [
  'bitcoin', 'ethereum', 'solana', 'ripple', 'binancecoin',
  'cardano', 'dogecoin', 'avalanche-2', 'polkadot', 'chainlink',
  'tron', 'litecoin', 'monero', 'stellar', 'sui',
] as const;

export type ComparisonCoinId = typeof COMPARISON_COINS[number];

// ── Données techniques statiques ──────────────────────────
export interface CryptoSpec {
  name: string;
  symbol: string;
  consensus: string;
  tps: string;
  blockTime: string;
  avgFee: string;
  smartContracts: boolean;
  launchYear: number;
  founder: string;
  useCase: string;
  maxSupply: string;
  category: Category;
  matchupType: string; // pour le template de comparaison
}

export const CRYPTO_SPECS: Record<string, CryptoSpec> = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    consensus: 'Proof of Work (PoW)',
    tps: '~7',
    blockTime: '~10 min',
    avgFee: '1-5 €',
    smartContracts: false,
    launchYear: 2009,
    founder: 'Satoshi Nakamoto',
    useCase: 'Réserve de valeur',
    maxSupply: '21 millions',
    category: 'layer1',
    matchupType: 'store-of-value',
  },
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    consensus: 'Proof of Stake (PoS)',
    tps: '~30',
    blockTime: '~12 sec',
    avgFee: '0,50-10 €',
    smartContracts: true,
    launchYear: 2015,
    founder: 'Vitalik Buterin',
    useCase: 'Plateforme de smart contracts',
    maxSupply: 'Illimité (émission régulée)',
    category: 'layer1',
    matchupType: 'smart-contracts',
  },
  solana: {
    name: 'Solana',
    symbol: 'SOL',
    consensus: 'Proof of History + PoS',
    tps: '~65 000',
    blockTime: '~0,4 sec',
    avgFee: '< 0,01 €',
    smartContracts: true,
    launchYear: 2020,
    founder: 'Anatoly Yakovenko',
    useCase: 'Blockchain haute performance',
    maxSupply: 'Illimité (inflation décroissante)',
    category: 'layer1',
    matchupType: 'high-perf-l1',
  },
  ripple: {
    name: 'XRP',
    symbol: 'XRP',
    consensus: 'XRP Ledger Consensus',
    tps: '~1 500',
    blockTime: '~3-5 sec',
    avgFee: '< 0,01 €',
    smartContracts: false,
    launchYear: 2012,
    founder: 'Chris Larsen & Jed McCaleb',
    useCase: 'Paiements transfrontaliers',
    maxSupply: '100 milliards',
    category: 'payment',
    matchupType: 'payment',
  },
  binancecoin: {
    name: 'BNB',
    symbol: 'BNB',
    consensus: 'Proof of Staked Authority',
    tps: '~160',
    blockTime: '~3 sec',
    avgFee: '0,05-0,50 €',
    smartContracts: true,
    launchYear: 2017,
    founder: 'Changpeng Zhao (CZ)',
    useCase: 'Token d\'exchange + BNB Chain',
    maxSupply: '200 millions (burns réguliers)',
    category: 'exchange',
    matchupType: 'exchange-l1',
  },
  cardano: {
    name: 'Cardano',
    symbol: 'ADA',
    consensus: 'Ouroboros PoS',
    tps: '~250',
    blockTime: '~20 sec',
    avgFee: '0,15-0,30 €',
    smartContracts: true,
    launchYear: 2017,
    founder: 'Charles Hoskinson',
    useCase: 'Blockchain académique peer-reviewed',
    maxSupply: '45 milliards',
    category: 'layer1',
    matchupType: 'smart-contracts',
  },
  dogecoin: {
    name: 'Dogecoin',
    symbol: 'DOGE',
    consensus: 'Proof of Work (Scrypt)',
    tps: '~33',
    blockTime: '~1 min',
    avgFee: '< 0,05 €',
    smartContracts: false,
    launchYear: 2013,
    founder: 'Billy Markus & Jackson Palmer',
    useCase: 'Meme coin / Pourboires',
    maxSupply: 'Illimité (5 Md/an)',
    category: 'meme',
    matchupType: 'meme',
  },
  'avalanche-2': {
    name: 'Avalanche',
    symbol: 'AVAX',
    consensus: 'Snow Protocol (PoS)',
    tps: '~4 500',
    blockTime: '~2 sec',
    avgFee: '0,02-0,50 €',
    smartContracts: true,
    launchYear: 2020,
    founder: 'Emin Gün Sirer',
    useCase: 'Subnets & DeFi institutionnelle',
    maxSupply: '720 millions',
    category: 'layer1',
    matchupType: 'high-perf-l1',
  },
  polkadot: {
    name: 'Polkadot',
    symbol: 'DOT',
    consensus: 'Nominated PoS (NPoS)',
    tps: '~1 000',
    blockTime: '~6 sec',
    avgFee: '0,01-0,10 €',
    smartContracts: true,
    launchYear: 2020,
    founder: 'Gavin Wood',
    useCase: 'Interopérabilité multi-chaînes',
    maxSupply: 'Illimité (inflation ~7%/an)',
    category: 'layer1',
    matchupType: 'interop',
  },
  chainlink: {
    name: 'Chainlink',
    symbol: 'LINK',
    consensus: 'Réseau d\'oracles décentralisé',
    tps: 'N/A (oracle)',
    blockTime: 'N/A (oracle)',
    avgFee: 'N/A (oracle)',
    smartContracts: false,
    launchYear: 2017,
    founder: 'Sergey Nazarov',
    useCase: 'Oracles de données pour smart contracts',
    maxSupply: '1 milliard',
    category: 'infrastructure',
    matchupType: 'infrastructure',
  },
  tron: {
    name: 'TRON',
    symbol: 'TRX',
    consensus: 'Delegated PoS (DPoS)',
    tps: '~2 000',
    blockTime: '~3 sec',
    avgFee: '< 0,01 €',
    smartContracts: true,
    launchYear: 2017,
    founder: 'Justin Sun',
    useCase: 'Contenu décentralisé & stablecoins',
    maxSupply: 'Déflationniste (burns)',
    category: 'layer1',
    matchupType: 'smart-contracts',
  },
  litecoin: {
    name: 'Litecoin',
    symbol: 'LTC',
    consensus: 'Proof of Work (Scrypt)',
    tps: '~56',
    blockTime: '~2,5 min',
    avgFee: '< 0,05 €',
    smartContracts: false,
    launchYear: 2011,
    founder: 'Charlie Lee',
    useCase: 'Paiements rapides (argent digital)',
    maxSupply: '84 millions',
    category: 'payment',
    matchupType: 'payment',
  },
  monero: {
    name: 'Monero',
    symbol: 'XMR',
    consensus: 'Proof of Work (RandomX)',
    tps: '~30',
    blockTime: '~2 min',
    avgFee: '< 0,01 €',
    smartContracts: false,
    launchYear: 2014,
    founder: 'Communauté anonyme',
    useCase: 'Transactions privées',
    maxSupply: 'Illimité (tail emission)',
    category: 'privacy',
    matchupType: 'privacy',
  },
  stellar: {
    name: 'Stellar',
    symbol: 'XLM',
    consensus: 'Stellar Consensus Protocol (SCP)',
    tps: '~1 000',
    blockTime: '~5 sec',
    avgFee: '< 0,001 €',
    smartContracts: true,
    launchYear: 2014,
    founder: 'Jed McCaleb',
    useCase: 'Paiements internationaux & tokenisation',
    maxSupply: '50 milliards',
    category: 'payment',
    matchupType: 'payment',
  },
  sui: {
    name: 'Sui',
    symbol: 'SUI',
    consensus: 'Delegated PoS (Narwhal & Bullshark)',
    tps: '~120 000',
    blockTime: '~0,5 sec',
    avgFee: '< 0,01 €',
    smartContracts: true,
    launchYear: 2023,
    founder: 'Mysten Labs (ex-Meta)',
    useCase: 'Blockchain orientée objets Move',
    maxSupply: '10 milliards',
    category: 'layer1',
    matchupType: 'high-perf-l1',
  },
};

// ── Mapping CoinGecko ID → slug pour les paires ──────────
export function getCoinSlug(coingeckoId: string): string {
  const map: Record<string, string> = {
    bitcoin: 'bitcoin',
    ethereum: 'ethereum',
    solana: 'solana',
    ripple: 'xrp',
    binancecoin: 'bnb',
    cardano: 'cardano',
    dogecoin: 'dogecoin',
    'avalanche-2': 'avalanche',
    polkadot: 'polkadot',
    chainlink: 'chainlink',
    tron: 'tron',
    litecoin: 'litecoin',
    monero: 'monero',
    stellar: 'stellar',
    sui: 'sui',
  };
  return map[coingeckoId] || coingeckoId;
}

// ── Génération des paires ──────────────────────────────────
export interface ComparisonPair {
  coinA: string; // coingecko id
  coinB: string;
  slug: string;  // "bitcoin-vs-ethereum"
  specA: CryptoSpec;
  specB: CryptoSpec;
}

export function generateAllPairs(): ComparisonPair[] {
  const pairs: ComparisonPair[] = [];
  const coins = [...COMPARISON_COINS];

  for (let i = 0; i < coins.length; i++) {
    for (let j = i + 1; j < coins.length; j++) {
      // Ordered by position in list (which is market cap order)
      const coinA = coins[i];
      const coinB = coins[j];
      const specA = CRYPTO_SPECS[coinA];
      const specB = CRYPTO_SPECS[coinB];
      if (!specA || !specB) continue;

      pairs.push({
        coinA,
        coinB,
        slug: `${getCoinSlug(coinA)}-vs-${getCoinSlug(coinB)}`,
        specA,
        specB,
      });
    }
  }
  return pairs;
}

// ── Types pour les pages générées ──────────────────────────
export interface TechRow {
  label: string;
  coinA: string;
  coinB: string;
  winner: 'a' | 'b' | 'tie';
}

export interface ComparisonPage {
  slug: string;
  specA: CryptoSpec;
  specB: CryptoSpec;
  coinIdA: string;
  coinIdB: string;
  metaTitle: string;
  metaDescription: string;
  keyTakeaways: string[];
  introText: string;
  techComparison: TechRow[];
  whatIsA: string;
  whatIsB: string;
  useCases: string;
  investmentAngle: string;
  verdict: string;
  faq: Array<{ q: string; a: string }>;
}

// ── Génération du contenu ──────────────────────────────────

function getMatchupLabel(a: CryptoSpec, b: CryptoSpec): string {
  if (a.matchupType === b.matchupType) return 'same-type';
  const types = new Set([a.matchupType, b.matchupType]);
  if (types.has('store-of-value') && types.has('smart-contracts')) return 'btc-vs-platform';
  if (types.has('meme')) return 'meme-vs-fundamental';
  if (types.has('payment')) return 'payment-matchup';
  if (types.has('privacy')) return 'privacy-matchup';
  if (types.has('infrastructure')) return 'infra-matchup';
  return 'generic';
}

function generateTechComparison(a: CryptoSpec, b: CryptoSpec): TechRow[] {
  const rows: TechRow[] = [
    {
      label: 'Consensus',
      coinA: a.consensus,
      coinB: b.consensus,
      winner: 'tie',
    },
    {
      label: 'Transactions/sec (TPS)',
      coinA: a.tps,
      coinB: b.tps,
      winner: compareTps(a.tps, b.tps),
    },
    {
      label: 'Temps de bloc',
      coinA: a.blockTime,
      coinB: b.blockTime,
      winner: compareBlockTime(a.blockTime, b.blockTime),
    },
    {
      label: 'Frais moyens',
      coinA: a.avgFee,
      coinB: b.avgFee,
      winner: compareFees(a.avgFee, b.avgFee),
    },
    {
      label: 'Smart Contracts',
      coinA: a.smartContracts ? 'Oui' : 'Non',
      coinB: b.smartContracts ? 'Oui' : 'Non',
      winner: a.smartContracts === b.smartContracts ? 'tie' : (a.smartContracts ? 'a' : 'b'),
    },
    {
      label: 'Année de lancement',
      coinA: String(a.launchYear),
      coinB: String(b.launchYear),
      winner: 'tie',
    },
    {
      label: 'Supply max',
      coinA: a.maxSupply,
      coinB: b.maxSupply,
      winner: 'tie',
    },
  ];
  return rows;
}

function extractNumeric(s: string): number {
  const match = s.replace(/\s/g, '').match(/[\d,.]+/);
  if (!match) return 0;
  return parseFloat(match[0].replace(',', '.'));
}

function compareTps(a: string, b: string): 'a' | 'b' | 'tie' {
  const na = extractNumeric(a);
  const nb = extractNumeric(b);
  if (na === 0 || nb === 0) return 'tie';
  if (na > nb * 1.2) return 'a';
  if (nb > na * 1.2) return 'b';
  return 'tie';
}

function compareBlockTime(a: string, b: string): 'a' | 'b' | 'tie' {
  // Lower is better
  const na = extractNumeric(a);
  const nb = extractNumeric(b);
  if (na === 0 || nb === 0) return 'tie';
  // Convert to seconds for comparison
  const secA = a.includes('min') ? na * 60 : na;
  const secB = b.includes('min') ? nb * 60 : nb;
  if (secA < secB * 0.8) return 'a';
  if (secB < secA * 0.8) return 'b';
  return 'tie';
}

function compareFees(a: string, b: string): 'a' | 'b' | 'tie' {
  if (a.includes('N/A') || b.includes('N/A')) return 'tie';
  const na = extractNumeric(a);
  const nb = extractNumeric(b);
  if (na === 0 && nb === 0) return 'tie';
  if (na < nb * 0.5) return 'a';
  if (nb < na * 0.5) return 'b';
  return 'tie';
}

function generateKeyTakeaways(a: CryptoSpec, b: CryptoSpec): string[] {
  const takeaways: string[] = [];

  takeaways.push(`${a.name} (${a.launchYear}) est plus ancien que ${b.name} (${b.launchYear}).`
    .replace(/^(.*)$/, a.launchYear <= b.launchYear ? '$1' : `${b.name} (${b.launchYear}) est plus ancien que ${a.name} (${a.launchYear}).`));

  takeaways.push(`${a.name} utilise le ${a.consensus}, ${b.name} le ${b.consensus}.`);

  if (a.smartContracts !== b.smartContracts) {
    const sc = a.smartContracts ? a : b;
    const noSc = a.smartContracts ? b : a;
    takeaways.push(`${sc.name} supporte les smart contracts, pas ${noSc.name}.`);
  }

  const tpsA = extractNumeric(a.tps);
  const tpsB = extractNumeric(b.tps);
  if (tpsA > 0 && tpsB > 0 && Math.abs(tpsA - tpsB) / Math.max(tpsA, tpsB) > 0.5) {
    const faster = tpsA > tpsB ? a : b;
    takeaways.push(`${faster.name} est nettement plus rapide en nombre de transactions par seconde.`);
  }

  takeaways.push(`Les deux projets ont des cas d'usage différents : ${a.useCase.toLowerCase()} vs ${b.useCase.toLowerCase()}.`);

  takeaways.push(`Le choix entre ${a.symbol} et ${b.symbol} dépend de votre profil d'investisseur et de vos objectifs.`);

  return takeaways.slice(0, 6);
}

function generateIntro(a: CryptoSpec, b: CryptoSpec): string {
  const year = new Date().getFullYear();
  const matchup = getMatchupLabel(a, b);

  if (matchup === 'btc-vs-platform') {
    return `${a.name} et ${b.name} sont deux des cryptomonnaies les plus populaires, mais elles répondent à des besoins très différents. ${a.name}, lancé en ${a.launchYear}, est la première cryptomonnaie et reste la référence en tant que réserve de valeur numérique. ${b.name}, créé en ${b.launchYear}, se positionne comme une plateforme programmable. Dans ce comparatif ${year}, nous analysons en détail leurs différences techniques, leurs cas d'usage et leur potentiel d'investissement.`;
  }
  if (matchup === 'meme-vs-fundamental') {
    const meme = a.category === 'meme' ? a : b;
    const other = a.category === 'meme' ? b : a;
    return `${meme.name} et ${other.name} représentent deux visions opposées de la crypto : la culture communautaire d'un côté, les fondamentaux technologiques de l'autre. ${meme.name}, le meme coin lancé en ${meme.launchYear}, tire sa valeur de sa communauté massive. ${other.name} (${other.launchYear}) mise sur ${other.useCase.toLowerCase()}. Faut-il investir dans l'un, l'autre, ou les deux ? Analyse complète.`;
  }

  return `${a.name} (${a.symbol}) et ${b.name} (${b.symbol}) font partie des cryptomonnaies les plus suivies du marché. Lancés respectivement en ${a.launchYear} et ${b.launchYear}, ces deux projets se distinguent par leur approche technique et leurs objectifs. ${a.name} se concentre sur ${a.useCase.toLowerCase()}, tandis que ${b.name} vise ${b.useCase.toLowerCase()}. Ce comparatif ${year} analyse point par point les différences clés pour vous aider à faire un choix éclairé.`;
}

function generateWhatIs(spec: CryptoSpec): string {
  return `${spec.name} (${spec.symbol}) est un projet crypto lancé en ${spec.launchYear} par ${spec.founder}. Son objectif principal : ${spec.useCase.toLowerCase()}. Le réseau repose sur le mécanisme de consensus ${spec.consensus} et ${spec.smartContracts ? 'supporte les smart contracts, permettant le développement d\'applications décentralisées' : 'se concentre sur sa fonction principale sans smart contracts natifs'}. L'offre maximale est fixée à ${spec.maxSupply.toLowerCase()}.`;
}

function generateUseCases(a: CryptoSpec, b: CryptoSpec): string {
  return `${a.name} est conçu pour ${a.useCase.toLowerCase()}. En pratique, les détenteurs de ${a.symbol} l'utilisent pour ${getUseCaseDetails(a)}.\n\n${b.name} se positionne sur ${b.useCase.toLowerCase()}. Les cas d'usage concrets du ${b.symbol} incluent ${getUseCaseDetails(b)}.\n\nCes différences montrent que ${a.name} et ${b.name} ne sont pas en compétition directe — ils répondent à des besoins distincts. Un portefeuille diversifié peut inclure les deux.`;
}

function getUseCaseDetails(spec: CryptoSpec): string {
  const details: Record<string, string> = {
    'store-of-value': 'le stockage de valeur à long terme, la protection contre l\'inflation, et les transferts de montants importants',
    'smart-contracts': 'le déploiement d\'applications DeFi, la création de NFT, et la participation à la gouvernance de l\'écosystème',
    'high-perf-l1': 'les applications nécessitant un débit élevé, les protocoles DeFi, et les projets NFT/gaming',
    'payment': 'les paiements rapides et peu coûteux, les transferts internationaux, et les micro-transactions',
    'exchange-l1': 'la réduction des frais de trading, l\'accès aux launchpads, et les transactions sur la BNB Chain',
    'meme': 'les pourboires en ligne, les paris communautaires, et le trading spéculatif',
    'infrastructure': 'l\'alimentation en données des smart contracts, la connexion entre blockchains et sources de données externes',
    'privacy': 'les transactions confidentielles, la protection de la vie privée financière, et le stockage de valeur anonyme',
    'interop': 'la connexion entre différentes blockchains, le déploiement de parachains spécialisées, et la gouvernance cross-chain',
  };
  return details[spec.matchupType] || 'divers cas d\'usage dans l\'écosystème crypto';
}

function generateInvestmentAngle(a: CryptoSpec, b: CryptoSpec): string {
  const year = new Date().getFullYear();
  return `D'un point de vue investissement en ${year}, ${a.name} et ${b.name} présentent des profils de risque différents.\n\n${a.name} (${a.symbol}), lancé en ${a.launchYear}, est un projet ${a.launchYear < 2015 ? 'mature avec un long historique' : 'qui a fait ses preuves'}. Son positionnement sur ${a.useCase.toLowerCase()} lui donne ${a.category === 'layer1' ? 'une base solide avec un écosystème développé' : 'un avantage dans sa niche'}.\n\n${b.name} (${b.symbol}), lancé en ${b.launchYear}, offre un profil ${b.launchYear >= 2020 ? 'plus récent avec un potentiel de croissance supérieur, mais aussi plus de risque' : 'établi dans l\'écosystème crypto'}. Son focus sur ${b.useCase.toLowerCase()} répond à ${b.category === 'meme' ? 'la demande de la communauté' : 'une demande croissante du marché'}.\n\nLa stratégie DCA (Dollar-Cost Averaging) reste recommandée pour les deux : investir un montant fixe à intervalles réguliers pour lisser le risque.`;
}

function generateVerdict(a: CryptoSpec, b: CryptoSpec): string {
  return `Il n'y a pas de "meilleur" entre ${a.name} et ${b.name} — tout dépend de vos objectifs.\n\nChoisissez ${a.name} (${a.symbol}) si vous cherchez : ${a.useCase.toLowerCase()}, ${a.launchYear < 2015 ? 'un projet avec un long track record' : 'une technologie éprouvée'}, ${a.category === 'layer1' ? 'et une exposition au cœur de l\'écosystème blockchain' : `et un positionnement fort sur ${a.useCase.toLowerCase()}`}.\n\nChoisissez ${b.name} (${b.symbol}) si vous cherchez : ${b.useCase.toLowerCase()}, ${b.launchYear >= 2020 ? 'un projet récent avec un fort potentiel' : 'un projet établi'}, ${b.category === 'meme' ? 'et un pari communautaire avec un potentiel viral' : `et une approche technique différente basée sur ${b.consensus.toLowerCase()}`}.\n\nBeaucoup d'investisseurs choisissent de détenir les deux pour diversifier leur exposition. La clé est de comprendre ce que vous achetez et pourquoi.`;
}

function generateFaq(a: CryptoSpec, b: CryptoSpec): Array<{ q: string; a: string }> {
  const year = new Date().getFullYear();
  return [
    {
      q: `Quelle est la différence principale entre ${a.name} et ${b.name} ?`,
      a: `${a.name} se concentre sur ${a.useCase.toLowerCase()} avec le consensus ${a.consensus}, tandis que ${b.name} vise ${b.useCase.toLowerCase()} via ${b.consensus}. Ce sont deux approches complémentaires de la blockchain.`,
    },
    {
      q: `${a.name} ou ${b.name} : lequel est le meilleur investissement en ${year} ?`,
      a: `Cela dépend de votre profil. ${a.name} est ${a.launchYear < 2015 ? 'plus établi et moins volatile' : 'un projet solide'}. ${b.name} offre ${b.category === 'meme' ? 'un potentiel spéculatif plus élevé mais plus de risque' : 'une exposition différente au marché crypto'}. La diversification reste la meilleure stratégie.`,
    },
    {
      q: `${a.name} ou ${b.name} : lequel est le plus rapide ?`,
      a: `En termes de vitesse brute, ${a.name} traite ${a.tps} transactions par seconde avec un temps de bloc de ${a.blockTime}, contre ${b.tps} TPS et ${b.blockTime} pour ${b.name}. La vitesse n'est qu'un critère parmi d'autres.`,
    },
    {
      q: `Peut-on acheter ${a.symbol} et ${b.symbol} en même temps ?`,
      a: `Oui, la plupart des plateformes crypto (Binance, Coinbase, Kraken) permettent d'acheter les deux. Diversifier entre ${a.symbol} et ${b.symbol} est une stratégie courante pour répartir le risque.`,
    },
    {
      q: `Quel est le moins cher en frais de transaction ?`,
      a: `${a.name} a des frais moyens de ${a.avgFee}, tandis que ${b.name} coûte environ ${b.avgFee} par transaction. ${a.avgFee.includes('N/A') || b.avgFee.includes('N/A') ? 'Notez que certains projets ont des frais non comparables directement.' : 'Les frais varient selon la congestion du réseau.'}`,
    },
    {
      q: `Lequel a le plus de potentiel à long terme ?`,
      a: `Les deux projets ont des catalyseurs différents. ${a.name} mise sur ${a.useCase.toLowerCase()} dans un marché ${a.category === 'layer1' ? 'en forte croissance' : 'de niche prometteur'}. ${b.name} cible ${b.useCase.toLowerCase()}. Le potentiel dépend de l'adoption réelle, de la régulation, et de l'évolution du marché global.`,
    },
    {
      q: `${a.name} et ${b.name} sont-ils concurrents ?`,
      a: a.category === b.category
        ? `Oui, ${a.name} et ${b.name} sont dans la même catégorie et se disputent une part du même marché. Chacun a ses avantages techniques et sa communauté.`
        : `Pas directement. ${a.name} (${a.useCase.toLowerCase()}) et ${b.name} (${b.useCase.toLowerCase()}) répondent à des besoins différents. Ils sont plutôt complémentaires.`,
    },
    {
      q: `Comment suivre les cours de ${a.symbol} et ${b.symbol} en temps réel ?`,
      a: `CryptoSous affiche les cours en direct de ${a.name} et ${b.name} en euros, avec graphiques interactifs et statistiques clés. Consultez nos pages prix dédiées pour chaque crypto.`,
    },
  ];
}

// ── Fonction principale ────────────────────────────────────

export function generateComparisonPage(pair: ComparisonPair): ComparisonPage {
  const { specA, specB, coinA, coinB, slug } = pair;
  const year = new Date().getFullYear();

  return {
    slug,
    specA,
    specB,
    coinIdA: coinA,
    coinIdB: coinB,
    metaTitle: `${specA.name} vs ${specB.name} : Comparatif ${year} — Cours, Stats et Analyse | CryptoSous`,
    metaDescription: `Comparatif détaillé ${specA.name} (${specA.symbol}) vs ${specB.name} (${specB.symbol}) en ${year}. Cours en direct, performances, technologie et analyse pour choisir entre ${specA.symbol} et ${specB.symbol}.`,
    keyTakeaways: generateKeyTakeaways(specA, specB),
    introText: generateIntro(specA, specB),
    techComparison: generateTechComparison(specA, specB),
    whatIsA: generateWhatIs(specA),
    whatIsB: generateWhatIs(specB),
    useCases: generateUseCases(specA, specB),
    investmentAngle: generateInvestmentAngle(specA, specB),
    verdict: generateVerdict(specA, specB),
    faq: generateFaq(specA, specB),
  };
}

// ── Top paires populaires (pour la page hub) ───────────────
export const POPULAR_PAIRS = [
  'bitcoin-vs-ethereum',
  'bitcoin-vs-solana',
  'ethereum-vs-solana',
  'bitcoin-vs-xrp',
  'ethereum-vs-cardano',
  'bitcoin-vs-bnb',
  'solana-vs-cardano',
  'dogecoin-vs-solana',
  'bitcoin-vs-litecoin',
  'ethereum-vs-avalanche',
];
