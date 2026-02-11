/**
 * Données SEO pour les pages de conversion programmatiques.
 * Chaque crypto possède du contenu unique pour éviter le duplicate content.
 */

export const CRYPTO_SEO: Record<string, {
  name: string;
  symbol: string;
  coingeckoId: string;
  description: string;
  introText: string;
  whyConvert: string;
  priceFactors: string;
  faq: { q: string; a: string }[];
}> = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    coingeckoId: 'bitcoin',
    description: 'le Bitcoin (BTC), la première cryptomonnaie créée en 2009 par Satoshi Nakamoto',
    introText:
      'Le Bitcoin reste la référence du marché crypto. Son cours influence directement toutes les autres cryptomonnaies. Avec une offre limitée à 21 millions d\'unités, le BTC fonctionne comme une réserve de valeur numérique adoptée par des institutions, des fonds d\'investissement et des millions de particuliers.',
    whyConvert:
      'Avant d\'acheter ou de vendre du Bitcoin, vérifier le cours actuel en euros ou en dollars évite les mauvaises surprises. Le prix du BTC bouge 24h/24, 7j/7 — un simple rafraîchissement peut changer la donne sur un achat de plusieurs centaines d\'euros.',
    priceFactors:
      'Le prix du Bitcoin dépend de la demande mondiale, de la politique monétaire (taux d\'intérêt, inflation), du halving (réduction de moitié des récompenses mineurs tous les 4 ans), et du sentiment général du marché. Les annonces réglementaires et les mouvements des baleines (gros détenteurs) provoquent des variations soudaines.',
    faq: [
      {
        q: 'Combien vaut 1 Bitcoin en euros aujourd\'hui ?',
        a: 'Le prix du Bitcoin change en permanence. Utilisez notre convertisseur en haut de page pour obtenir le cours actuel, mis à jour toutes les 30 secondes à partir des données CoinGecko.',
      },
      {
        q: 'Pourquoi le prix du Bitcoin fluctue autant ?',
        a: 'Le Bitcoin s\'échange sur un marché mondial ouvert 24h/24. Les variations viennent de l\'offre et la demande, des annonces macro-économiques, des décisions réglementaires et du comportement des gros investisseurs institutionnels.',
      },
      {
        q: 'Le Bitcoin est-il un bon investissement ?',
        a: 'Le Bitcoin a surperformé la plupart des actifs traditionnels depuis sa création. Mais il reste très volatil : des baisses de 50% ou plus sont déjà arrivées. Investissez uniquement ce que vous pouvez vous permettre de perdre.',
      },
    ],
  },
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    coingeckoId: 'ethereum',
    description: 'l\'Ethereum (ETH), la blockchain programmable qui propulse la DeFi et les smart contracts',
    introText:
      'Ethereum va au-delà du simple transfert de valeur. Sa blockchain permet d\'exécuter des smart contracts — des programmes autonomes qui alimentent la finance décentralisée (DeFi), les NFT et des milliers d\'applications. L\'ETH sert de carburant (gas) pour toutes ces opérations.',
    whyConvert:
      'Le cours de l\'ETH impacte directement le coût d\'utilisation du réseau Ethereum. Que vous fassiez du trading, du staking ou que vous utilisiez des protocoles DeFi, connaître le prix actuel en euros vous aide à évaluer vos frais et vos gains.',
    priceFactors:
      'Le prix de l\'Ethereum dépend de l\'activité sur le réseau (plus de transactions = plus de demande d\'ETH), du mécanisme de burn EIP-1559 (qui réduit l\'offre), de la concurrence des autres blockchains (Solana, Avalanche), et de l\'adoption des applications décentralisées.',
    faq: [
      {
        q: 'Combien vaut 1 Ethereum en euros ?',
        a: 'Le prix de l\'ETH varie en continu. Notre convertisseur affiche le cours en temps réel, actualisé toutes les 30 secondes via CoinGecko.',
      },
      {
        q: 'Quelle différence entre Ethereum et Bitcoin ?',
        a: 'Bitcoin est avant tout une réserve de valeur numérique. Ethereum est une plateforme programmable : elle permet de créer des applications décentralisées, des tokens, des protocoles DeFi. Les deux ont des usages complémentaires.',
      },
      {
        q: 'Les frais de gas Ethereum sont-ils élevés ?',
        a: 'Les frais varient selon la congestion du réseau. En période calme, une transaction coûte quelques centimes. En période de forte activité, les frais peuvent grimper. Les solutions Layer 2 (Arbitrum, Optimism) permettent de réduire ces coûts.',
      },
    ],
  },
  solana: {
    name: 'Solana',
    symbol: 'SOL',
    coingeckoId: 'solana',
    description: 'le Solana (SOL), la blockchain ultra-rapide avec des frais quasi nuls',
    introText:
      'Solana traite des milliers de transactions par seconde pour des frais inférieurs à un centime. Cette vitesse en fait la blockchain préférée des traders haute fréquence, des applications DeFi et de l\'écosystème NFT. Le SOL sert à payer les frais de réseau et au staking.',
    whyConvert:
      'Le SOL a connu des rallyes spectaculaires. Suivre son cours en euros permet d\'évaluer rapidement la valeur de vos positions ou de planifier un achat au bon moment.',
    priceFactors:
      'Le prix du SOL dépend de l\'adoption du réseau, du nombre de validateurs actifs, de la croissance de l\'écosystème DeFi et NFT sur Solana, et de la confiance des développeurs après les pannes passées du réseau.',
    faq: [
      {
        q: 'Combien vaut 1 Solana en euros ?',
        a: 'Le cours du SOL change en permanence. Consultez notre convertisseur en haut de page pour le prix actualisé toutes les 30 secondes.',
      },
      {
        q: 'Solana est-il fiable malgré les pannes passées ?',
        a: 'Solana a subi plusieurs interruptions de réseau par le passé. L\'équipe a depuis renforcé la stabilité. Le réseau n\'a pas connu de panne majeure depuis plusieurs mois, mais le risque technique reste un facteur à considérer.',
      },
      {
        q: 'Comment acheter du Solana ?',
        a: 'Vous pouvez acheter du SOL sur des plateformes comme Binance, Coinbase ou Kraken. Créez un compte, déposez des euros par virement ou carte, puis passez un ordre d\'achat.',
      },
    ],
  },
  binancecoin: {
    name: 'BNB',
    symbol: 'BNB',
    coingeckoId: 'binancecoin',
    description: 'le BNB, le token natif de la BNB Chain et de l\'écosystème Binance',
    introText:
      'Le BNB alimente l\'écosystème Binance, la plus grande plateforme d\'échange crypto au monde. Il sert à payer les frais de trading à tarif réduit sur Binance, à participer aux launchpads, et à exécuter des transactions sur la BNB Chain (anciennement Binance Smart Chain).',
    whyConvert:
      'Si vous tradez sur Binance, le BNB réduit vos frais de 25%. Connaître son cours en euros vous aide à estimer vos économies réelles sur les commissions.',
    priceFactors:
      'Le prix du BNB dépend du volume de trading sur Binance, des burns trimestriels (Binance détruit régulièrement des BNB pour réduire l\'offre), de l\'activité sur la BNB Chain, et de l\'environnement réglementaire autour de Binance.',
    faq: [
      {
        q: 'À quoi sert le BNB ?',
        a: 'Le BNB sert à payer les frais de trading sur Binance (avec réduction de 25%), à participer aux ventes de tokens sur Binance Launchpad, et à exécuter des smart contracts sur la BNB Chain.',
      },
      {
        q: 'Le BNB est-il un bon investissement ?',
        a: 'Le BNB profite directement du succès de Binance. Cependant, il est très lié à une entreprise centralisée, ce qui comporte des risques réglementaires. À évaluer selon votre tolérance au risque.',
      },
    ],
  },
  ripple: {
    name: 'XRP',
    symbol: 'XRP',
    coingeckoId: 'ripple',
    description: 'le XRP, le token créé par Ripple pour les paiements transfrontaliers',
    introText:
      'Le XRP facilite les transferts d\'argent internationaux en quelques secondes et pour des frais négligeables. Ripple, l\'entreprise derrière le XRP, travaille avec des banques et institutions financières pour remplacer les virements SWIFT traditionnels.',
    whyConvert:
      'Le XRP fait partie des cryptos les plus échangées au monde. Son cours évolue fortement selon les actualités juridiques (procès SEC) et les partenariats bancaires annoncés par Ripple.',
    priceFactors:
      'Le prix du XRP est influencé par les décisions de justice (procès Ripple vs SEC), les accords avec des banques internationales, et la réglementation des paiements transfrontaliers.',
    faq: [
      {
        q: 'Le XRP est-il légal ?',
        a: 'Le XRP est légal et disponible sur la majorité des exchanges. Le procès entre Ripple et la SEC aux États-Unis a apporté de la clarté juridique, mais la situation peut varier selon les pays.',
      },
      {
        q: 'Le XRP peut-il remplacer les virements bancaires ?',
        a: 'C\'est l\'objectif de Ripple. Le XRP permet des transferts internationaux en 3-5 secondes pour une fraction de centime, contre 2-5 jours et 15-50€ de frais pour un virement SWIFT classique.',
      },
    ],
  },
  cardano: {
    name: 'Cardano',
    symbol: 'ADA',
    coingeckoId: 'cardano',
    description: 'le Cardano (ADA), la blockchain construite sur la recherche académique',
    introText:
      'Cardano se distingue par son approche scientifique. Chaque mise à jour passe par un processus de peer-review académique avant déploiement. Le réseau utilise le Proof of Stake (Ouroboros) et développe progressivement ses capacités de smart contracts et de gouvernance.',
    whyConvert:
      'L\'ADA attire les investisseurs qui croient en une approche méthodique du développement blockchain. Son prix reste accessible comparé au BTC ou à l\'ETH, ce qui en fait un choix populaire pour les portefeuilles diversifiés.',
    priceFactors:
      'Le cours de l\'ADA dépend des mises à jour du réseau (hard forks), de l\'adoption des smart contracts Plutus, de la croissance de l\'écosystème DeFi sur Cardano, et de la concurrence avec les autres blockchains Layer 1.',
    faq: [
      {
        q: 'Qu\'est-ce qui rend Cardano différent ?',
        a: 'Cardano est la seule blockchain majeure dont le développement repose sur des publications académiques revues par des pairs. Cette approche ralentit le développement mais vise une fiabilité maximale.',
      },
      {
        q: 'Peut-on faire du staking avec l\'ADA ?',
        a: 'Oui. Le staking d\'ADA ne bloque pas vos fonds (liquid staking natif). Vous pouvez staker directement depuis votre wallet et gagner environ 3-5% par an en récompenses.',
      },
    ],
  },
  'avalanche-2': {
    name: 'Avalanche',
    symbol: 'AVAX',
    coingeckoId: 'avalanche-2',
    description: 'l\'Avalanche (AVAX), la blockchain rapide qui mise sur les sous-réseaux',
    introText:
      'Avalanche propose une architecture unique avec ses sous-réseaux (subnets) : des blockchains personnalisées qui tournent en parallèle. Le réseau offre une finalité de transaction inférieure à 2 secondes et attire de plus en plus d\'institutions financières.',
    whyConvert:
      'L\'AVAX a connu des mouvements de prix importants. Suivre son cours en euros aide à identifier les points d\'entrée pour les investisseurs qui ciblent les blockchains Layer 1 alternatives.',
    priceFactors:
      'Le prix de l\'AVAX dépend de la création de nouveaux subnets, des partenariats institutionnels (gaming, tokenisation d\'actifs), de l\'activité DeFi sur la C-Chain, et de la concurrence avec Ethereum et Solana.',
    faq: [
      {
        q: 'Qu\'est-ce qu\'un subnet Avalanche ?',
        a: 'Un subnet est une blockchain personnalisée qui tourne sur le réseau Avalanche. Les entreprises peuvent créer leur propre subnet avec des règles spécifiques (conformité, permissions), tout en profitant de la sécurité du réseau principal.',
      },
    ],
  },
  polkadot: {
    name: 'Polkadot',
    symbol: 'DOT',
    coingeckoId: 'polkadot',
    description: 'le Polkadot (DOT), le protocole qui connecte les blockchains entre elles',
    introText:
      'Polkadot résout le problème de l\'interopérabilité entre blockchains. Son architecture en parachains permet à différentes blockchains de communiquer et d\'échanger des données de façon sécurisée. Le DOT sert à la gouvernance, au staking et à l\'obtention de slots parachains.',
    whyConvert:
      'Le DOT est un token de gouvernance et d\'infrastructure. Son cours reflète la demande pour les slots parachains et la croissance de l\'écosystème multi-chain.',
    priceFactors:
      'Le prix du DOT dépend des enchères de parachains, du nombre de projets déployés sur le réseau, de la roadmap (passage aux coretime), et de la compétition avec des solutions d\'interopérabilité comme Cosmos.',
    faq: [
      {
        q: 'Comment fonctionne le staking de DOT ?',
        a: 'Le staking de DOT se fait via des nominateurs qui choisissent des validateurs. La période de déblocage est de 28 jours. Les rendements tournent autour de 10-14% par an selon les conditions du réseau.',
      },
    ],
  },
  chainlink: {
    name: 'Chainlink',
    symbol: 'LINK',
    coingeckoId: 'chainlink',
    description: 'le Chainlink (LINK), le réseau d\'oracles décentralisés qui alimente la DeFi',
    introText:
      'Chainlink fournit des données du monde réel aux smart contracts. Sans oracles, les protocoles DeFi ne pourraient pas connaître le prix des actifs, la météo ou les résultats sportifs. LINK est devenu l\'infrastructure invisible mais indispensable de la finance décentralisée.',
    whyConvert:
      'Le LINK gagne en importance à mesure que la DeFi se développe. Suivre son cours en euros permet de jauger la valorisation de cette infrastructure critique du Web3.',
    priceFactors:
      'Le prix du LINK dépend de l\'adoption de Chainlink par les protocoles DeFi, du lancement de CCIP (Cross-Chain Interoperability Protocol), du staking de LINK, et de la croissance générale du marché DeFi.',
    faq: [
      {
        q: 'Pourquoi Chainlink est-il important pour la DeFi ?',
        a: 'Les smart contracts ne peuvent pas accéder aux données extérieures par eux-mêmes. Chainlink fournit des prix fiables, des données météo, des résultats aléatoires — tout ce dont la DeFi a besoin pour fonctionner correctement.',
      },
    ],
  },
  dogecoin: {
    name: 'Dogecoin',
    symbol: 'DOGE',
    coingeckoId: 'dogecoin',
    description: 'le Dogecoin (DOGE), la crypto communautaire née d\'un mème devenue un phénomène',
    introText:
      'Lancé comme une blague en 2013, le Dogecoin est devenu une des cryptos les plus populaires au monde. Porté par une communauté massive et par le soutien d\'Elon Musk, le DOGE sert de monnaie de pourboire en ligne et de moyen de paiement accepté par certains commerces.',
    whyConvert:
      'Le DOGE est très volatil et peut bouger de 20-30% en quelques heures suite à un tweet ou une annonce. Suivre son cours en temps réel est indispensable pour les traders.',
    priceFactors:
      'Le prix du DOGE dépend principalement du sentiment sur les réseaux sociaux, des déclarations d\'Elon Musk, du volume de trading spéculatif, et de l\'adoption comme moyen de paiement (Tesla, SpaceX).',
    faq: [
      {
        q: 'Le Dogecoin a-t-il de la valeur ?',
        a: 'Le DOGE n\'a pas de limite d\'offre (inflation perpétuelle) et peu d\'utilité technique comparé à Bitcoin ou Ethereum. Sa valeur repose sur la communauté, l\'adoption comme moyen de paiement, et la spéculation. C\'est un actif à haut risque.',
      },
      {
        q: 'Peut-on payer avec du Dogecoin ?',
        a: 'Oui, certains commerces acceptent le DOGE. Tesla a temporairement accepté le Dogecoin pour ses produits dérivés. Des services de paiement crypto comme BitPay permettent de dépenser du DOGE chez des milliers de marchands.',
      },
    ],
  },
};

export const CURRENCY_SEO: Record<string, {
  name: string;
  namePlural: string;
  code: string;
  symbol: string;
  slug: string;
}> = {
  eur: { name: 'Euro', namePlural: 'euros', code: 'eur', symbol: '€', slug: 'euro' },
  usd: { name: 'Dollar US', namePlural: 'dollars', code: 'usd', symbol: '$', slug: 'dollar' },
  gbp: { name: 'Livre Sterling', namePlural: 'livres sterling', code: 'gbp', symbol: '£', slug: 'livre-sterling' },
  chf: { name: 'Franc Suisse', namePlural: 'francs suisses', code: 'chf', symbol: 'CHF', slug: 'franc-suisse' },
};
