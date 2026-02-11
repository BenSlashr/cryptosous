/**
 * Moteur de maillage interne cross-silo.
 * Résolution dynamique depuis les data sources existants.
 */

import { getExchangesSortedByScore, EXCHANGES } from './exchange-reviews';
import { getWalletsSortedByScore, WALLETS } from './wallet-reviews';
import { COMPARISON_COINS, getCoinSlug, CRYPTO_SPECS } from './comparison-templates';
import { CRYPTO_SEO } from './converter-seo';

// ── Types ──────────────────────────────────────────────────

export interface InternalLink {
  href: string;
  label: string;
}

export interface LinkGroup {
  title: string;
  links: InternalLink[];
}

// ── Résolution dynamique ───────────────────────────────────

function getTopExchanges(n = 3) {
  return getExchangesSortedByScore().slice(0, n).map(e => ({ slug: e.slug, name: e.name }));
}

function getTopWallets(n = 2) {
  return getWalletsSortedByScore().slice(0, n).map(w => ({ slug: w.slug, name: w.name }));
}

const TOP_CRYPTOS = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
];

// ── Mapping crypto ↔ glossaire ─────────────────────────────

const CATEGORY_TO_TERMS: Record<string, Array<{ slug: string; label: string }>> = {
  layer1: [
    { slug: 'blockchain', label: 'Blockchain' },
    { slug: 'proof-of-stake', label: 'Proof of Stake' },
    { slug: 'staking', label: 'Staking' },
  ],
  layer2: [
    { slug: 'layer-2', label: 'Layer 2' },
    { slug: 'ethereum', label: 'Ethereum' },
    { slug: 'gas-fees', label: 'Gas fees' },
  ],
  defi: [
    { slug: 'defi', label: 'DeFi' },
    { slug: 'liquidity-pool', label: 'Liquidity pool' },
    { slug: 'yield-farming', label: 'Yield farming' },
  ],
  meme: [
    { slug: 'blockchain', label: 'Blockchain' },
    { slug: 'tokenomics', label: 'Tokenomics' },
  ],
  infrastructure: [
    { slug: 'blockchain', label: 'Blockchain' },
    { slug: 'smart-contract', label: 'Smart contract' },
  ],
  exchange: [
    { slug: 'defi', label: 'DeFi' },
    { slug: 'staking', label: 'Staking' },
  ],
  gaming: [
    { slug: 'nft', label: 'NFT' },
    { slug: 'blockchain', label: 'Blockchain' },
  ],
  ai: [
    { slug: 'blockchain', label: 'Blockchain' },
    { slug: 'smart-contract', label: 'Smart contract' },
  ],
  storage: [
    { slug: 'blockchain', label: 'Blockchain' },
    { slug: 'smart-contract', label: 'Smart contract' },
  ],
  privacy: [
    { slug: 'blockchain', label: 'Blockchain' },
    { slug: 'wallet', label: 'Wallet' },
  ],
  payment: [
    { slug: 'blockchain', label: 'Blockchain' },
    { slug: 'staking', label: 'Staking' },
  ],
};

const CRYPTO_TERM_OVERRIDES: Record<string, Array<{ slug: string; label: string }>> = {
  bitcoin: [
    { slug: 'bitcoin', label: 'Bitcoin' },
    { slug: 'halving', label: 'Halving' },
    { slug: 'blockchain', label: 'Blockchain' },
  ],
  ethereum: [
    { slug: 'ethereum', label: 'Ethereum' },
    { slug: 'smart-contract', label: 'Smart contract' },
    { slug: 'gas-fees', label: 'Gas fees' },
  ],
};

function getGlossaryTermsForCrypto(cryptoId: string, category: string): Array<{ slug: string; label: string }> {
  return CRYPTO_TERM_OVERRIDES[cryptoId] ?? CATEGORY_TO_TERMS[category] ?? CATEGORY_TO_TERMS.layer1;
}

// ── 6 fonctions de liens cross-silo ────────────────────────

/** 1. Prix → où acheter + stocker + comprendre */
export function getLinksForCryptoPage(cryptoId: string, cryptoName: string, category: string): LinkGroup[] {
  const groups: LinkGroup[] = [];

  groups.push({
    title: `Où acheter ${cryptoName}`,
    links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
  });

  groups.push({
    title: 'Stocker en sécurité',
    links: getTopWallets(2).map(w => ({ href: `/wallets/${w.slug}`, label: w.name })),
  });

  const terms = getGlossaryTermsForCrypto(cryptoId, category);
  groups.push({
    title: 'Comprendre',
    links: terms.map(t => ({ href: `/glossaire/${t.slug}`, label: t.label })),
  });

  return groups;
}

/** 2. Comparer → acheter + convertir + comprendre */
export function getLinksForComparisonPage(
  coinIdA: string, coinIdB: string,
  nameA: string, nameB: string,
  catA: string, catB: string,
): LinkGroup[] {
  const groups: LinkGroup[] = [];

  groups.push({
    title: 'Où acheter',
    links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
  });

  // Converter links if coins have converter pages
  const converterLinks: InternalLink[] = [];
  if (coinIdA in CRYPTO_SEO) {
    const name = CRYPTO_SEO[coinIdA].name.toLowerCase();
    converterLinks.push({ href: `/convertisseur/${name}-en-euro`, label: `${nameA} → EUR` });
  }
  if (coinIdB in CRYPTO_SEO) {
    const name = CRYPTO_SEO[coinIdB].name.toLowerCase();
    converterLinks.push({ href: `/convertisseur/${name}-en-euro`, label: `${nameB} → EUR` });
  }
  if (converterLinks.length > 0) {
    groups.push({ title: 'Convertir', links: converterLinks });
  }

  // Glossary terms from both cryptos, deduplicated
  const termsA = getGlossaryTermsForCrypto(coinIdA, catA);
  const termsB = getGlossaryTermsForCrypto(coinIdB, catB);
  const seen = new Set<string>();
  const allTerms: Array<{ slug: string; label: string }> = [];
  for (const t of [...termsA, ...termsB]) {
    if (!seen.has(t.slug)) {
      seen.add(t.slug);
      allTerms.push(t);
    }
  }
  groups.push({
    title: 'Comprendre',
    links: allTerms.slice(0, 4).map(t => ({ href: `/glossaire/${t.slug}`, label: t.label })),
  });

  return groups;
}

/** 3. Convertisseur → prix + acheter + comparer + stocker */
export function getLinksForConverterPage(cryptoId: string, cryptoName: string): LinkGroup[] {
  const groups: LinkGroup[] = [];

  groups.push({
    title: 'Cours en direct',
    links: [{ href: `/prix/${cryptoId}`, label: `Prix ${cryptoName}` }],
  });

  groups.push({
    title: 'Où acheter',
    links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
  });

  // Comparison links
  if ((COMPARISON_COINS as readonly string[]).includes(cryptoId)) {
    const slug = getCoinSlug(cryptoId);
    const partner = cryptoId === 'bitcoin' ? 'ethereum' : 'bitcoin';
    const partnerSlug = getCoinSlug(partner);
    const partnerSpec = CRYPTO_SPECS[partner];
    if (partnerSpec) {
      const links: InternalLink[] = [
        { href: `/comparer/${cryptoId === 'bitcoin' ? 'bitcoin-vs-ethereum' : 'bitcoin-vs-' + slug}`, label: `vs ${partnerSpec.name}` },
      ];
      // Add a second pair if possible
      const second = cryptoId === 'ethereum' ? 'solana' : 'ethereum';
      if (second !== cryptoId) {
        const secondSpec = CRYPTO_SPECS[second];
        const secondSlug = getCoinSlug(second);
        if (secondSpec) {
          const pairSlug = [cryptoId, second].sort((a, b) => {
            const coins = [...COMPARISON_COINS];
            return coins.indexOf(a as any) - coins.indexOf(b as any);
          });
          links.push({ href: `/comparer/${getCoinSlug(pairSlug[0])}-vs-${getCoinSlug(pairSlug[1])}`, label: `vs ${secondSpec.name}` });
        }
      }
      groups.push({ title: 'Comparer', links });
    }
  }

  groups.push({
    title: 'Stocker',
    links: getTopWallets(2).map(w => ({ href: `/wallets/${w.slug}`, label: w.name })),
  });

  return groups;
}

/** 4. Glossaire → cryptos liées + plateformes + outils (+ wallets conditionnels) */
export function getLinksForGlossaryPage(termSlug: string, relatedCryptos: string[]): LinkGroup[] {
  const groups: LinkGroup[] = [];

  if (relatedCryptos.length > 0) {
    const cryptoNames: Record<string, string> = {
      bitcoin: 'Bitcoin', ethereum: 'Ethereum', solana: 'Solana',
      cardano: 'Cardano', ripple: 'XRP', binancecoin: 'BNB',
    };
    groups.push({
      title: 'Cryptos liées',
      links: relatedCryptos.slice(0, 3).map(id => ({
        href: `/prix/${id}`,
        label: cryptoNames[id] || id,
      })),
    });
  }

  groups.push({
    title: 'Plateformes',
    links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
  });

  // Wallets for wallet-related terms
  if (['wallet', 'seed-phrase'].includes(termSlug)) {
    groups.push({
      title: 'Wallets',
      links: getTopWallets(2).map(w => ({ href: `/wallets/${w.slug}`, label: w.name })),
    });
  }

  groups.push({
    title: 'Outils',
    links: [
      { href: '/outils/calculateur-dca', label: 'Calculateur DCA' },
      { href: '/outils/convertisseur', label: 'Convertisseur' },
    ],
  });

  return groups;
}

/** 5. Plateformes → cryptos populaires + wallets + comprendre + outils */
export function getLinksForExchangePage(_exchangeSlug: string): LinkGroup[] {
  return [
    {
      title: 'Cryptos populaires',
      links: TOP_CRYPTOS.slice(0, 4).map(c => ({ href: `/prix/${c.id}`, label: c.name })),
    },
    {
      title: 'Stocker vos cryptos',
      links: getTopWallets(2).map(w => ({ href: `/wallets/${w.slug}`, label: w.name })),
    },
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/staking', label: 'Staking' },
        { href: '/glossaire/defi', label: 'DeFi' },
        { href: '/glossaire/wallet', label: 'Wallet' },
      ],
    },
    {
      title: 'Outils',
      links: [
        { href: '/outils/calculateur-dca', label: 'Calculateur DCA' },
        { href: '/outils/convertisseur', label: 'Convertisseur' },
      ],
    },
  ];
}

/** 6. Wallets → acheter des cryptos + cours en direct + comprendre */
export function getLinksForWalletPage(_walletSlug: string): LinkGroup[] {
  return [
    {
      title: 'Acheter des cryptos',
      links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
    },
    {
      title: 'Cours en direct',
      links: TOP_CRYPTOS.slice(0, 4).map(c => ({ href: `/prix/${c.id}`, label: c.name })),
    },
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/wallet', label: 'Wallet' },
        { href: '/glossaire/seed-phrase', label: 'Seed phrase' },
        { href: '/glossaire/bitcoin', label: 'Bitcoin' },
      ],
    },
  ];
}

// ── 7-8. Bitcoin hub & guide cross-links ─────────────────────

/** 7. Bitcoin Hub → cours + exchanges + wallets + glossaire + outils */
export function getLinksForBitcoinHub(): LinkGroup[] {
  return [
    {
      title: 'Cours en direct',
      links: [
        { href: '/prix/bitcoin', label: 'Bitcoin' },
        { href: '/prix/ethereum', label: 'Ethereum' },
        { href: '/prix/solana', label: 'Solana' },
        { href: '/prix/cardano', label: 'Cardano' },
      ],
    },
    {
      title: 'Ou acheter',
      links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
    },
    {
      title: 'Stocker',
      links: getTopWallets(2).map(w => ({ href: `/wallets/${w.slug}`, label: w.name })),
    },
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/blockchain', label: 'Blockchain' },
        { href: '/glossaire/halving', label: 'Halving' },
        { href: '/glossaire/proof-of-stake', label: 'Proof of Stake' },
      ],
    },
    {
      title: 'Outils',
      links: [
        { href: '/outils/calculateur-dca', label: 'Calculateur DCA' },
        { href: '/outils/convertisseur', label: 'Convertisseur' },
      ],
    },
  ];
}

const BITCOIN_BRANCH_LINKS: Record<string, LinkGroup[]> = {
  acheter: [
    {
      title: 'Plateformes',
      links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
    },
  ],
  portefeuilles: [
    {
      title: 'Wallets',
      links: getTopWallets(2).map(w => ({ href: `/wallets/${w.slug}`, label: w.name })),
    },
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/wallet', label: 'Wallet' },
        { href: '/glossaire/seed-phrase', label: 'Seed phrase' },
      ],
    },
  ],
  investir: [
    {
      title: 'Outils',
      links: [
        { href: '/outils/calculateur-dca', label: 'Calculateur DCA' },
        { href: '/prix/bitcoin', label: 'Prix Bitcoin' },
      ],
    },
    {
      title: 'Plateformes',
      links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
    },
  ],
  fonctionnement: [
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/blockchain', label: 'Blockchain' },
        { href: '/glossaire/halving', label: 'Halving' },
        { href: '/glossaire/proof-of-stake', label: 'Proof of Stake' },
      ],
    },
  ],
  securite: [
    {
      title: 'Wallets',
      links: getTopWallets(2).map(w => ({ href: `/wallets/${w.slug}`, label: w.name })),
    },
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/wallet', label: 'Wallet' },
        { href: '/glossaire/seed-phrase', label: 'Seed phrase' },
      ],
    },
  ],
  vendre: [
    {
      title: 'Plateformes',
      links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
    },
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/staking', label: 'Staking' },
        { href: '/glossaire/defi', label: 'DeFi' },
      ],
    },
  ],
  lightning: [
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/blockchain', label: 'Blockchain' },
        { href: '/glossaire/layer-2', label: 'Layer 2' },
      ],
    },
    {
      title: 'Wallets',
      links: getTopWallets(2).map(w => ({ href: `/wallets/${w.slug}`, label: w.name })),
    },
  ],
  minage: [
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/blockchain', label: 'Blockchain' },
        { href: '/glossaire/halving', label: 'Halving' },
      ],
    },
    {
      title: 'Cours en direct',
      links: [{ href: '/prix/bitcoin', label: 'Prix Bitcoin' }],
    },
  ],
  apprendre: [
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/blockchain', label: 'Blockchain' },
        { href: '/glossaire/bitcoin', label: 'Bitcoin' },
        { href: '/glossaire/halving', label: 'Halving' },
      ],
    },
    {
      title: 'Plateformes',
      links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
    },
  ],
  histoire: [
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/blockchain', label: 'Blockchain' },
        { href: '/glossaire/bitcoin', label: 'Bitcoin' },
        { href: '/glossaire/halving', label: 'Halving' },
      ],
    },
  ],
  reglementation: [
    {
      title: 'Comprendre',
      links: [
        { href: '/glossaire/mica', label: 'MiCA' },
        { href: '/glossaire/defi', label: 'DeFi' },
      ],
    },
    {
      title: 'Plateformes',
      links: getTopExchanges(3).map(e => ({ href: `/plateformes/${e.slug}`, label: e.name })),
    },
  ],
};

/** 8. Bitcoin Guide → contextual by branch + always hub + outils */
export function getLinksForBitcoinGuide(branch: string): LinkGroup[] {
  const groups: LinkGroup[] = [];

  const branchLinks = BITCOIN_BRANCH_LINKS[branch];
  if (branchLinks) {
    groups.push(...branchLinks);
  }

  groups.push({
    title: 'Guide Bitcoin',
    links: [{ href: '/bitcoin', label: 'Hub Bitcoin' }],
  });

  // Avoid duplicate outils if branch already added them
  if (branch !== 'investir') {
    groups.push({
      title: 'Outils',
      links: [
        { href: '/outils/calculateur-dca', label: 'Calculateur DCA' },
        { href: '/outils/convertisseur', label: 'Convertisseur' },
      ],
    });
  }

  return groups;
}

// ── autoLink — liens in-text dans le contenu éditorial ─────

interface TermEntry {
  match: string;
  href: string;
}

let _termDictionary: TermEntry[] | null = null;

function buildTermDictionary(): TermEntry[] {
  const entries: TermEntry[] = [];

  // Glossary terms
  const glossaryTerms: Array<{ match: string; slug: string }> = [
    { match: 'blockchain', slug: 'blockchain' },
    { match: 'proof of stake', slug: 'proof-of-stake' },
    { match: 'PoS', slug: 'proof-of-stake' },
    { match: 'staking', slug: 'staking' },
    { match: 'DeFi', slug: 'defi' },
    { match: 'DEX', slug: 'dex' },
    { match: 'smart contract', slug: 'smart-contract' },
    { match: 'smart contracts', slug: 'smart-contract' },
    { match: 'gas fees', slug: 'gas-fees' },
    { match: 'halving', slug: 'halving' },
    { match: 'layer 2', slug: 'layer-2' },
    { match: 'layer-2', slug: 'layer-2' },
    { match: 'L2', slug: 'layer-2' },
    { match: 'NFT', slug: 'nft' },
    { match: 'NFTs', slug: 'nft' },
    { match: 'seed phrase', slug: 'seed-phrase' },
    { match: 'tokenomics', slug: 'tokenomics' },
    { match: 'yield farming', slug: 'yield-farming' },
    { match: 'liquidity pool', slug: 'liquidity-pool' },
    { match: 'airdrop', slug: 'airdrop' },
    { match: 'airdrops', slug: 'airdrop' },
    { match: 'DAO', slug: 'dao' },
    { match: 'MiCA', slug: 'mica' },
    { match: 'wallet', slug: 'wallet' },
  ];

  for (const t of glossaryTerms) {
    entries.push({ match: t.match, href: `/glossaire/${t.slug}` });
  }

  // Exchanges (dynamic)
  for (const e of Object.values(EXCHANGES)) {
    entries.push({ match: e.name, href: `/plateformes/${e.slug}` });
  }

  // Wallets (dynamic)
  for (const w of Object.values(WALLETS)) {
    entries.push({ match: w.name, href: `/wallets/${w.slug}` });
  }

  // Sort by match length descending (longer matches first)
  entries.sort((a, b) => b.match.length - a.match.length);

  return entries;
}

function getTermDictionary(): TermEntry[] {
  if (!_termDictionary) {
    _termDictionary = buildTermDictionary();
  }
  return _termDictionary;
}

/**
 * Auto-link editorial text: replaces first occurrence of known terms with anchor tags.
 * - Max 5 links per text block
 * - Case-insensitive matching, preserves original case
 * - Skips terms already inside <a> tags
 * - Skips terms shorter than 3 characters
 * - Optional currentPath to avoid self-linking
 */
export function autoLink(text: string, currentPath?: string): string {
  if (!text) return text;

  const dictionary = getTermDictionary();
  let result = text;
  let linkCount = 0;
  const maxLinks = 5;

  for (const entry of dictionary) {
    if (linkCount >= maxLinks) break;
    if (entry.match.length < 3) continue;
    if (currentPath && entry.href === currentPath) continue;

    // Build case-insensitive regex with word boundaries
    const escaped = entry.match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<![<\\/a-zA-Z"=])\\b(${escaped})\\b(?![^<]*<\\/a>)(?![^<]*">)`, 'i');

    const match = result.match(regex);
    if (match && match.index !== undefined) {
      const original = match[1];
      const link = `<a href="${entry.href}" class="text-gold underline underline-offset-2 hover:text-gold-light transition-colors">${original}</a>`;
      result = result.slice(0, match.index) + link + result.slice(match.index + original.length);
      linkCount++;
    }
  }

  return result;
}
