/**
 * Source unique des termes du glossaire pour :
 * - rehype-glossaire-tooltip (tooltips inline build-time)
 * - autoLink() dans internal-links.ts (liens in-text pages programmatiques)
 */

export interface GlossaireTerm {
  slug: string;
  title: string;
  shortDefinition: string;
  /** Variations textuelles a matcher (case-insensitive, word boundary) */
  matches: string[];
}

export const GLOSSAIRE_TERMS: GlossaireTerm[] = [
  {
    slug: 'blockchain',
    title: 'Blockchain',
    shortDefinition: 'Registre numerique decentralise et infalsifiable qui enregistre des transactions dans des blocs enchaines.',
    matches: ['blockchain', 'blockchains'],
  },
  {
    slug: 'bitcoin',
    title: 'Bitcoin',
    shortDefinition: 'Premiere cryptomonnaie decentralisee, creee en 2009 par Satoshi Nakamoto.',
    matches: ['Bitcoin'],
  },
  {
    slug: 'ethereum',
    title: 'Ethereum',
    shortDefinition: 'Blockchain programmable qui permet de creer des smart contracts et des applications decentralisees.',
    matches: ['Ethereum'],
  },
  {
    slug: 'proof-of-stake',
    title: 'Proof of Stake',
    shortDefinition: 'Mecanisme de consensus ou les validateurs mettent en jeu leurs tokens pour securiser le reseau.',
    matches: ['proof of stake', 'proof-of-stake', 'PoS'],
  },
  {
    slug: 'smart-contract',
    title: 'Smart Contract',
    shortDefinition: 'Programme autonome deploye sur une blockchain qui s\'execute automatiquement quand des conditions sont remplies.',
    matches: ['smart contract', 'smart contracts'],
  },
  {
    slug: 'liquidity-pool',
    title: 'Liquidity Pool',
    shortDefinition: 'Reserve de tokens verrouillee dans un smart contract qui permet les echanges decentralises sur un DEX.',
    matches: ['liquidity pool', 'liquidity pools'],
  },
  {
    slug: 'yield-farming',
    title: 'Yield Farming',
    shortDefinition: 'Strategie DeFi consistant a deplacer ses cryptos entre protocoles pour maximiser les rendements.',
    matches: ['yield farming'],
  },
  {
    slug: 'seed-phrase',
    title: 'Seed Phrase',
    shortDefinition: 'Suite de 12 ou 24 mots qui permet de recuperer l\'acces a un wallet crypto en cas de perte.',
    matches: ['seed phrase', 'seed phrases'],
  },
  {
    slug: 'gas-fees',
    title: 'Gas Fees',
    shortDefinition: 'Frais de transaction sur Ethereum payes aux validateurs pour executer des operations sur la blockchain.',
    matches: ['gas fees', 'gas fee', 'frais de gas'],
  },
  {
    slug: 'layer-2',
    title: 'Layer 2',
    shortDefinition: 'Solution construite au-dessus d\'une blockchain (Layer 1) pour augmenter sa vitesse et reduire ses frais.',
    matches: ['layer 2', 'layer-2', 'L2'],
  },
  {
    slug: 'tokenomics',
    title: 'Tokenomics',
    shortDefinition: 'Modele economique d\'un token : offre, distribution, utilite et mecanismes qui influencent sa valeur.',
    matches: ['tokenomics'],
  },
  {
    slug: 'staking',
    title: 'Staking',
    shortDefinition: 'Blocage de cryptomonnaies pour securiser un reseau Proof of Stake et recevoir des recompenses.',
    matches: ['staking'],
  },
  {
    slug: 'halving',
    title: 'Halving',
    shortDefinition: 'Evenement programme qui divise par deux la recompense des mineurs Bitcoin, tous les 210 000 blocs.',
    matches: ['halving', 'halvings'],
  },
  {
    slug: 'defi',
    title: 'DeFi',
    shortDefinition: 'Finance decentralisee : services financiers (pret, echange, epargne) fonctionnant sur blockchain sans intermediaires.',
    matches: ['DeFi'],
  },
  {
    slug: 'wallet',
    title: 'Wallet',
    shortDefinition: 'Portefeuille numerique qui stocke vos cles privees et permet d\'envoyer et recevoir des cryptomonnaies.',
    matches: ['wallet', 'wallets'],
  },
  {
    slug: 'airdrop',
    title: 'Airdrop',
    shortDefinition: 'Distribution gratuite de tokens a des utilisateurs, souvent pour recompenser les premiers adoptants.',
    matches: ['airdrop', 'airdrops'],
  },
  {
    slug: 'nft',
    title: 'NFT',
    shortDefinition: 'Token non fongible : certificat numerique unique sur blockchain prouvant la propriete d\'un actif digital.',
    matches: ['NFT', 'NFTs'],
  },
  {
    slug: 'dex',
    title: 'DEX',
    shortDefinition: 'Plateforme d\'echange decentralisee qui permet d\'echanger des cryptos directement entre utilisateurs.',
    matches: ['DEX'],
  },
  {
    slug: 'dao',
    title: 'DAO',
    shortDefinition: 'Organisation autonome decentralisee geree par ses membres via des votes on-chain et des smart contracts.',
    matches: ['DAO', 'DAOs'],
  },
  {
    slug: 'mica',
    title: 'MiCA',
    shortDefinition: 'Reglement europeen Markets in Crypto-Assets qui encadre les cryptomonnaies et les prestataires crypto en Europe.',
    matches: ['MiCA'],
  },
];

// Pre-sorted by longest match first (for correct greedy matching)
GLOSSAIRE_TERMS.sort((a, b) => {
  const maxA = Math.max(...a.matches.map(m => m.length));
  const maxB = Math.max(...b.matches.map(m => m.length));
  return maxB - maxA;
});

/** Flat list of { match, slug } for autoLink compatibility */
export function getGlossaireMatchEntries(): Array<{ match: string; slug: string }> {
  const entries: Array<{ match: string; slug: string }> = [];
  for (const term of GLOSSAIRE_TERMS) {
    for (const m of term.matches) {
      entries.push({ match: m, slug: term.slug });
    }
  }
  // Sort by match length descending
  entries.sort((a, b) => b.match.length - a.match.length);
  return entries;
}
