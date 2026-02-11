/**
 * Données et interfaces pour les pages review de hardware wallets.
 * 5 wallets : Ledger Nano X, Ledger Stax, Trezor Safe 5, Trezor Model T, BitBox02
 */

import type { RatingCriterion, EditorialSection } from './exchange-reviews';

export interface WalletSpecs {
  screen: string;
  connectivity: string[];
  battery: string | null;
  dimensions: string;
  weight: string;
  coinsSupported: number;
  material: string;
  certifications: string[];
  openSource: boolean;
  companionApp: string;
}

export interface WalletReview {
  slug: string;
  name: string;
  brand: string;
  image: string;
  affiliateUrl: string;
  price: string;

  metaTitle: string;
  metaDescription: string;

  overallScore: number;
  verdict: string;
  lastUpdated: string;

  specs: WalletSpecs;
  ratings: RatingCriterion[];
  pros: string[];
  cons: string[];
  keyTakeaways: string[];
  editorialSections: EditorialSection[];
  targetAudience: Array<{ profile: string; reason: string; recommended: boolean }>;
  alternatives: string[];
  faq: Array<{ q: string; a: string }>;

  hasBluetooth: boolean;
  hasTouchscreen: boolean;
}

export const WALLETS: Record<string, WalletReview> = {
  'ledger-nano-x': {
    slug: 'ledger-nano-x',
    name: 'Ledger Nano X',
    brand: 'Ledger',
    image: '/images/wallets/ledger-nano-x.png',
    affiliateUrl: '#',
    price: '149 €',

    metaTitle: 'Avis Ledger Nano X 2026 : Test Complet, Sécurité, Prix | CryptoSous',
    metaDescription: 'Notre avis complet sur le Ledger Nano X en 2026. Test détaillé : sécurité CC EAL5+, Bluetooth, 5 500+ cryptos, Ledger Live. Le meilleur wallet hardware ?',
    overallScore: 8.7,
    verdict: 'Le hardware wallet le plus polyvalent du marché, combinant sécurité de pointe, Bluetooth et un écosystème Ledger Live complet.',
    lastUpdated: '2026-02-01',

    specs: {
      screen: 'Écran OLED 128x64px',
      connectivity: ['USB-C', 'Bluetooth'],
      battery: '100 mAh (~8h)',
      dimensions: '72 x 18.6 x 11.75 mm',
      weight: '34 g',
      coinsSupported: 5500,
      material: 'Acier inoxydable brossé + plastique',
      certifications: ['CC EAL5+'],
      openSource: false,
      companionApp: 'Ledger Live',
    },
    ratings: [
      { label: 'Sécurité', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 8.0, color: 'var(--color-gold)' },
      { label: 'Design', score: 7.5, color: 'var(--color-gold)' },
      { label: 'Compatibilité', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Rapport qualité-prix', score: 8.5, color: 'var(--color-gold)' },
    ],
    pros: [
      'Sécurité CC EAL5+ — puce certifiée',
      'Bluetooth pour usage mobile sans fil',
      '5 500+ cryptomonnaies supportées',
      'Ledger Live : staking, swap, DeFi intégrés',
      'Batterie intégrée pour usage nomade',
      'Écosystème d\'apps et intégrations étendu',
    ],
    cons: [
      'Firmware non open source (chip sécurisé propriétaire)',
      'Écran OLED petit comparé aux concurrents récents',
      'Prix de 149€ — plus cher que le Nano S Plus',
      'Bluetooth peut poser des questions de sécurité pour certains puristes',
    ],
    keyTakeaways: [
      'Le Ledger Nano X est le wallet hardware le plus vendu au monde.',
      'Puce sécurisée CC EAL5+ — le même niveau que les passeports biométriques.',
      'Bluetooth intégré pour gérer vos cryptos depuis votre smartphone.',
      '5 500+ cryptos et tokens supportés via Ledger Live.',
      'Staking, swap et accès DeFi directement depuis l\'application.',
    ],
    editorialSections: [
      {
        id: 'design',
        title: 'Design et construction',
        content: 'Le Ledger Nano X arbore un design compact de clé USB haut de gamme. Son boîtier en acier inoxydable brossé avec couverture pivotante protège l\'écran OLED. Les dimensions (72 x 18.6 x 11.75 mm) le rendent facilement transportable. Les deux boutons physiques permettent la navigation et la validation des transactions. Le design est sobre, professionnel, mais l\'écran reste petit comparé aux modèles récents à écran tactile.',
      },
      {
        id: 'securite',
        title: 'Sécurité',
        content: 'Le Nano X utilise une puce sécurisée certifiée CC EAL5+ (ST33J2M0), le même niveau de certification que les passeports biométriques et les cartes bancaires. Vos clés privées ne quittent jamais la puce sécurisée. La seed phrase de 24 mots permet la récupération. Le firmware est vérifié à chaque démarrage pour détecter toute altération. Ledger a mis en place un programme de bug bounty et publie des audits de sécurité réguliers. Le point de controverse reste le firmware propriétaire (non open source), contrairement à Trezor.',
      },
      {
        id: 'configuration',
        title: 'Configuration et prise en main',
        content: 'La configuration initiale prend environ 10 minutes. Branchez le Nano X, installez Ledger Live sur ordinateur ou mobile, et suivez les instructions : création d\'un PIN (4-8 chiffres), génération et sauvegarde de la seed phrase (24 mots), et installation des apps crypto souhaitées. L\'interface Ledger Live guide chaque étape. La connexion Bluetooth se configure en quelques secondes pour l\'usage mobile.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies supportées',
        content: 'Le Nano X supporte plus de 5 500 cryptomonnaies et tokens, le catalogue le plus large du marché. Bitcoin, Ethereum, Solana, XRP, Cardano, Polkadot, et tous les tokens ERC-20, SPL et BEP-20 sont compatibles. Vous pouvez installer jusqu\'à 100 applications crypto simultanément sur l\'appareil (vs 3-5 sur le Nano S Plus), un avantage majeur pour les portfolios diversifiés.',
      },
      {
        id: 'app-compagnon',
        title: 'Ledger Live',
        content: 'Ledger Live est l\'application compagnon (desktop + mobile) qui transforme le Nano X en une véritable plateforme de gestion crypto. Fonctionnalités : achat/vente de crypto (via partenaires), swap entre cryptos, staking (ETH, SOL, DOT, ATOM, ADA), accès aux protocoles DeFi (via Ledger Connect), suivi de portfolio en temps réel, et gestion multi-comptes. L\'interface est intuitive et régulièrement mise à jour.',
      },
      {
        id: 'connectivite',
        title: 'Connectivité et Bluetooth',
        content: 'Le Nano X se distingue par sa connectivité Bluetooth 5.0, permettant une utilisation sans fil avec votre smartphone via Ledger Live mobile. Les données transmises par Bluetooth sont chiffrées et les transactions doivent toujours être confirmées physiquement sur l\'appareil. Le port USB-C permet la connexion filaire à un ordinateur. La batterie de 100 mAh offre environ 8 heures d\'utilisation Bluetooth.',
      },
      {
        id: 'garantie',
        title: 'Garantie et SAV',
        content: 'Le Nano X est garanti 2 ans par Ledger. Le support technique est accessible par email et via le centre d\'aide en ligne. Ledger propose également le remplacement en cas de défaut matériel. Important : achetez toujours sur le site officiel Ledger ou les revendeurs agréés pour éviter les appareils compromis.',
      },
    ],
    targetAudience: [
      { profile: 'Investisseur crypto débutant à intermédiaire', reason: 'Ledger Live guide chaque étape et le Bluetooth simplifie l\'usage quotidien.', recommended: true },
      { profile: 'HODLer long terme', reason: 'Sécurité CC EAL5+ et support de 5 500+ cryptos pour un portfolio diversifié.', recommended: true },
      { profile: 'Utilisateur DeFi actif', reason: 'Accès aux protocoles DeFi via Ledger Connect, mais les validations fréquentes sur l\'appareil peuvent être contraignantes.', recommended: true },
      { profile: 'Maximaliste open source', reason: 'Le firmware propriétaire de Ledger peut être rédhibitoire. Préférez Trezor ou BitBox02.', recommended: false },
    ],
    alternatives: ['ledger-stax', 'trezor-safe-5', 'trezor-model-t', 'bitbox02'],
    faq: [
      { q: 'Le Ledger Nano X est-il sûr ?', a: 'Oui, le Nano X utilise une puce certifiée CC EAL5+. Vos clés privées ne quittent jamais l\'appareil. C\'est le même niveau de sécurité que les passeports biométriques.' },
      { q: 'Combien de cryptos peut stocker le Nano X ?', a: 'Le Nano X supporte plus de 5 500 cryptomonnaies et tokens. Vous pouvez installer jusqu\'à 100 apps simultanément.' },
      { q: 'Le Bluetooth est-il sécurisé ?', a: 'Oui, la connexion Bluetooth est chiffrée et les transactions doivent toujours être confirmées physiquement sur l\'appareil. Les clés privées ne sont jamais transmises.' },
      { q: 'Quelle différence entre Nano X et Nano S Plus ?', a: 'Le Nano X a le Bluetooth, une batterie et peut installer jusqu\'à 100 apps (vs 3-5). Le Nano S Plus (79€) est plus abordable mais sans connectivité sans fil.' },
      { q: 'Que se passe-t-il si je perds mon Ledger ?', a: 'Vos cryptos sont récupérables avec la seed phrase de 24 mots sur n\'importe quel wallet compatible BIP39. Sans la seed, les fonds sont perdus.' },
      { q: 'Où acheter le Ledger Nano X ?', a: 'Uniquement sur le site officiel ledger.com ou les revendeurs agréés. N\'achetez jamais d\'occasion ou sur des marketplaces non officielles.' },
    ],
    hasBluetooth: true,
    hasTouchscreen: false,
  },

  'ledger-stax': {
    slug: 'ledger-stax',
    name: 'Ledger Stax',
    brand: 'Ledger',
    image: '/images/wallets/ledger-stax.png',
    affiliateUrl: '#',
    price: '399 €',

    metaTitle: 'Avis Ledger Stax 2026 : Test Complet, Écran E-Ink, Prix | CryptoSous',
    metaDescription: 'Notre avis complet sur le Ledger Stax en 2026. Écran E-Ink tactile, design premium, sécurité CC EAL6+. Le wallet hardware le plus innovant ?',
    overallScore: 8.4,
    verdict: 'Le wallet hardware le plus innovant avec son écran E-Ink tactile, mais un prix premium de 399€ qui le réserve aux passionnés.',
    lastUpdated: '2026-02-01',

    specs: {
      screen: 'Écran E-Ink tactile 3.7" courbé',
      connectivity: ['USB-C', 'Bluetooth 5.2', 'NFC', 'Qi (charge sans fil)'],
      battery: '200 mAh (~10h)',
      dimensions: '85 x 54 x 6 mm',
      weight: '45 g',
      coinsSupported: 5500,
      material: 'Aluminium et verre',
      certifications: ['CC EAL6+'],
      openSource: false,
      companionApp: 'Ledger Live',
    },
    ratings: [
      { label: 'Sécurité', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 9.0, color: 'var(--color-gold)' },
      { label: 'Design', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Compatibilité', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Rapport qualité-prix', score: 6.0, color: 'var(--color-gold)' },
    ],
    pros: [
      'Écran E-Ink tactile 3.7" — lisibilité exceptionnelle',
      'Design premium et format carte de crédit',
      'Puce sécurisée CC EAL6+ (niveau supérieur au Nano X)',
      'NFC et charge sans fil Qi',
      'Personnalisation de l\'écran (NFT, image)',
      '5 500+ cryptos via Ledger Live',
    ],
    cons: [
      'Prix élevé de 399€',
      'Firmware propriétaire (comme tous les Ledger)',
      'Fragilité potentielle de l\'écran tactile',
      'Surcoût difficile à justifier vs Nano X pour la plupart des utilisateurs',
    ],
    keyTakeaways: [
      'Le Ledger Stax est le premier wallet hardware avec un écran E-Ink tactile courbé.',
      'Certification CC EAL6+ — le plus haut niveau de sécurité disponible.',
      'Format carte de crédit élégant, conçu par Tony Fadell (créateur de l\'iPod).',
      'NFC intégré pour les paiements et la charge sans fil Qi.',
      'À 399€, c\'est un produit premium réservé aux enthousiastes.',
    ],
    editorialSections: [
      {
        id: 'design',
        title: 'Design et construction',
        content: 'Le Ledger Stax a été conçu par Tony Fadell, le créateur de l\'iPod et du thermostat Nest. Le format carte de crédit (85 x 54 x 6 mm) est élégant et se glisse dans un portefeuille. L\'écran E-Ink tactile courbé de 3.7 pouces couvre toute la face avant, offrant une lisibilité exceptionnelle même en plein soleil. Le boîtier en aluminium et verre donne une sensation premium. L\'écran affiche en permanence une image personnalisable (NFT, logo) même éteint, grâce à la technologie E-Ink.',
      },
      {
        id: 'securite',
        title: 'Sécurité',
        content: 'Le Stax embarque une puce sécurisée certifiée CC EAL6+, un cran au-dessus du Nano X (EAL5+). C\'est le niveau de certification le plus élevé disponible dans un produit grand public. Les clés privées sont stockées exclusivement dans la puce sécurisée. La vérification du firmware, le PIN et la seed phrase de 24 mots assurent une protection multicouche. Le NFC utilise un protocole sécurisé pour les interactions.',
      },
      {
        id: 'configuration',
        title: 'Configuration et prise en main',
        content: 'Grâce à l\'écran tactile, la configuration du Stax est la plus intuitive de tous les hardware wallets. Les instructions s\'affichent directement sur l\'écran, la saisie du PIN se fait sur le clavier tactile, et la vérification de la seed phrase est guidée étape par étape. La connexion à Ledger Live se fait via Bluetooth ou USB-C. Comptez environ 10-15 minutes pour la première configuration.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies supportées',
        content: 'Comme tous les produits Ledger, le Stax supporte plus de 5 500 cryptomonnaies et tokens via Ledger Live. La capacité de stockage d\'applications est généreuse, permettant de gérer un portfolio très diversifié. Toutes les blockchains majeures sont supportées.',
      },
      {
        id: 'app-compagnon',
        title: 'Ledger Live',
        content: 'Le Stax utilise la même application Ledger Live que le Nano X, avec toutes ses fonctionnalités : achat, vente, swap, staking, accès DeFi et suivi de portfolio. L\'expérience est enrichie par l\'écran tactile du Stax qui permet de vérifier les détails des transactions de manière plus confortable.',
      },
      {
        id: 'connectivite',
        title: 'Connectivité',
        content: 'Le Stax offre la connectivité la plus complète : USB-C, Bluetooth 5.2, NFC et charge sans fil Qi. Le NFC permet de tap-to-sign les transactions, une fonctionnalité unique. La charge Qi élimine le besoin de câble. La batterie de 200 mAh offre environ 10 heures d\'utilisation.',
      },
      {
        id: 'garantie',
        title: 'Garantie et SAV',
        content: 'Garantie 2 ans par Ledger. Le même support technique que pour le Nano X. Vu le prix premium, une attention particulière à la protection physique est recommandée — un étui est inclus dans la boîte.',
      },
    ],
    targetAudience: [
      { profile: 'Early adopter / tech enthusiast', reason: 'L\'écran E-Ink et le design Fadell en font un objet tech désirable.', recommended: true },
      { profile: 'Investisseur avec un portfolio conséquent', reason: 'La sécurité CC EAL6+ et l\'UX premium justifient l\'investissement.', recommended: true },
      { profile: 'Débutant avec budget limité', reason: 'À 399€, le Nano X à 149€ offre 95% des fonctionnalités pour 2.5x moins cher.', recommended: false },
      { profile: 'Utilisateur cherchant l\'open source', reason: 'Firmware propriétaire — les puristes préféreront Trezor ou BitBox02.', recommended: false },
    ],
    alternatives: ['ledger-nano-x', 'trezor-safe-5', 'trezor-model-t', 'bitbox02'],
    faq: [
      { q: 'Le Ledger Stax vaut-il 399€ ?', a: 'Pour la majorité des utilisateurs, le Nano X à 149€ suffit. Le Stax se justifie pour ceux qui valorisent le design, l\'écran tactile E-Ink et la connectivité NFC/Qi.' },
      { q: 'Quelle différence entre le Stax et le Nano X ?', a: 'Écran E-Ink tactile 3.7" vs OLED petit, certification CC EAL6+ vs EAL5+, NFC et charge sans fil, format carte de crédit, mais même nombre de cryptos supportées.' },
      { q: 'L\'écran E-Ink est-il fragile ?', a: 'L\'écran est protégé par du verre Gorilla Glass. Ledger inclut un étui de protection. Il est plus résistant qu\'un écran LCD classique grâce à l\'absence de rétroéclairage.' },
      { q: 'Peut-on afficher des NFT sur le Stax ?', a: 'Oui, l\'écran E-Ink peut afficher en permanence un NFT ou une image personnalisée, même lorsque l\'appareil est éteint.' },
      { q: 'Le Stax utilise-t-il Ledger Live ?', a: 'Oui, exactement la même application que le Nano X avec toutes les mêmes fonctionnalités.' },
      { q: 'La charge sans fil Qi fonctionne-t-elle avec tout chargeur ?', a: 'Oui, le Stax est compatible avec tout chargeur Qi standard (iPhone, Samsung, etc.).' },
    ],
    hasBluetooth: true,
    hasTouchscreen: true,
  },

  'trezor-safe-5': {
    slug: 'trezor-safe-5',
    name: 'Trezor Safe 5',
    brand: 'Trezor',
    image: '/images/wallets/trezor-safe-5.png',
    affiliateUrl: '#',
    price: '169 €',

    metaTitle: 'Avis Trezor Safe 5 2026 : Test Complet, Sécurité, Prix | CryptoSous',
    metaDescription: 'Notre avis complet sur le Trezor Safe 5 en 2026. Écran tactile couleur, firmware open source, puce sécurisée EAL6+. Le meilleur wallet Trezor ?',
    overallScore: 8.6,
    verdict: 'Le meilleur hardware wallet open source du marché, avec un écran tactile couleur et une sécurité de pointe. Le concurrent direct du Nano X.',
    lastUpdated: '2026-02-01',

    specs: {
      screen: 'Écran tactile couleur IPS 1.54" (240x240px)',
      connectivity: ['USB-C'],
      battery: null,
      dimensions: '59 x 32 x 10 mm',
      weight: '22 g',
      coinsSupported: 9000,
      material: 'Plastique renforcé avec finition soft-touch',
      certifications: ['CC EAL6+'],
      openSource: true,
      companionApp: 'Trezor Suite',
    },
    ratings: [
      { label: 'Sécurité', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 8.5, color: 'var(--color-gold)' },
      { label: 'Design', score: 8.0, color: 'var(--color-gold)' },
      { label: 'Compatibilité', score: 9.0, color: 'var(--color-gold)' },
      { label: 'Rapport qualité-prix', score: 8.5, color: 'var(--color-gold)' },
    ],
    pros: [
      'Firmware entièrement open source — transparence totale',
      'Puce sécurisée CC EAL6+ (même niveau que le Ledger Stax)',
      'Écran tactile couleur pour une navigation confortable',
      '9 000+ cryptos et tokens supportés',
      'Trezor Suite : interface moderne et complète',
      'Prix compétitif de 169€',
    ],
    cons: [
      'Pas de Bluetooth — connexion USB-C uniquement',
      'Pas de batterie — alimentation par USB',
      'Pas de NFC ni de charge sans fil',
      'Catalogue d\'intégrations DeFi moins étendu que Ledger',
    ],
    keyTakeaways: [
      'Le Trezor Safe 5 est le premier Trezor avec un écran tactile couleur et une puce EAL6+.',
      'Firmware entièrement open source — auditable par la communauté.',
      '9 000+ cryptos supportés, le plus large catalogue du marché.',
      'Trezor Suite offre une expérience desktop/web moderne et sécurisée.',
      'Alternative crédible au Ledger Nano X pour les partisans de l\'open source.',
    ],
    editorialSections: [
      {
        id: 'design',
        title: 'Design et construction',
        content: 'Le Trezor Safe 5 marque un bond en avant par rapport au Model T. Format compact (59 x 32 x 10 mm), finition soft-touch agréable et écran tactile couleur IPS de 1.54 pouces (240x240px). La navigation sur l\'écran tactile est fluide pour confirmer les transactions et vérifier les adresses. Le design est sobre et discret, avec un port USB-C pour la connexion et l\'alimentation.',
      },
      {
        id: 'securite',
        title: 'Sécurité',
        content: 'Le Safe 5 combine deux atouts majeurs : une puce sécurisée CC EAL6+ (le plus haut niveau grand public) ET un firmware entièrement open source. C\'est le seul wallet à offrir cette combinaison. Le code est auditable par tous sur GitHub, ce qui élimine le risque de backdoor. La seed phrase de 12 ou 24 mots, le PIN avec protection anti-bruteforce, et la vérification d\'intégrité au démarrage complètent la sécurité. Shamir Backup (SLIP-39) permet de diviser la seed en plusieurs parts.',
      },
      {
        id: 'configuration',
        title: 'Configuration et prise en main',
        content: 'La configuration via l\'écran tactile est intuitive : création du PIN, génération et sauvegarde de la seed, et installation de Trezor Suite. L\'ensemble prend 10-15 minutes. Trezor Suite (web ou desktop) guide chaque étape avec des explications claires. Pas de Bluetooth, donc une connexion USB-C est nécessaire.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies supportées',
        content: 'Le Trezor Safe 5 supporte plus de 9 000 cryptomonnaies et tokens, le catalogue le plus large de tous les hardware wallets. Bitcoin, Ethereum, Solana, et la quasi-totalité des tokens ERC-20 sont compatibles. Le support natif de Bitcoin est particulièrement poussé avec des fonctionnalités avancées (coin control, Tor intégré).',
      },
      {
        id: 'app-compagnon',
        title: 'Trezor Suite',
        content: 'Trezor Suite est l\'application compagnon (desktop + web) qui offre : gestion de portfolio, envoi/réception, historique détaillé des transactions, intégration Tor pour la confidentialité, achat de crypto via des partenaires, et coin control avancé pour Bitcoin. L\'interface est moderne et régulièrement mise à jour. L\'intégration DeFi est plus limitée que Ledger Live.',
      },
      {
        id: 'connectivite',
        title: 'Connectivité',
        content: 'Le Safe 5 utilise exclusivement le USB-C pour la connexion et l\'alimentation. Pas de Bluetooth, NFC ou batterie — c\'est un choix délibéré de Trezor qui considère que le filaire est plus sécurisé. L\'absence de batterie signifie aussi pas de risque de panne de batterie et une durée de vie théoriquement illimitée.',
      },
      {
        id: 'garantie',
        title: 'Garantie et SAV',
        content: 'Garantie 2 ans par SatoshiLabs (fabricant de Trezor). Support email et centre d\'aide complet. La communauté open source est très active pour l\'aide et les développements tiers. Achetez uniquement sur trezor.io ou les revendeurs officiels.',
      },
    ],
    targetAudience: [
      { profile: 'Partisan de l\'open source', reason: 'Le seul wallet EAL6+ avec firmware entièrement open source et auditable.', recommended: true },
      { profile: 'Bitcoiner maximaliste', reason: 'Support Bitcoin avancé : coin control, Tor intégré, Shamir Backup.', recommended: true },
      { profile: 'Investisseur cherchant la polyvalence', reason: '9 000+ cryptos, écran tactile et prix compétitif.', recommended: true },
      { profile: 'Utilisateur mobile sans ordinateur', reason: 'Pas de Bluetooth — nécessite une connexion USB à un ordinateur ou adaptateur mobile.', recommended: false },
    ],
    alternatives: ['ledger-nano-x', 'ledger-stax', 'trezor-model-t', 'bitbox02'],
    faq: [
      { q: 'Le Trezor Safe 5 est-il open source ?', a: 'Oui, le firmware est entièrement open source et auditable sur GitHub. C\'est le seul wallet avec puce EAL6+ qui offre cette transparence.' },
      { q: 'Trezor Safe 5 ou Ledger Nano X ?', a: 'Safe 5 pour l\'open source et le plus grand catalogue de cryptos. Nano X pour le Bluetooth et l\'écosystème DeFi plus étendu de Ledger Live. Les deux sont d\'excellents choix.' },
      { q: 'Le Trezor Safe 5 a-t-il le Bluetooth ?', a: 'Non, le Safe 5 utilise uniquement le USB-C. Trezor considère que la connexion filaire est plus sécurisée.' },
      { q: 'Qu\'est-ce que le Shamir Backup ?', a: 'C\'est une méthode pour diviser votre seed phrase en plusieurs parts (ex: 3 parts sur 5 nécessaires). Plus sûr qu\'une seule seed stockée à un endroit.' },
      { q: 'Combien de cryptos supporte le Safe 5 ?', a: 'Plus de 9 000 cryptomonnaies et tokens, le plus large catalogue de tous les hardware wallets.' },
      { q: 'Le Trezor Safe 5 fonctionne-t-il sur mobile ?', a: 'Via USB-C avec un adaptateur OTG, oui. Mais l\'absence de Bluetooth rend l\'usage mobile moins pratique que le Ledger Nano X.' },
    ],
    hasBluetooth: false,
    hasTouchscreen: true,
  },

  'trezor-model-t': {
    slug: 'trezor-model-t',
    name: 'Trezor Model T',
    brand: 'Trezor',
    image: '/images/wallets/trezor-model-t.png',
    affiliateUrl: '#',
    price: '179 €',

    metaTitle: 'Avis Trezor Model T 2026 : Test Complet, Sécurité, Prix | CryptoSous',
    metaDescription: 'Notre avis complet sur le Trezor Model T en 2026. Le wallet historique de Trezor : écran tactile, open source, 8 000+ cryptos. Vaut-il encore le coup ?',
    overallScore: 7.8,
    verdict: 'Un wallet hardware éprouvé et open source, mais progressivement remplacé par le Safe 5 qui offre plus pour un prix similaire.',
    lastUpdated: '2026-02-01',

    specs: {
      screen: 'Écran tactile LCD 1.54" (240x240px)',
      connectivity: ['USB-C', 'MicroSD'],
      battery: null,
      dimensions: '64 x 39 x 10 mm',
      weight: '22 g',
      coinsSupported: 8000,
      material: 'Plastique ABS',
      certifications: [],
      openSource: true,
      companionApp: 'Trezor Suite',
    },
    ratings: [
      { label: 'Sécurité', score: 8.5, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 8.0, color: 'var(--color-gold)' },
      { label: 'Design', score: 7.0, color: 'var(--color-gold)' },
      { label: 'Compatibilité', score: 8.5, color: 'var(--color-gold)' },
      { label: 'Rapport qualité-prix', score: 7.0, color: 'var(--color-gold)' },
    ],
    pros: [
      'Firmware entièrement open source',
      'Écran tactile couleur pour la validation des transactions',
      '8 000+ cryptos et tokens supportés',
      'Slot MicroSD pour stockage chiffré',
      'Trezor Suite moderne et complète',
      'Shamir Backup (SLIP-39) disponible',
    ],
    cons: [
      'Pas de puce sécurisée dédiée (contrairement au Safe 5)',
      'Design plastique moins premium',
      'Pas de Bluetooth ni batterie',
      'Remplacé par le Safe 5 — stock limité',
    ],
    keyTakeaways: [
      'Le Model T est le wallet historique de Trezor, progressivement remplacé par le Safe 5.',
      'Firmware open source et écran tactile, mais sans puce sécurisée dédiée.',
      '8 000+ cryptos supportées via Trezor Suite.',
      'Le slot MicroSD permet le stockage chiffré des données.',
      'Pour un achat neuf, le Safe 5 est un meilleur choix au même prix.',
    ],
    editorialSections: [
      {
        id: 'design',
        title: 'Design et construction',
        content: 'Le Model T adopte un format rectangulaire compact avec un écran tactile LCD couleur de 1.54 pouces. Le boîtier en plastique ABS est fonctionnel mais manque de premium comparé au Safe 5 ou au Ledger Stax. Le port USB-C et un slot MicroSD complètent les connectiques. Le design est pratique mais daté face à la nouvelle génération de wallets.',
      },
      {
        id: 'securite',
        title: 'Sécurité',
        content: 'Le Model T repose sur un processeur STM32 sans puce sécurisée dédiée — une différence clé avec le Safe 5 (CC EAL6+) ou le Nano X (CC EAL5+). La sécurité s\'appuie sur le firmware open source, auditable par la communauté. Le PIN, la seed phrase et le Shamir Backup protègent les fonds. Le slot MicroSD permet de stocker des données chiffrées. Bien que des vulnérabilités physiques aient été démontrées en lab, elles nécessitent un accès physique prolongé à l\'appareil.',
      },
      {
        id: 'configuration',
        title: 'Configuration et prise en main',
        content: 'Configuration similaire au Safe 5 via l\'écran tactile et Trezor Suite. PIN, seed phrase et paramètres de sécurité se configurent en 10-15 minutes. L\'interface est intuitive et bien guidée.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies supportées',
        content: 'Plus de 8 000 cryptomonnaies et tokens supportés. Le support est légèrement inférieur au Safe 5 (9 000+) mais couvre la quasi-totalité des besoins. Bitcoin, Ethereum et tous les tokens majeurs sont compatibles.',
      },
      {
        id: 'app-compagnon',
        title: 'Trezor Suite',
        content: 'Même application Trezor Suite que le Safe 5, avec toutes les fonctionnalités : gestion de portfolio, Tor intégré, coin control, achat de crypto. L\'expérience est identique.',
      },
      {
        id: 'connectivite',
        title: 'Connectivité',
        content: 'USB-C pour la connexion et l\'alimentation, plus un slot MicroSD (unique dans le marché). Pas de Bluetooth ni de batterie. Le MicroSD peut être utilisé pour le stockage chiffré ou les mises à jour firmware.',
      },
      {
        id: 'garantie',
        title: 'Garantie et SAV',
        content: 'Garantie 2 ans par SatoshiLabs. Note : le Model T est progressivement remplacé par le Safe 5. Il est encore disponible mais le stock est limité. Pour un achat neuf, le Safe 5 est recommandé.',
      },
    ],
    targetAudience: [
      { profile: 'Utilisateur Trezor existant', reason: 'Si vous avez déjà un Model T et qu\'il fonctionne bien, pas besoin de changer immédiatement.', recommended: true },
      { profile: 'Acheteur cherchant une bonne affaire', reason: 'Des réductions sont parfois disponibles en raison de la transition vers le Safe 5.', recommended: true },
      { profile: 'Nouvel acheteur', reason: 'Le Safe 5 offre plus (EAL6+, meilleur écran) pour un prix similaire. Préférez le Safe 5.', recommended: false },
      { profile: 'Utilisateur mobile', reason: 'Pas de Bluetooth — même limitation que le Safe 5.', recommended: false },
    ],
    alternatives: ['trezor-safe-5', 'ledger-nano-x', 'ledger-stax', 'bitbox02'],
    faq: [
      { q: 'Le Trezor Model T est-il encore en vente ?', a: 'Oui, mais il est progressivement remplacé par le Trezor Safe 5. Le stock est limité. Pour un achat neuf, le Safe 5 est recommandé.' },
      { q: 'Trezor Model T ou Safe 5 ?', a: 'Le Safe 5 est supérieur : puce EAL6+, meilleur écran, plus de cryptos supportées, prix similaire. Le Model T reste un bon wallet si vous l\'avez déjà.' },
      { q: 'Le Model T est-il sécurisé sans puce sécurisée ?', a: 'La sécurité repose sur le firmware open source et les protections logicielles. C\'est moins robuste qu\'une puce EAL6+ contre les attaques physiques avancées, mais suffisant pour la plupart des utilisateurs.' },
      { q: 'Le Model T a-t-il le Bluetooth ?', a: 'Non, connexion USB-C uniquement. Aucun wallet Trezor n\'a de Bluetooth.' },
      { q: 'À quoi sert le slot MicroSD ?', a: 'Il permet de stocker des données chiffrées et peut être utilisé pour les mises à jour firmware. C\'est une fonctionnalité unique à Trezor.' },
      { q: 'Le Model T supporte-t-il Shamir Backup ?', a: 'Oui, le Model T supporte le Shamir Backup (SLIP-39) pour diviser votre seed phrase en plusieurs parts sécurisées.' },
    ],
    hasBluetooth: false,
    hasTouchscreen: true,
  },

  bitbox02: {
    slug: 'bitbox02',
    name: 'BitBox02',
    brand: 'Shift Crypto',
    image: '/images/wallets/bitbox02.png',
    affiliateUrl: '#',
    price: '149 €',

    metaTitle: 'Avis BitBox02 2026 : Test Complet, Sécurité, Prix | CryptoSous',
    metaDescription: 'Notre avis complet sur le BitBox02 en 2026. Le wallet suisse open source : puce sécurisée, MicroSD backup, design minimaliste. Test détaillé.',
    overallScore: 8.2,
    verdict: 'Le choix idéal pour les puristes de la sécurité : open source, fabrication suisse, design minimaliste et backup MicroSD innovant.',
    lastUpdated: '2026-02-01',

    specs: {
      screen: 'Écran OLED 128x64px',
      connectivity: ['USB-C'],
      battery: null,
      dimensions: '54.5 x 25.4 x 9.6 mm',
      weight: '12 g',
      coinsSupported: 1500,
      material: 'Polycarbonate',
      certifications: ['ATECC608B (puce sécurisée)'],
      openSource: true,
      companionApp: 'BitBoxApp',
    },
    ratings: [
      { label: 'Sécurité', score: 9.5, color: 'var(--color-gold)' },
      { label: 'Facilité', score: 8.5, color: 'var(--color-gold)' },
      { label: 'Design', score: 8.0, color: 'var(--color-gold)' },
      { label: 'Compatibilité', score: 7.0, color: 'var(--color-gold)' },
      { label: 'Rapport qualité-prix', score: 8.5, color: 'var(--color-gold)' },
    ],
    pros: [
      'Entièrement open source (firmware + hardware)',
      'Fabrication suisse — qualité et confiance',
      'Backup MicroSD (pas besoin de noter la seed à la main)',
      'Design ultra-compact et léger (12g)',
      'Puce sécurisée ATECC608B en dual-chip',
      'BitBoxApp simple et efficace',
    ],
    cons: [
      'Catalogue de cryptos plus limité (1 500 vs 5 500+)',
      'Écran OLED petit, pas tactile',
      'Pas de Bluetooth ni de batterie',
      'Moins d\'intégrations DeFi que Ledger',
    ],
    keyTakeaways: [
      'Le BitBox02 est le wallet le plus transparent : firmware ET hardware open source.',
      'Fabriqué en Suisse par Shift Crypto — qualité et juridiction de confiance.',
      'Backup innovant sur MicroSD — plus rapide et fiable que noter 24 mots.',
      'Architecture dual-chip avec puce sécurisée ATECC608B.',
      'Design ultra-compact de 12g — le plus léger du marché.',
    ],
    editorialSections: [
      {
        id: 'design',
        title: 'Design et construction',
        content: 'Le BitBox02 est le wallet hardware le plus compact et léger du marché (54.5 x 25.4 x 9.6 mm, 12g). Son design minimaliste en polycarbonate s\'insère dans un port USB-C comme une clé USB. L\'écran OLED de 128x64px est petit mais lisible. La navigation se fait via des capteurs tactiles sur les côtés de l\'appareil — un système original et efficace une fois maîtrisé. L\'ensemble est discret et facilement transportable.',
      },
      {
        id: 'securite',
        title: 'Sécurité',
        content: 'Le BitBox02 adopte une architecture dual-chip unique : un microcontrôleur principal couplé à une puce sécurisée ATECC608B. Les deux doivent s\'accorder pour autoriser une transaction. Le firmware ET les schémas hardware sont entièrement open source, le niveau de transparence le plus élevé du marché. La seed phrase est sauvegardée automatiquement sur MicroSD chiffrée, éliminant le risque d\'erreur de notation. Le code a été audité par des cabinets de sécurité indépendants. Anti-tampering : l\'appareil efface les données si une tentative de manipulation est détectée.',
      },
      {
        id: 'configuration',
        title: 'Configuration et prise en main',
        content: 'La configuration est remarquablement simple grâce au backup MicroSD. Branchez le BitBox02, installez BitBoxApp, créez un PIN, et la seed est automatiquement sauvegardée sur la MicroSD incluse. Pas besoin de noter 24 mots — insérez simplement la MicroSD et le backup se fait automatiquement. Comptez 5 minutes pour l\'ensemble. Rangez ensuite la MicroSD en lieu sûr.',
      },
      {
        id: 'cryptos',
        title: 'Cryptomonnaies supportées',
        content: 'Le BitBox02 Multi edition supporte environ 1 500 cryptomonnaies (Bitcoin, Ethereum, Litecoin, et tous les tokens ERC-20). Un modèle "Bitcoin-only" est également disponible pour les maximalistes. Le catalogue est plus restreint que Ledger ou Trezor, mais couvre les besoins de la majorité des investisseurs. Solana et certaines blockchains récentes ne sont pas supportées.',
      },
      {
        id: 'app-compagnon',
        title: 'BitBoxApp',
        content: 'BitBoxApp (desktop) est l\'application compagnon : claire, épurée et fonctionnelle. Envoi/réception, gestion multi-comptes, vérification d\'adresses sur l\'appareil, et connexion Tor optionnelle pour la confidentialité. L\'interface est moins riche que Ledger Live ou Trezor Suite (pas de staking intégré, pas de DeFi), mais parfaitement adaptée à la gestion sécurisée de crypto.',
      },
      {
        id: 'connectivite',
        title: 'Connectivité',
        content: 'USB-C uniquement — pas de Bluetooth ni de batterie. Le BitBox02 tire son alimentation du port USB. Le slot MicroSD est dédié au backup. Cette simplicité est un choix de design : moins de surface d\'attaque.',
      },
      {
        id: 'garantie',
        title: 'Garantie et SAV',
        content: 'Garantie par Shift Crypto (Suisse). Support par email réactif et communauté GitHub active. La qualité de fabrication suisse assure une bonne durabilité. Achetez sur shiftcrypto.ch ou les revendeurs agréés.',
      },
    ],
    targetAudience: [
      { profile: 'Puriste de l\'open source', reason: 'Firmware ET hardware open source — le niveau de transparence ultime.', recommended: true },
      { profile: 'Bitcoiner maximaliste', reason: 'Version Bitcoin-only disponible, épurée et optimisée pour BTC uniquement.', recommended: true },
      { profile: 'Utilisateur cherchant la simplicité', reason: 'Backup MicroSD automatique et configuration en 5 minutes.', recommended: true },
      { profile: 'Investisseur multi-chain', reason: 'Catalogue limité à ~1 500 cryptos. Si vous avez besoin de Solana ou de chaînes récentes, préférez Ledger.', recommended: false },
    ],
    alternatives: ['ledger-nano-x', 'trezor-safe-5', 'trezor-model-t', 'ledger-stax'],
    faq: [
      { q: 'Le BitBox02 est-il open source ?', a: 'Oui, entièrement : firmware ET schémas hardware sont publics sur GitHub. C\'est le wallet le plus transparent du marché.' },
      { q: 'Comment fonctionne le backup MicroSD ?', a: 'Lors de la configuration, la seed est automatiquement chiffrée et sauvegardée sur une MicroSD incluse. Pour restaurer, il suffit d\'insérer la MicroSD. Plus besoin de noter 24 mots.' },
      { q: 'BitBox02 ou Ledger Nano X ?', a: 'BitBox02 pour l\'open source et le backup MicroSD. Nano X pour le Bluetooth, plus de cryptos (5 500+) et l\'écosystème DeFi de Ledger Live.' },
      { q: 'Le BitBox02 supporte-t-il Solana ?', a: 'Non, Solana n\'est pas supportée actuellement. Le BitBox02 se concentre sur Bitcoin, Ethereum, Litecoin et les tokens ERC-20.' },
      { q: 'Qu\'est-ce que la version Bitcoin-only ?', a: 'Une version du BitBox02 qui ne supporte que Bitcoin. Le firmware est encore plus réduit et auditable, idéal pour les maximalistes Bitcoin.' },
      { q: 'Le BitBox02 est-il fabriqué en Suisse ?', a: 'Oui, conçu et fabriqué en Suisse par Shift Crypto, basé à Zurich.' },
    ],
    hasBluetooth: false,
    hasTouchscreen: false,
  },
};

export function getWalletBySlug(slug: string): WalletReview | undefined {
  return WALLETS[slug];
}

export function getAllWalletSlugs(): string[] {
  return Object.keys(WALLETS);
}

export function getWalletsSortedByScore(): WalletReview[] {
  return Object.values(WALLETS).sort((a, b) => b.overallScore - a.overallScore);
}
