/**
 * Données et interfaces pour les pages review d'exchanges crypto.
 * 6 exchanges : Binance, Coinbase, Kraken, Bybit, Bitpanda, Crypto.com
 */

export interface ExchangeFees {
  spotMaker: number;
  spotTaker: number;
  spotMakerWithToken: number | null;
  spotTakerWithToken: number | null;
  depositEurBank: string;
  depositEurCard: string;
  withdrawEur: string;
  withdrawBtc: string;
}

export interface RatingCriterion {
  label: string;
  score: number;
  color: string;
}

export interface EditorialSection {
  id: string;
  title: string;
  content: string;
}

export interface ExchangeReview {
  slug: string;
  name: string;
  logo: string;
  affiliateUrl: string;

  metaTitle: string;
  metaDescription: string;

  overallScore: number;
  verdict: string;
  lastUpdated: string;

  foundedYear: number;
  headquarters: string;
  regulation: string;
  cryptosCount: number;
  minDeposit: string;
  mobileApp: boolean;
  fiatCurrencies: string[];

  ratings: RatingCriterion[];
  fees: ExchangeFees;
  pros: string[];
  cons: string[];
  keyTakeaways: string[];
  editorialSections: EditorialSection[];
  howToSteps: Array<{ title: string; description: string }>;
  alternatives: string[];
  faq: Array<{ q: string; a: string }>;

  hasStaking: boolean;
  hasFutures: boolean;
  hasEarn: boolean;
  hasCopyTrading: boolean;
}

export const EXCHANGES: Record<string, ExchangeReview> = {
  binance: {
    slug: 'binance',
    name: 'Binance',
    logo: '/images/exchanges/binance.svg',
    affiliateUrl: '#',
    metaTitle: 'Avis Binance 2026 : Frais, Sécurité, Test Complet | CryptoSous',
    metaDescription: 'Notre avis complet sur Binance en 2026. Test détaillé des frais (0.10%), sécurité, cryptos disponibles, app mobile et fonctionnalités avancées. Guide pour débutants et traders.',
    overallScore: 8.8,
    verdict: 'La plateforme la plus complète du marché, idéale pour les traders actifs cherchant des frais bas et un large choix de cryptos.',
    lastUpdated: '2026-02-01',
    foundedYear: 2017,
    headquarters: 'Dubaï (Émirats arabes unis)',
    regulation: 'PSAN France, VASP Dubaï, MiCA EU',
    cryptosCount: 400,
    minDeposit: '10 €',
    mobileApp: true,
    fiatCurrencies: ['EUR', 'USD', 'GBP'],
    ratings: [
      { label: 'Frais', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Sécurité', score: 8.5, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 7.5, color: 'var(--color-gold)' },
      { label: 'Cryptos', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Support', score: 8.0, color: 'var(--color-gold)' },
    ],
    fees: {
      spotMaker: 0.10,
      spotTaker: 0.10,
      spotMakerWithToken: 0.075,
      spotTakerWithToken: 0.075,
      depositEurBank: 'Gratuit (SEPA)',
      depositEurCard: '1.8%',
      withdrawEur: '1 € (SEPA)',
      withdrawBtc: '0.0005 BTC',
    },
    pros: [
      'Frais parmi les plus bas du marché (0.10%)',
      'Plus de 400 cryptomonnaies disponibles',
      'Trading avancé : futures, options, margin',
      'Staking et Earn avec rendements compétitifs',
      'Application mobile complète et réactive',
      'Dépôt SEPA gratuit',
    ],
    cons: [
      'Interface complexe pour les débutants',
      'Historique de problèmes réglementaires',
      'Support client parfois lent en période de forte demande',
      'Vérification KYC obligatoire et parfois longue',
    ],
    keyTakeaways: [
      'Binance est la plus grande plateforme crypto mondiale par volume de trading.',
      'Les frais de 0.10% sont parmi les plus compétitifs, avec une réduction de 25% en payant en BNB.',
      'Plus de 400 cryptos disponibles, du Bitcoin aux altcoins les plus récents.',
      'Fonctionnalités avancées : futures, staking, launchpad, copy trading.',
      'Enregistré PSAN en France et en conformité avec MiCA.',
    ],
    editorialSections: [
      {
        id: 'frais',
        title: 'Frais de trading Binance',
        content: 'Binance propose une grille tarifaire parmi les plus compétitives du marché crypto. Les frais spot de base s\'élèvent à 0.10% maker et 0.10% taker, soit nettement moins que la moyenne du secteur (0.20-0.50%). En utilisant le token BNB pour payer les frais, vous bénéficiez d\'une réduction de 25%, ramenant les frais à 0.075%. Pour les traders à fort volume, le programme VIP offre des remises supplémentaires jusqu\'à 0.02% maker. Les dépôts en euros par virement SEPA sont gratuits, un avantage majeur par rapport à Coinbase ou Crypto.com. Les retraits SEPA coûtent seulement 1€. Seuls les dépôts par carte bancaire restent chers à 1.8%.',
      },
      {
        id: 'securite',
        title: 'Sécurité et régulation',
        content: 'Binance a considérablement renforcé sa sécurité depuis ses débuts. La plateforme utilise le stockage à froid pour la majorité des fonds, l\'authentification 2FA obligatoire, et le SAFU (Secure Asset Fund for Users) — un fonds d\'assurance de 1 milliard de dollars pour protéger les utilisateurs. Binance dispose d\'un enregistrement PSAN auprès de l\'AMF en France et se conforme au règlement MiCA européen. Les audits de preuve de réserves sont publiés régulièrement, garantissant que les fonds des clients sont entièrement couverts.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies disponibles',
        content: 'Avec plus de 400 cryptomonnaies listées, Binance offre l\'un des catalogues les plus larges du marché. Vous y trouverez les majors (BTC, ETH, SOL, XRP, ADA), les tokens DeFi populaires, les memecoins trending et les nouveaux projets via le Binance Launchpad. De nouvelles cryptos sont ajoutées chaque semaine après un processus de vérification. Les paires de trading incluent EUR, USDT, USDC et BTC.',
      },
      {
        id: 'interface',
        title: 'Interface et expérience utilisateur',
        content: 'L\'interface de Binance se divise en deux modes : le mode "Lite" simplifié pour les débutants et le mode "Pro" pour les traders expérimentés. Le mode Pro inclut des graphiques TradingView avancés, un carnet d\'ordres en temps réel et tous les types d\'ordres (limite, marché, stop-limit, OCO). Bien que l\'interface puisse sembler intimidante au premier abord, elle devient intuitive une fois les bases maîtrisées.',
      },
      {
        id: 'app-mobile',
        title: 'Application mobile',
        content: 'L\'app Binance (iOS/Android) est l\'une des mieux notées du secteur avec 4.5/5 sur les stores. Elle offre l\'intégralité des fonctionnalités web : trading spot et futures, staking, earn, P2P, et gestion du compte. L\'interface est fluide, les notifications de prix sont personnalisables, et l\'exécution des ordres est rapide même en période de forte volatilité.',
      },
      {
        id: 'support',
        title: 'Support client',
        content: 'Binance propose un support par chat en direct 24/7, un centre d\'aide complet en français, et une communauté active sur Telegram et Twitter. Les temps de réponse se sont améliorés, mais peuvent encore atteindre plusieurs heures en période de pic. Pour les comptes VIP, un support dédié avec des temps de réponse prioritaires est disponible.',
      },
      {
        id: 'fonctionnalites',
        title: 'Fonctionnalités avancées',
        content: 'Au-delà du trading spot, Binance propose un écosystème complet : Futures (jusqu\'à 125x de levier), Options, Margin Trading, Staking (rendements jusqu\'à 15% APY), Binance Earn (épargne flexible et verrouillée), Launchpad (accès anticipé aux nouveaux tokens), Copy Trading, et même une carte Visa crypto. Le Binance Launchpool permet de farmer de nouveaux tokens en stakant BNB ou FDUSD.',
      },
    ],
    howToSteps: [
      { title: 'Créer un compte', description: 'Inscrivez-vous sur Binance avec votre email. La création de compte prend moins de 2 minutes.' },
      { title: 'Vérifier votre identité', description: 'Complétez la vérification KYC avec une pièce d\'identité. Validation sous 10 minutes en général.' },
      { title: 'Déposer des euros', description: 'Effectuez un virement SEPA gratuit ou utilisez votre carte bancaire (1.8% de frais).' },
      { title: 'Acheter des cryptos', description: 'Utilisez le mode Lite pour un achat simple ou le mode Pro pour des ordres avancés.' },
    ],
    alternatives: ['coinbase', 'kraken', 'bybit', 'bitpanda', 'crypto-com'],
    faq: [
      { q: 'Binance est-il légal en France ?', a: 'Oui, Binance est enregistré comme Prestataire de Services sur Actifs Numériques (PSAN) auprès de l\'AMF depuis 2022. La plateforme est conforme au règlement MiCA européen.' },
      { q: 'Quels sont les frais de Binance ?', a: 'Les frais spot sont de 0.10% maker/taker, réduits à 0.075% en payant avec le BNB. Les dépôts SEPA sont gratuits, les retraits SEPA coûtent 1€.' },
      { q: 'Binance est-il sûr ?', a: 'Binance utilise le stockage à froid, le 2FA obligatoire et le fonds SAFU de 1 milliard $. Les preuves de réserves sont publiées régulièrement.' },
      { q: 'Combien de cryptos peut-on acheter sur Binance ?', a: 'Plus de 400 cryptomonnaies sont disponibles sur Binance, des majors (BTC, ETH) aux altcoins récents.' },
      { q: 'Binance propose-t-il du staking ?', a: 'Oui, Binance propose du staking flexible et verrouillé sur de nombreuses cryptos, avec des rendements allant jusqu\'à 15% APY selon les tokens.' },
      { q: 'Comment retirer ses euros de Binance ?', a: 'Vous pouvez retirer par virement SEPA (1€ de frais, 1-2 jours ouvrés) directement vers votre compte bancaire.' },
    ],
    hasStaking: true,
    hasFutures: true,
    hasEarn: true,
    hasCopyTrading: true,
  },

  coinbase: {
    slug: 'coinbase',
    name: 'Coinbase',
    logo: '/images/exchanges/coinbase.svg',
    affiliateUrl: '#',
    metaTitle: 'Avis Coinbase 2026 : Frais, Sécurité, Test Complet | CryptoSous',
    metaDescription: 'Notre avis complet sur Coinbase en 2026. Interface intuitive, sécurité renforcée, frais détaillés et fonctionnalités. Le meilleur choix pour débuter ?',
    overallScore: 8.2,
    verdict: 'La plateforme la plus intuitive pour les débutants, avec une sécurité de niveau institutionnel et une conformité réglementaire exemplaire.',
    lastUpdated: '2026-02-01',
    foundedYear: 2012,
    headquarters: 'San Francisco, États-Unis',
    regulation: 'SEC (coté au NASDAQ), PSAN France, MiCA EU',
    cryptosCount: 250,
    minDeposit: '2 €',
    mobileApp: true,
    fiatCurrencies: ['EUR', 'USD', 'GBP'],
    ratings: [
      { label: 'Frais', score: 6.5, color: 'var(--color-gold)' },
      { label: 'Sécurité', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Cryptos', score: 8.0, color: 'var(--color-gold)' },
      { label: 'Support', score: 7.5, color: 'var(--color-gold)' },
    ],
    fees: {
      spotMaker: 0.40,
      spotTaker: 0.60,
      spotMakerWithToken: null,
      spotTakerWithToken: null,
      depositEurBank: 'Gratuit (SEPA)',
      depositEurCard: '3.99%',
      withdrawEur: '0.15 € (SEPA)',
      withdrawBtc: '0.0006 BTC',
    },
    pros: [
      'Interface extrêmement intuitive pour les débutants',
      'Société cotée au NASDAQ — transparence maximale',
      'Sécurité de niveau institutionnel (98% fonds en cold storage)',
      'Programme Coinbase Earn pour apprendre et gagner des cryptos',
      'Coinbase Advanced pour les traders expérimentés',
      'Assurance FDIC sur les dépôts en USD',
    ],
    cons: [
      'Frais élevés sur la plateforme simple (jusqu\'à 1.49%)',
      'Coinbase Advanced nécessaire pour des frais compétitifs',
      'Moins de cryptos que Binance ou Bybit',
      'Support client perfectible (réponses lentes)',
    ],
    keyTakeaways: [
      'Coinbase est la plateforme crypto la plus réglementée, cotée au NASDAQ.',
      'Interface idéale pour les débutants, mais frais élevés sur la version simple.',
      'Coinbase Advanced offre des frais réduits (0.40%/0.60%) pour les traders actifs.',
      '98% des fonds stockés en cold storage — sécurité de référence.',
      'Programme Learn & Earn pour gagner des cryptos gratuitement.',
    ],
    editorialSections: [
      {
        id: 'frais',
        title: 'Frais de trading Coinbase',
        content: 'La structure de frais de Coinbase comporte deux niveaux. La plateforme simple facture jusqu\'à 1.49% par transaction, ce qui est cher. En revanche, Coinbase Advanced (anciennement Coinbase Pro) propose des frais maker/taker de 0.40%/0.60%, dégressifs avec le volume. Les dépôts SEPA sont gratuits et les retraits ne coûtent que 0.15€. Attention aux frais de carte bancaire : 3.99%, les plus élevés du marché. Pour optimiser, utilisez toujours Coinbase Advanced et les virements SEPA.',
      },
      {
        id: 'securite',
        title: 'Sécurité et régulation',
        content: 'Coinbase est la référence en matière de sécurité et de conformité. Cotée au NASDAQ depuis 2021, la société publie des rapports financiers audités trimestriellement. 98% des actifs clients sont stockés hors ligne (cold storage). Les dépôts fiat bénéficient d\'une assurance FDIC (aux États-Unis). En Europe, Coinbase est enregistré PSAN en France et conforme à MiCA. L\'authentification biométrique, le 2FA et les vaults (coffres-forts) à validation multiple ajoutent des couches de protection.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies disponibles',
        content: 'Coinbase propose environ 250 cryptomonnaies, un catalogue solide même s\'il est plus restreint que Binance. La plateforme privilégie la qualité à la quantité, avec un processus de listing rigoureux. Toutes les majors sont présentes (BTC, ETH, SOL, XRP, ADA, DOT), ainsi que les principaux tokens DeFi et une sélection d\'altcoins vérifiés. Les stablecoins USDC (émis par Circle, partenaire de Coinbase) sont disponibles.',
      },
      {
        id: 'interface',
        title: 'Interface et expérience utilisateur',
        content: 'L\'interface de Coinbase est reconnue comme la plus intuitive du marché. L\'achat se fait en 3 clics, le tableau de bord est clair et les explications pédagogiques sont omniprésentes. Pour les utilisateurs avancés, Coinbase Advanced propose des graphiques TradingView, un carnet d\'ordres et des ordres limites. La transition entre les deux modes est fluide.',
      },
      {
        id: 'app-mobile',
        title: 'Application mobile',
        content: 'L\'app Coinbase est la plus téléchargée du secteur crypto. L\'interface épurée rend l\'achat et la vente de cryptos accessible à tous. Les alertes de prix, le portfolio tracker et le programme Learn & Earn sont intégrés. Note de 4.6/5 sur l\'App Store et le Google Play Store.',
      },
      {
        id: 'support',
        title: 'Support client',
        content: 'Coinbase propose un support par email et chat, avec un centre d\'aide très complet en français. Les temps de réponse se sont améliorés mais restent variables (quelques heures à 1-2 jours). Le support téléphonique est réservé aux cas urgents (compromission de compte). La communauté Reddit et les forums sont des ressources complémentaires.',
      },
      {
        id: 'fonctionnalites',
        title: 'Fonctionnalités avancées',
        content: 'Coinbase propose le staking (ETH, SOL, ADA, ATOM), le programme Coinbase Earn (apprendre et gagner des cryptos), la carte Coinbase (cashback en crypto), et Coinbase Wallet (portefeuille non-custodial). Coinbase Prime est destiné aux institutions. Le Coinbase Commerce permet aux marchands d\'accepter les paiements crypto.',
      },
    ],
    howToSteps: [
      { title: 'Créer un compte', description: 'Inscription rapide avec email ou compte Google/Apple. Processus guidé étape par étape.' },
      { title: 'Vérifier votre identité', description: 'Upload de pièce d\'identité et selfie. Vérification automatique en quelques minutes.' },
      { title: 'Déposer des euros', description: 'Virement SEPA gratuit (1-2 jours) ou carte bancaire instantanée (3.99% de frais).' },
      { title: 'Acheter des cryptos', description: 'Sélectionnez une crypto, entrez le montant et confirmez. C\'est aussi simple que ça.' },
    ],
    alternatives: ['binance', 'kraken', 'bitpanda', 'bybit', 'crypto-com'],
    faq: [
      { q: 'Coinbase est-il fiable ?', a: 'Oui, Coinbase est une société cotée au NASDAQ, auditée trimestriellement, et enregistrée PSAN en France. C\'est l\'une des plateformes les plus réglementées du marché.' },
      { q: 'Quels sont les frais de Coinbase ?', a: 'La plateforme simple facture jusqu\'à 1.49%. Coinbase Advanced offre des frais de 0.40% maker / 0.60% taker. Les dépôts SEPA sont gratuits.' },
      { q: 'Coinbase est-il adapté aux débutants ?', a: 'Oui, c\'est la plateforme la plus recommandée pour les débutants grâce à son interface intuitive et son programme Learn & Earn.' },
      { q: 'Peut-on utiliser Coinbase en France ?', a: 'Oui, Coinbase est disponible en France avec un enregistrement PSAN auprès de l\'AMF. Les dépôts et retraits en euros sont supportés.' },
      { q: 'Coinbase propose-t-il du staking ?', a: 'Oui, le staking est disponible sur ETH, SOL, ADA, ATOM et d\'autres cryptos, avec des rendements variables selon les tokens.' },
      { q: 'Quelle différence entre Coinbase et Coinbase Advanced ?', a: 'Coinbase est l\'interface simplifiée (frais élevés). Coinbase Advanced est la version trader avec carnet d\'ordres et frais réduits. Les deux partagent le même compte.' },
    ],
    hasStaking: true,
    hasFutures: false,
    hasEarn: true,
    hasCopyTrading: false,
  },

  kraken: {
    slug: 'kraken',
    name: 'Kraken',
    logo: '/images/exchanges/kraken.svg',
    affiliateUrl: '#',
    metaTitle: 'Avis Kraken 2026 : Frais, Sécurité, Test Complet | CryptoSous',
    metaDescription: 'Notre avis complet sur Kraken en 2026. Plateforme historique, frais compétitifs (0.16%), sécurité irréprochable. Test détaillé pour traders et débutants.',
    overallScore: 8.5,
    verdict: 'Une plateforme historique et fiable, avec un excellent compromis entre frais, sécurité et facilité d\'utilisation.',
    lastUpdated: '2026-02-01',
    foundedYear: 2011,
    headquarters: 'San Francisco, États-Unis',
    regulation: 'PSAN France, MiCA EU, FinCEN USA',
    cryptosCount: 200,
    minDeposit: '1 €',
    mobileApp: true,
    fiatCurrencies: ['EUR', 'USD', 'GBP', 'CAD', 'CHF'],
    ratings: [
      { label: 'Frais', score: 8.5, color: 'var(--color-gold)' },
      { label: 'Sécurité', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 8.0, color: 'var(--color-gold)' },
      { label: 'Cryptos', score: 7.5, color: 'var(--color-gold)' },
      { label: 'Support', score: 9.0, color: 'var(--color-gold)' },
    ],
    fees: {
      spotMaker: 0.16,
      spotTaker: 0.26,
      spotMakerWithToken: null,
      spotTakerWithToken: null,
      depositEurBank: 'Gratuit (SEPA)',
      depositEurCard: '3.75%',
      withdrawEur: '0.09 € (SEPA)',
      withdrawBtc: '0.00015 BTC',
    },
    pros: [
      'Aucun hack depuis sa création en 2011 — sécurité exemplaire',
      'Frais compétitifs (0.16%/0.26%) sans token requis',
      'Support client réactif et disponible 24/7',
      'Preuve de réserves auditée régulièrement',
      'Interface Kraken Pro puissante pour les traders',
      'Retrait SEPA à 0.09€ — le moins cher du marché',
    ],
    cons: [
      'Catalogue de cryptos plus restreint (200 vs 400+ chez Binance)',
      'Pas de copy trading',
      'Interface de base un peu datée',
      'Frais de carte bancaire élevés (3.75%)',
    ],
    keyTakeaways: [
      'Kraken n\'a jamais été hacké depuis 2011 — un record dans l\'industrie.',
      'Frais de 0.16%/0.26% maker/taker sans besoin de token natif.',
      'Support client 24/7 reconnu comme l\'un des meilleurs du secteur.',
      'Preuves de réserves auditées par des cabinets indépendants.',
      'Retrait SEPA le moins cher du marché à seulement 0.09€.',
    ],
    editorialSections: [
      {
        id: 'frais',
        title: 'Frais de trading Kraken',
        content: 'Kraken propose des frais spot de 0.16% maker et 0.26% taker sur Kraken Pro, dégressifs avec le volume mensuel. Contrairement à Binance, aucun token natif n\'est nécessaire pour obtenir ces tarifs. Les dépôts SEPA sont gratuits et les retraits ne coûtent que 0.09€ — le tarif le plus bas du marché. L\'achat instantané (interface simple) facture entre 0.9% et 1.5%, comme chez la plupart des concurrents. Les frais futures sont de 0.02% maker / 0.05% taker.',
      },
      {
        id: 'securite',
        title: 'Sécurité et régulation',
        content: 'Kraken n\'a jamais subi de hack depuis sa création en 2011, ce qui en fait l\'une des plateformes les plus sûres de l\'industrie. 95% des fonds sont stockés en cold storage dans des coffres géographiquement distribués. Kraken publie des preuves de réserves auditées par des cabinets indépendants. La plateforme est enregistrée PSAN en France, conforme MiCA, et régulée FinCEN aux USA. Le 2FA, le Global Settings Lock et le Master Key ajoutent des couches de sécurité supplémentaires.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies disponibles',
        content: 'Kraken propose environ 200 cryptomonnaies, un catalogue plus sélectif que Binance mais couvrant toutes les majors et les principaux altcoins. La plateforme est connue pour lister des projets sérieux après une due diligence approfondie. Les paires EUR sont bien supportées, et Kraken offre des paires de trading pour CHF et CAD, un avantage pour les investisseurs suisses et canadiens.',
      },
      {
        id: 'interface',
        title: 'Interface et expérience utilisateur',
        content: 'Kraken propose deux interfaces : l\'achat instantané (simple, 3 clics) et Kraken Pro (graphiques avancés, carnet d\'ordres, ordres limites/stop). Kraken Pro a été entièrement redesigné en 2024 avec une interface moderne et des graphiques TradingView intégrés. L\'expérience est fluide et professionnelle.',
      },
      {
        id: 'app-mobile',
        title: 'Application mobile',
        content: 'L\'app Kraken (iOS/Android) combine l\'achat simplifié et les fonctionnalités pro. L\'interface est claire, les notifications de prix personnalisables, et le trading est fluide. Note de 4.4/5 sur les stores. L\'app intègre également le staking et le suivi de portfolio.',
      },
      {
        id: 'support',
        title: 'Support client',
        content: 'Le support Kraken est reconnu comme l\'un des meilleurs du secteur. Chat en direct 24/7, support par email avec des temps de réponse courts, et un centre d\'aide exhaustif en français. Kraken investit massivement dans la formation de ses agents support, ce qui se ressent dans la qualité des réponses.',
      },
      {
        id: 'fonctionnalites',
        title: 'Fonctionnalités avancées',
        content: 'Kraken propose le trading futures (jusqu\'à 50x de levier), le margin trading, le staking sur de nombreuses cryptos (rendements compétitifs), et Kraken NFT (marketplace). La plateforme offre également une API robuste pour le trading algorithmique et les intégrations tierces.',
      },
    ],
    howToSteps: [
      { title: 'Créer un compte', description: 'Inscription avec email, nom d\'utilisateur et mot de passe. Rapide et sans friction.' },
      { title: 'Vérifier votre identité', description: 'Vérification intermédiaire (pièce d\'identité) pour le trading. Vérification en quelques minutes.' },
      { title: 'Déposer des euros', description: 'Virement SEPA gratuit (1-3 jours) ou carte bancaire instantanée (3.75%).' },
      { title: 'Acheter des cryptos', description: 'Achat instantané en 3 clics ou ordres avancés sur Kraken Pro.' },
    ],
    alternatives: ['binance', 'coinbase', 'bybit', 'bitpanda', 'crypto-com'],
    faq: [
      { q: 'Kraken est-il sûr ?', a: 'Oui, Kraken n\'a jamais été hacké depuis 2011. 95% des fonds sont en cold storage et les preuves de réserves sont auditées régulièrement.' },
      { q: 'Quels sont les frais de Kraken ?', a: 'Frais spot de 0.16% maker / 0.26% taker sur Kraken Pro. Dépôts SEPA gratuits, retraits SEPA à 0.09€.' },
      { q: 'Kraken est-il disponible en France ?', a: 'Oui, Kraken est enregistré PSAN auprès de l\'AMF et conforme au règlement MiCA européen.' },
      { q: 'Kraken ou Binance, lequel choisir ?', a: 'Kraken pour la sécurité et le support client. Binance pour les frais les plus bas et le plus grand choix de cryptos. Les deux sont d\'excellentes options.' },
      { q: 'Peut-on faire du staking sur Kraken ?', a: 'Oui, Kraken propose le staking sur de nombreuses cryptos (ETH, SOL, DOT, ADA, ATOM) avec des rendements compétitifs.' },
      { q: 'Comment contacter le support Kraken ?', a: 'Chat en direct 24/7 disponible sur le site et l\'app. Support email avec des réponses généralement sous 24h.' },
    ],
    hasStaking: true,
    hasFutures: true,
    hasEarn: false,
    hasCopyTrading: false,
  },

  bybit: {
    slug: 'bybit',
    name: 'Bybit',
    logo: '/images/exchanges/bybit.svg',
    affiliateUrl: '#',
    metaTitle: 'Avis Bybit 2026 : Frais, Sécurité, Test Complet | CryptoSous',
    metaDescription: 'Notre avis complet sur Bybit en 2026. La plateforme préférée des traders de dérivés. Frais, sécurité, copy trading et fonctionnalités avancées.',
    overallScore: 8.3,
    verdict: 'La plateforme de référence pour le trading de dérivés et le copy trading, avec des frais très compétitifs et une interface soignée.',
    lastUpdated: '2026-02-01',
    foundedYear: 2018,
    headquarters: 'Dubaï (Émirats arabes unis)',
    regulation: 'VASP Dubaï, MiCA EU (en cours)',
    cryptosCount: 500,
    minDeposit: '10 €',
    mobileApp: true,
    fiatCurrencies: ['EUR', 'USD'],
    ratings: [
      { label: 'Frais', score: 9.0, color: 'var(--color-gold)' },
      { label: 'Sécurité', score: 7.5, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 8.0, color: 'var(--color-gold)' },
      { label: 'Cryptos', score: 9.0, color: 'var(--color-gold)' },
      { label: 'Support', score: 8.0, color: 'var(--color-gold)' },
    ],
    fees: {
      spotMaker: 0.10,
      spotTaker: 0.10,
      spotMakerWithToken: null,
      spotTakerWithToken: null,
      depositEurBank: 'Gratuit (SEPA)',
      depositEurCard: '2%',
      withdrawEur: '1 € (SEPA)',
      withdrawBtc: '0.0005 BTC',
    },
    pros: [
      'Frais spot très compétitifs (0.10%/0.10%)',
      'Plateforme de référence pour les futures et dérivés',
      'Copy trading intégré avec des traders vérifiés',
      'Plus de 500 cryptos disponibles',
      'Interface moderne et réactive',
      'Bonus de bienvenue et promotions régulières',
    ],
    cons: [
      'Régulation européenne encore en cours',
      'Réputation moins établie que Binance ou Coinbase',
      'Outils de staking aux rendements parfois variables',
      'Pas d\'enregistrement PSAN en France (au moment du test)',
    ],
    keyTakeaways: [
      'Bybit est la 3e plateforme mondiale par volume de trading sur les dérivés.',
      'Frais spot de 0.10% et frais futures parmi les plus bas (0.02%/0.055%).',
      'Copy trading leader du marché avec des milliers de traders vérifiés.',
      'Plus de 500 cryptomonnaies et tokens disponibles.',
      'Interface soignée combinant simplicité et fonctionnalités avancées.',
    ],
    editorialSections: [
      {
        id: 'frais',
        title: 'Frais de trading Bybit',
        content: 'Bybit propose des frais spot de 0.10% maker/taker, au même niveau que Binance. Sur les futures, les frais descendent à 0.02% maker / 0.055% taker, parmi les plus bas du marché. Les dépôts SEPA sont gratuits, les retraits coûtent 1€. Les frais de carte bancaire sont de 2%, moins que Coinbase (3.99%) ou Kraken (3.75%). Le programme VIP offre des réductions supplémentaires pour les gros volumes.',
      },
      {
        id: 'securite',
        title: 'Sécurité et régulation',
        content: 'Bybit utilise un système de cold storage multi-signatures, l\'authentification 2FA et des audits de preuve de réserves. La plateforme est régulée VASP à Dubaï et travaille activement sur sa conformité MiCA européenne. Bien que plus récente que Binance ou Kraken, Bybit n\'a jamais subi de hack majeur. Un fonds d\'assurance protège les positions futures des utilisateurs.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies disponibles',
        content: 'Bybit propose plus de 500 cryptomonnaies, l\'un des catalogues les plus larges du marché. La plateforme est réactive pour lister les nouveaux tokens tendance. Les paires USDT et USDC sont les plus populaires, avec un bon support EUR. Le Launchpad Bybit permet d\'accéder en avant-première aux nouveaux projets.',
      },
      {
        id: 'interface',
        title: 'Interface et expérience utilisateur',
        content: 'L\'interface Bybit est moderne, fluide et bien pensée. L\'écran de trading intègre graphiques TradingView, carnet d\'ordres, historique des trades et chat communautaire. Le mode débutant simplifie l\'achat pour les nouveaux utilisateurs. La navigation entre spot, futures et earn est intuitive.',
      },
      {
        id: 'app-mobile',
        title: 'Application mobile',
        content: 'L\'app Bybit est notée 4.5/5 sur les stores. Elle offre toutes les fonctionnalités de la version web : trading spot et futures, copy trading, earn, et gestion de compte. L\'interface est rapide et les ordres s\'exécutent sans lag notable.',
      },
      {
        id: 'support',
        title: 'Support client',
        content: 'Bybit propose un chat en direct 24/7, un support email et un centre d\'aide complet. Les temps de réponse sont généralement courts (quelques minutes sur le chat). La communauté Telegram et Discord est active et utile pour les questions courantes.',
      },
      {
        id: 'fonctionnalites',
        title: 'Fonctionnalités avancées',
        content: 'Bybit se distingue par ses futures (jusqu\'à 100x levier), son copy trading de référence, Bybit Earn (rendements flexibles et verrouillés), le Launchpad et Launchpool, les bots de trading automatisés, et une carte crypto. Les concours de trading réguliers offrent des prix attractifs.',
      },
    ],
    howToSteps: [
      { title: 'Créer un compte', description: 'Inscription rapide avec email ou numéro de téléphone. Bonus de bienvenue disponible.' },
      { title: 'Vérifier votre identité', description: 'KYC avec pièce d\'identité. Vérification généralement sous 15 minutes.' },
      { title: 'Déposer des euros', description: 'Virement SEPA gratuit ou carte bancaire (2% de frais).' },
      { title: 'Acheter des cryptos', description: 'Achat express en 1 clic ou trading avancé sur le carnet d\'ordres.' },
    ],
    alternatives: ['binance', 'kraken', 'coinbase', 'bitpanda', 'crypto-com'],
    faq: [
      { q: 'Bybit est-il fiable ?', a: 'Bybit est la 3e plateforme mondiale par volume. Régulée à Dubaï, elle n\'a jamais subi de hack majeur. La conformité MiCA est en cours pour l\'Europe.' },
      { q: 'Quels sont les frais de Bybit ?', a: 'Frais spot de 0.10% maker/taker. Futures : 0.02% maker / 0.055% taker. Dépôts SEPA gratuits.' },
      { q: 'Bybit est-il bon pour le copy trading ?', a: 'Oui, Bybit est considéré comme le leader du copy trading crypto avec des milliers de traders vérifiés et des statistiques détaillées.' },
      { q: 'Peut-on utiliser Bybit en France ?', a: 'Bybit est accessible en France mais n\'a pas encore l\'enregistrement PSAN. La conformité MiCA est en cours d\'obtention.' },
      { q: 'Bybit propose-t-il des futures ?', a: 'Oui, Bybit est une référence pour les futures avec un levier jusqu\'à 100x et des frais parmi les plus bas du marché.' },
      { q: 'Comment fonctionne le copy trading Bybit ?', a: 'Vous sélectionnez un trader expérimenté, définissez un montant et vos trades répliquent automatiquement les siens. Les performances passées sont affichées.' },
    ],
    hasStaking: true,
    hasFutures: true,
    hasEarn: true,
    hasCopyTrading: true,
  },

  bitpanda: {
    slug: 'bitpanda',
    name: 'Bitpanda',
    logo: '/images/exchanges/bitpanda.svg',
    affiliateUrl: '#',
    metaTitle: 'Avis Bitpanda 2026 : Frais, Sécurité, Test Complet | CryptoSous',
    metaDescription: 'Notre avis complet sur Bitpanda en 2026. La plateforme européenne de référence : crypto, actions, ETF. Frais, sécurité et test détaillé.',
    overallScore: 7.8,
    verdict: 'La meilleure plateforme européenne tout-en-un pour investir dans les cryptos, actions et ETF depuis une seule interface.',
    lastUpdated: '2026-02-01',
    foundedYear: 2014,
    headquarters: 'Vienne, Autriche',
    regulation: 'MiFID II, PSAN France, MiCA EU',
    cryptosCount: 170,
    minDeposit: '1 €',
    mobileApp: true,
    fiatCurrencies: ['EUR', 'CHF', 'GBP'],
    ratings: [
      { label: 'Frais', score: 7.0, color: 'var(--color-gold)' },
      { label: 'Sécurité', score: 9.0, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 9.0, color: 'var(--color-gold)' },
      { label: 'Cryptos', score: 7.0, color: 'var(--color-gold)' },
      { label: 'Support', score: 7.5, color: 'var(--color-gold)' },
    ],
    fees: {
      spotMaker: 0.10,
      spotTaker: 0.15,
      spotMakerWithToken: null,
      spotTakerWithToken: null,
      depositEurBank: 'Gratuit (SEPA)',
      depositEurCard: '1.5%',
      withdrawEur: 'Gratuit (SEPA)',
      withdrawBtc: '0.0003 BTC',
    },
    pros: [
      'Plateforme multi-actifs : crypto, actions, ETF, matières premières',
      'Régulation européenne complète (MiFID II + MiCA)',
      'Interface très intuitive, idéale pour les débutants',
      'Plans d\'épargne automatiques (DCA)',
      'Carte Bitpanda avec cashback crypto',
      'Retraits SEPA gratuits',
    ],
    cons: [
      'Frais de spread cachés sur l\'achat instantané (environ 1.49%)',
      'Catalogue crypto plus restreint que Binance (170 cryptos)',
      'Pas de trading futures ou margin',
      'Bitpanda Pro moins intuitif que les concurrents',
    ],
    keyTakeaways: [
      'Bitpanda est la seule plateforme européenne régulée offrant crypto + actions + ETF.',
      'Régulation MiFID II et MiCA — le plus haut niveau de conformité en Europe.',
      'Interface parmi les plus simples du marché, parfaite pour débuter.',
      'Plans d\'épargne automatiques (DCA) dès 1€ par semaine.',
      'Attention aux frais de spread cachés sur l\'achat instantané (~1.49%).',
    ],
    editorialSections: [
      {
        id: 'frais',
        title: 'Frais de trading Bitpanda',
        content: 'La structure de frais Bitpanda comporte deux niveaux. Sur Bitpanda Pro (le carnet d\'ordres), les frais sont compétitifs : 0.10% maker / 0.15% taker. En revanche, l\'achat instantané sur la plateforme principale inclut un spread d\'environ 1.49%, ce qui est dans la moyenne mais moins transparent que des frais fixes. Les dépôts et retraits SEPA sont gratuits, un avantage notable. Les frais de carte bancaire sont de 1.5%, raisonnables comparé aux concurrents.',
      },
      {
        id: 'securite',
        title: 'Sécurité et régulation',
        content: 'Bitpanda est l\'une des plateformes les plus régulées d\'Europe. Détentrice d\'une licence MiFID II (marché financier), elle est enregistrée PSAN en France et conforme au règlement MiCA. Les fonds sont protégés selon les standards européens les plus stricts. Le cold storage, le 2FA et les audits réguliers complètent le dispositif de sécurité.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies et actifs disponibles',
        content: 'Bitpanda propose environ 170 cryptomonnaies, mais se distingue en offrant également des actions fractionnées, des ETF, des matières premières (or, argent) et des métaux précieux. C\'est un véritable broker multi-actifs. Pour un investisseur qui souhaite diversifier au-delà des cryptos, c\'est un avantage unique.',
      },
      {
        id: 'interface',
        title: 'Interface et expérience utilisateur',
        content: 'L\'interface Bitpanda est conçue pour la simplicité. L\'achat de cryptos se fait en quelques secondes, le portfolio est présenté de manière claire avec des graphiques de performance. Bitpanda Pro offre un carnet d\'ordres pour les traders plus avancés, mais son interface reste moins aboutie que Binance ou Kraken Pro.',
      },
      {
        id: 'app-mobile',
        title: 'Application mobile',
        content: 'L\'app Bitpanda (iOS/Android) est notée 4.3/5. Elle offre toutes les fonctionnalités de la version web : achat/vente de cryptos et actions, plans d\'épargne, carte Bitpanda et suivi de portfolio. L\'interface est épurée et la navigation intuitive.',
      },
      {
        id: 'support',
        title: 'Support client',
        content: 'Bitpanda propose un support par email et chat. Les temps de réponse varient de quelques heures à 1-2 jours selon la charge. Le centre d\'aide est complet et disponible en français. La communauté sur les réseaux sociaux est réactive.',
      },
      {
        id: 'fonctionnalites',
        title: 'Fonctionnalités avancées',
        content: 'Plans d\'épargne automatiques (DCA) dès 1€/semaine, carte Bitpanda avec cashback en BTC ou BEST, Bitpanda Pro pour le trading avancé, et indice crypto Bitpanda (panier diversifié automatique). Pas de futures ni de margin trading, ce qui en fait une plateforme orientée investissement plutôt que trading.',
      },
    ],
    howToSteps: [
      { title: 'Créer un compte', description: 'Inscription avec email. Processus guidé et intuitif.' },
      { title: 'Vérifier votre identité', description: 'KYC avec pièce d\'identité et selfie vidéo. Vérification sous 10 minutes.' },
      { title: 'Déposer des euros', description: 'Virement SEPA gratuit (1-2 jours) ou carte bancaire (1.5%).' },
      { title: 'Acheter des cryptos', description: 'Choisissez un actif (crypto, action, ETF), entrez le montant et confirmez.' },
    ],
    alternatives: ['coinbase', 'kraken', 'binance', 'bybit', 'crypto-com'],
    faq: [
      { q: 'Bitpanda est-il fiable ?', a: 'Oui, Bitpanda est l\'une des plateformes les plus régulées d\'Europe avec une licence MiFID II, un enregistrement PSAN et la conformité MiCA.' },
      { q: 'Quels sont les frais de Bitpanda ?', a: 'Bitpanda Pro : 0.10% maker / 0.15% taker. Achat instantané : spread d\'environ 1.49%. Dépôts et retraits SEPA gratuits.' },
      { q: 'Peut-on acheter des actions sur Bitpanda ?', a: 'Oui, Bitpanda permet d\'acheter des actions fractionnées, des ETF, des matières premières et des cryptos depuis une seule plateforme.' },
      { q: 'Bitpanda est-il adapté aux débutants ?', a: 'Oui, l\'interface est parmi les plus intuitives du marché. Les plans d\'épargne automatiques facilitent l\'investissement régulier.' },
      { q: 'Bitpanda propose-t-il une carte bancaire ?', a: 'Oui, la carte Bitpanda offre du cashback en BTC ou en token BEST sur vos achats quotidiens.' },
      { q: 'Peut-on faire du DCA sur Bitpanda ?', a: 'Oui, les plans d\'épargne automatiques permettent d\'investir dès 1€ par semaine dans les cryptos et actions de votre choix.' },
    ],
    hasStaking: true,
    hasFutures: false,
    hasEarn: false,
    hasCopyTrading: false,
  },

  'crypto-com': {
    slug: 'crypto-com',
    name: 'Crypto.com',
    logo: '/images/exchanges/crypto-com.svg',
    affiliateUrl: '#',
    metaTitle: 'Avis Crypto.com 2026 : Frais, Carte, Test Complet | CryptoSous',
    metaDescription: 'Notre avis complet sur Crypto.com en 2026. La plateforme à la carte Visa métal. Frais, sécurité, staking CRO et fonctionnalités détaillées.',
    overallScore: 7.9,
    verdict: 'L\'écosystème le plus complet avec sa carte Visa métal iconique, mais des frais de trading plus élevés que la concurrence.',
    lastUpdated: '2026-02-01',
    foundedYear: 2016,
    headquarters: 'Singapour',
    regulation: 'PSAN France, MiCA EU, VASP Dubaï',
    cryptosCount: 350,
    minDeposit: '1 €',
    mobileApp: true,
    fiatCurrencies: ['EUR', 'USD', 'GBP', 'SGD'],
    ratings: [
      { label: 'Frais', score: 7.0, color: 'var(--color-gold)' },
      { label: 'Sécurité', score: 8.5, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 8.5, color: 'var(--color-gold)' },
      { label: 'Cryptos', score: 8.5, color: 'var(--color-gold)' },
      { label: 'Support', score: 7.0, color: 'var(--color-gold)' },
    ],
    fees: {
      spotMaker: 0.075,
      spotTaker: 0.075,
      spotMakerWithToken: 0.04,
      spotTakerWithToken: 0.04,
      depositEurBank: 'Gratuit (SEPA)',
      depositEurCard: '2.99%',
      withdrawEur: 'Gratuit (SEPA)',
      withdrawBtc: '0.0006 BTC',
    },
    pros: [
      'Carte Visa métal avec cashback jusqu\'à 5% en CRO',
      'Écosystème complet : exchange, DeFi wallet, NFT, pay',
      'Frais compétitifs sur l\'exchange (0.075%)',
      'Staking CRO avec rendements attractifs',
      'Plus de 350 cryptos disponibles',
      'Dépôts et retraits SEPA gratuits',
    ],
    cons: [
      'App mobile et exchange sont deux plateformes séparées',
      'Spread élevé sur l\'achat via l\'app (~1-2%)',
      'Avantages carte réduits par rapport aux débuts',
      'Support client parfois lent',
    ],
    keyTakeaways: [
      'Crypto.com est surtout connu pour sa carte Visa métal avec cashback en CRO.',
      'L\'exchange propose des frais compétitifs (0.075%), mais l\'app a un spread plus élevé.',
      'Écosystème le plus complet : exchange, carte, DeFi wallet, NFT marketplace, pay.',
      'Plus de 350 cryptomonnaies disponibles.',
      'Dépôts et retraits SEPA gratuits — un bon point.',
    ],
    editorialSections: [
      {
        id: 'frais',
        title: 'Frais de trading Crypto.com',
        content: 'La structure de frais de Crypto.com est duale. L\'exchange (crypto.com/exchange) propose des frais compétitifs de 0.075% maker/taker, réduits à 0.04% en stakant du CRO. En revanche, l\'achat via l\'application mobile inclut un spread de 1-2%, ce qui est cher pour les achats récurrents. Les dépôts et retraits SEPA sont gratuits. Les frais de carte bancaire sont de 2.99%. Pour optimiser, privilégiez toujours l\'exchange plutôt que l\'app pour vos achats.',
      },
      {
        id: 'securite',
        title: 'Sécurité et régulation',
        content: 'Crypto.com a investi massivement dans la sécurité suite à un incident en janvier 2022 (remboursement intégral des utilisateurs affectés). La plateforme utilise le cold storage multi-signatures, le 2FA, et détient des certifications SOC 2 Type II et ISO 27001. Crypto.com est enregistré PSAN en France et conforme à MiCA. Les preuves de réserves sont publiées régulièrement.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies disponibles',
        content: 'Plus de 350 cryptomonnaies sont disponibles sur Crypto.com, un catalogue large qui couvre les majors, les tokens DeFi, les memecoins et les projets émergents. La plateforme est réactive pour lister les nouveaux tokens populaires. Le token natif CRO offre des avantages dans tout l\'écosystème.',
      },
      {
        id: 'interface',
        title: 'Interface et expérience utilisateur',
        content: 'Crypto.com sépare son offre en deux : l\'application mobile (achat simplifié, carte, earn) et l\'exchange web (trading avancé). L\'app est intuitive et bien conçue, mais le passage à l\'exchange nécessite un compte séparé. L\'exchange offre des graphiques TradingView et un carnet d\'ordres complet.',
      },
      {
        id: 'app-mobile',
        title: 'Application mobile',
        content: 'L\'app Crypto.com est l\'une des plus populaires avec plus de 80 millions d\'utilisateurs. Elle intègre l\'achat/vente de cryptos, la gestion de la carte Visa, Crypto Earn (rendements), le DeFi Wallet et le suivi de portfolio. Note de 4.4/5 sur les stores.',
      },
      {
        id: 'support',
        title: 'Support client',
        content: 'Crypto.com propose un chat in-app, un support email et un centre d\'aide. Les temps de réponse varient de quelques heures à 2-3 jours selon la complexité. Le support est disponible en français mais peut être lent en période de forte demande.',
      },
      {
        id: 'fonctionnalites',
        title: 'Fonctionnalités avancées',
        content: 'L\'écosystème Crypto.com est le plus complet du marché : carte Visa métal (5 niveaux, jusqu\'à 5% cashback), Crypto Earn (rendements sur vos cryptos), DeFi Wallet (accès aux protocoles DeFi), NFT marketplace, Crypto.com Pay (paiements marchands), et trading avancé sur l\'exchange. Le staking CRO débloque des avantages progressifs.',
      },
    ],
    howToSteps: [
      { title: 'Télécharger l\'app', description: 'Installez l\'application Crypto.com sur iOS ou Android.' },
      { title: 'Créer un compte et vérifier', description: 'Inscription avec email + KYC (pièce d\'identité). Vérification sous 10-15 minutes.' },
      { title: 'Déposer des euros', description: 'Virement SEPA gratuit (1-2 jours) ou carte bancaire (2.99%).' },
      { title: 'Acheter des cryptos', description: 'Achat direct dans l\'app ou via l\'exchange pour des frais réduits.' },
    ],
    alternatives: ['binance', 'coinbase', 'kraken', 'bybit', 'bitpanda'],
    faq: [
      { q: 'Crypto.com est-il fiable ?', a: 'Oui, Crypto.com est enregistré PSAN, conforme MiCA, et détient les certifications SOC 2 et ISO 27001. Plus de 80 millions d\'utilisateurs dans le monde.' },
      { q: 'Comment fonctionne la carte Crypto.com ?', a: 'La carte Visa métal offre du cashback en CRO (1-5% selon le tier). Il faut staker du CRO pour débloquer les niveaux supérieurs. La carte est gratuite dans sa version de base.' },
      { q: 'Quels sont les frais de Crypto.com ?', a: 'Exchange : 0.075% maker/taker (0.04% avec staking CRO). App : spread de 1-2%. Dépôts et retraits SEPA gratuits.' },
      { q: 'Crypto.com ou Binance ?', a: 'Binance pour les frais les plus bas et le trading avancé. Crypto.com pour la carte Visa et l\'écosystème intégré (earn, NFT, pay).' },
      { q: 'Peut-on gagner des intérêts sur Crypto.com ?', a: 'Oui, Crypto Earn permet de déposer vos cryptos et de gagner des rendements flexibles ou verrouillés (jusqu\'à 12% APY selon le token et la durée).' },
      { q: 'Crypto.com est-il disponible en France ?', a: 'Oui, Crypto.com est enregistré PSAN auprès de l\'AMF. Dépôts SEPA et carte Visa disponibles pour les résidents français.' },
    ],
    hasStaking: true,
    hasFutures: true,
    hasEarn: true,
    hasCopyTrading: false,
  },
};

export function getExchangeBySlug(slug: string): ExchangeReview | undefined {
  return EXCHANGES[slug];
}

export function getAllExchangeSlugs(): string[] {
  return Object.keys(EXCHANGES);
}

export function getExchangesSortedByScore(): ExchangeReview[] {
  return Object.values(EXCHANGES).sort((a, b) => b.overallScore - a.overallScore);
}
