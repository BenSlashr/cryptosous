/**
 * Données déclaratives pour les arbres de décision interactifs.
 * Wallet : "Quel wallet pour moi ?" — 5 questions, 5 produits
 * Exchange : "Quelle plateforme pour moi ?" — 5 questions, 6 produits
 */

export interface DecisionOption {
  label: string;
  description?: string;
}

export interface DecisionQuestion {
  question: string;
  options: DecisionOption[];
}

export interface DecisionProduct {
  slug: string;
  name: string;
  tagline: string;
  url: string;
}

/** scoring[questionIndex][answerIndex] = Record<productSlug, scoreDelta> */
export type ScoringMap = Record<string, number>[][];

export interface DecisionTreeConfig {
  title: string;
  subtitle: string;
  questions: DecisionQuestion[];
  products: DecisionProduct[];
  scoring: ScoringMap;
}

// ---------------------------------------------------------------------------
// Wallet decision tree
// ---------------------------------------------------------------------------

export const WALLET_TREE: DecisionTreeConfig = {
  title: 'Quel wallet pour moi ?',
  subtitle: 'Répondez à 5 questions pour trouver le hardware wallet adapté à votre profil.',
  questions: [
    {
      question: 'Quel est votre budget pour un hardware wallet ?',
      options: [
        { label: 'Moins de 150 €', description: 'Les modèles les plus accessibles' },
        { label: 'Entre 150 et 200 €', description: 'Le meilleur rapport qualité-prix' },
        { label: 'Plus de 200 €', description: 'Les modèles premium et haut de gamme' },
      ],
    },
    {
      question: "L'open source est-il important pour vous ?",
      options: [
        { label: "Oui, c'est un critère clé", description: 'Je veux pouvoir vérifier le code source' },
        { label: 'Pas une priorité', description: 'La sécurité certifiée me suffit' },
      ],
    },
    {
      question: 'Vous utiliserez votre wallet plutôt...',
      options: [
        { label: 'Avec un smartphone (Bluetooth)', description: 'Gérer mes cryptos depuis mon téléphone' },
        { label: 'Branché à un PC', description: 'Usage classique en filaire USB-C' },
      ],
    },
    {
      question: 'Préférez-vous un écran tactile ?',
      options: [
        { label: 'Oui, plus confortable', description: 'Navigation intuitive au doigt' },
        { label: 'Les boutons physiques suffisent', description: 'Simple et fiable' },
      ],
    },
    {
      question: 'Combien de cryptos différentes comptez-vous stocker ?',
      options: [
        { label: 'Surtout Bitcoin', description: 'Bitcoin uniquement ou presque' },
        { label: 'Portfolio diversifié (10+ cryptos)', description: 'Multi-chain : ETH, SOL, XRP...' },
      ],
    },
  ],
  products: [
    { slug: 'ledger-nano-x', name: 'Ledger Nano X', tagline: '149 € - Bluetooth, 5 500+ cryptos, Ledger Live', url: '/wallets/ledger-nano-x' },
    { slug: 'ledger-stax', name: 'Ledger Stax', tagline: '399 € - Écran E-Ink tactile, design premium', url: '/wallets/ledger-stax' },
    { slug: 'trezor-safe-5', name: 'Trezor Safe 5', tagline: '169 € - Open source, écran tactile, EAL6+', url: '/wallets/trezor-safe-5' },
    { slug: 'trezor-model-t', name: 'Trezor Model T', tagline: '179 € - Open source, Shamir Backup', url: '/wallets/trezor-model-t' },
    { slug: 'bitbox02', name: 'BitBox02', tagline: '149 € - 100% open source, fabrication suisse', url: '/wallets/bitbox02' },
  ],
  scoring: [
    // Q0 — Budget
    [
      { 'ledger-nano-x': 3, 'bitbox02': 3, 'trezor-model-t': -1, 'ledger-stax': -3 },           // < 150 €
      { 'trezor-safe-5': 3, 'trezor-model-t': 2, 'ledger-nano-x': 2, 'bitbox02': 2, 'ledger-stax': -3 }, // 150-200 €
      { 'ledger-stax': 3, 'trezor-safe-5': 1, 'trezor-model-t': 1, 'ledger-nano-x': 1, 'bitbox02': 1 },  // > 200 €
    ],
    // Q1 — Open source
    [
      { 'trezor-safe-5': 4, 'bitbox02': 4, 'trezor-model-t': 3, 'ledger-nano-x': -2, 'ledger-stax': -2 }, // Oui
      { 'ledger-nano-x': 1, 'ledger-stax': 1, 'trezor-safe-5': 1, 'trezor-model-t': 1, 'bitbox02': 1 },  // Non
    ],
    // Q2 — Smartphone vs PC
    [
      { 'ledger-nano-x': 4, 'ledger-stax': 4, 'trezor-safe-5': -2, 'trezor-model-t': -2, 'bitbox02': -2 }, // Bluetooth
      { 'trezor-safe-5': 2, 'bitbox02': 2, 'trezor-model-t': 2, 'ledger-nano-x': 1, 'ledger-stax': 1 },   // PC
    ],
    // Q3 — Écran tactile
    [
      { 'ledger-stax': 3, 'trezor-safe-5': 3, 'trezor-model-t': 2, 'ledger-nano-x': -1, 'bitbox02': -1 }, // Oui
      { 'ledger-nano-x': 2, 'bitbox02': 2, 'trezor-safe-5': 1, 'trezor-model-t': 1 },                     // Boutons
    ],
    // Q4 — Nombre de cryptos
    [
      { 'bitbox02': 3, 'trezor-safe-5': 2, 'trezor-model-t': 2, 'ledger-nano-x': 1, 'ledger-stax': 1 },    // Bitcoin
      { 'trezor-safe-5': 3, 'ledger-nano-x': 3, 'ledger-stax': 3, 'trezor-model-t': 2, 'bitbox02': -2 },   // Diversifié
    ],
  ],
};

// ---------------------------------------------------------------------------
// Exchange decision tree
// ---------------------------------------------------------------------------

export const EXCHANGE_TREE: DecisionTreeConfig = {
  title: 'Quelle plateforme pour moi ?',
  subtitle: 'Répondez à 5 questions pour trouver la plateforme crypto adaptée à votre profil.',
  questions: [
    {
      question: 'Quel est votre niveau en crypto ?',
      options: [
        { label: 'Débutant', description: 'Premier achat de crypto' },
        { label: 'Intermédiaire', description: 'Quelques trades à mon actif' },
        { label: 'Trader actif', description: 'Je trade régulièrement' },
      ],
    },
    {
      question: 'Quelle est votre priorité principale ?',
      options: [
        { label: 'Les frais les plus bas', description: 'Chaque centime compte' },
        { label: 'La sécurité maximale', description: 'Régulation, assurance, historique' },
        { label: "La simplicité d'usage", description: 'Acheter en 3 clics' },
      ],
    },
    {
      question: 'Quelles fonctionnalités recherchez-vous ?',
      options: [
        { label: 'Trading spot simple', description: 'Acheter et vendre des cryptos' },
        { label: 'Futures et dérivés', description: 'Levier, shorts, options' },
        { label: 'Copy trading', description: 'Répliquer les meilleurs traders' },
        { label: 'Épargne automatique (DCA)', description: 'Investir un montant fixe chaque semaine' },
      ],
    },
    {
      question: 'La régulation stricte est-elle obligatoire ?',
      options: [
        { label: 'Oui (PSAN, coté en bourse)', description: 'Conformité et protection consommateur' },
        { label: 'Pas prioritaire', description: "Les fonctionnalités passent d'abord" },
      ],
    },
    {
      question: 'Avez-vous besoin de...',
      options: [
        { label: 'Une carte bancaire crypto', description: 'Payer en crypto au quotidien' },
        { label: 'Accès à des actions et ETF', description: 'Investir au-delà des cryptos' },
        { label: 'Non, juste du trading', description: 'Achat et vente de cryptos uniquement' },
      ],
    },
  ],
  products: [
    { slug: 'binance', name: 'Binance', tagline: 'Frais 0.10%, 400+ cryptos, futures et copy trading', url: '/plateformes/binance' },
    { slug: 'coinbase', name: 'Coinbase', tagline: 'Coté au NASDAQ, interface intuitive, ultra-sécurisé', url: '/plateformes/coinbase' },
    { slug: 'kraken', name: 'Kraken', tagline: 'Jamais hacké depuis 2011, frais 0.16%, support 24/7', url: '/plateformes/kraken' },
    { slug: 'bybit', name: 'Bybit', tagline: 'Leader futures et copy trading, frais 0.10%', url: '/plateformes/bybit' },
    { slug: 'bitpanda', name: 'Bitpanda', tagline: 'Crypto + actions + ETF, régulation européenne', url: '/plateformes/bitpanda' },
    { slug: 'crypto-com', name: 'Crypto.com', tagline: 'Carte Visa métal, cashback CRO, 350+ cryptos', url: '/plateformes/crypto-com' },
  ],
  scoring: [
    // Q0 — Niveau
    [
      { 'coinbase': 4, 'bitpanda': 3, 'crypto-com': 2, 'kraken': 1, 'binance': -1, 'bybit': -1 },  // Débutant
      { 'kraken': 3, 'binance': 2, 'crypto-com': 2, 'bitpanda': 1, 'coinbase': 1, 'bybit': 1 },     // Intermédiaire
      { 'bybit': 4, 'binance': 3, 'kraken': 2, 'crypto-com': 1, 'coinbase': -1, 'bitpanda': -2 },    // Trader actif
    ],
    // Q1 — Priorité
    [
      { 'binance': 4, 'bybit': 3, 'crypto-com': 2, 'kraken': 1, 'coinbase': -2 },                    // Frais bas
      { 'kraken': 4, 'coinbase': 4, 'bitpanda': 2, 'crypto-com': 1, 'binance': 1, 'bybit': -1 },     // Sécurité
      { 'coinbase': 4, 'bitpanda': 3, 'crypto-com': 2, 'kraken': 1, 'binance': -1, 'bybit': -1 },    // Simplicité
    ],
    // Q2 — Fonctionnalités
    [
      { 'coinbase': 2, 'bitpanda': 2, 'kraken': 2, 'binance': 1, 'bybit': 1, 'crypto-com': 1 },      // Spot
      { 'bybit': 4, 'binance': 3, 'kraken': 2, 'crypto-com': 1, 'coinbase': -2, 'bitpanda': -3 },    // Futures
      { 'bybit': 5, 'binance': 3, 'crypto-com': -1, 'coinbase': -1, 'kraken': -2, 'bitpanda': -2 },  // Copy trading
      { 'bitpanda': 4, 'coinbase': 2, 'binance': 1, 'crypto-com': 1, 'kraken': 1 },                   // DCA
    ],
    // Q3 — Régulation
    [
      { 'coinbase': 4, 'kraken': 3, 'bitpanda': 3, 'binance': 1, 'crypto-com': 1, 'bybit': -2 },     // Oui stricte
      { 'bybit': 2, 'binance': 2, 'kraken': 1, 'coinbase': 1, 'crypto-com': 1, 'bitpanda': 1 },      // Pas prioritaire
    ],
    // Q4 — Besoins spécifiques
    [
      { 'crypto-com': 5, 'binance': 2, 'bitpanda': 1, 'coinbase': 1, 'kraken': -1, 'bybit': -1 },    // Carte bancaire
      { 'bitpanda': 5, 'binance': -1, 'kraken': -1, 'bybit': -1, 'crypto-com': -1 },                  // Actions & ETF
      { 'binance': 2, 'bybit': 2, 'kraken': 2, 'coinbase': 1, 'crypto-com': 1, 'bitpanda': 1 },      // Juste trading
    ],
  ],
};
