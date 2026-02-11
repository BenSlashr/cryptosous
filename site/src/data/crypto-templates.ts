/**
 * Système de templates pour les pages prix crypto.
 * Génère du contenu français unique par coin basé sur ses propriétés.
 */

export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_date: string;
}

type Category = 'layer1' | 'layer2' | 'defi' | 'meme' | 'infrastructure' | 'exchange' | 'stablecoin' | 'gaming' | 'ai' | 'storage' | 'privacy' | 'payment' | 'other';

// Mapping des coins connus vers leurs catégories
const KNOWN_CATEGORIES: Record<string, Category> = {
  // Layer 1
  bitcoin: 'layer1', ethereum: 'layer1', solana: 'layer1', cardano: 'layer1',
  avalanche: 'layer1', polkadot: 'layer1', tron: 'layer1', near: 'layer1',
  sui: 'layer1', aptos: 'layer1', cosmos: 'layer1', algorand: 'layer1',
  'hedera-hashgraph': 'layer1', fantom: 'layer1', sei: 'layer1',
  ton: 'layer1', kaspa: 'layer1', internet_computer: 'layer1',
  'internet-computer': 'layer1', elrond: 'layer1', multiversx: 'layer1',
  flow: 'layer1', mina: 'layer1', celo: 'layer1', harmony: 'layer1',
  zilliqa: 'layer1', theta: 'layer1',

  // Layer 2
  'matic-network': 'layer2', arbitrum: 'layer2', optimism: 'layer2',
  starknet: 'layer2', 'mantle-network': 'layer2', blast: 'layer2',
  immutable: 'layer2', 'immutable-x': 'layer2', loopring: 'layer2',
  metis: 'layer2', boba: 'layer2', blockstack: 'layer2',

  // DeFi
  uniswap: 'defi', aave: 'defi', 'maker-dao': 'defi', maker: 'defi',
  'curve-dao-token': 'defi', 'compound-governance-token': 'defi',
  'lido-dao': 'defi', 'rocket-pool': 'defi', 'pancakeswap-token': 'defi',
  sushi: 'defi', '1inch': 'defi', 'jupiter-exchange-solana': 'defi',
  raydium: 'defi', orca: 'defi', 'convex-finance': 'defi',
  yearn: 'defi', synthetix: 'defi', 'frax-share': 'defi',
  pendle: 'defi', 'ethena-usde': 'defi', 'ondo-finance': 'defi',
  morpho: 'defi', eigenlayer: 'defi', 'jito-governance-token': 'defi',

  // Meme coins
  dogecoin: 'meme', 'shiba-inu': 'meme', pepe: 'meme',
  'floki-inu': 'meme', bonk: 'meme', 'dogwifhat': 'meme',
  'baby-doge-coin': 'meme', 'brett-based': 'meme', mog: 'meme',
  turbo: 'meme', popcat: 'meme',

  // Infrastructure / oracles
  chainlink: 'infrastructure', 'the-graph': 'infrastructure',
  pyth: 'infrastructure', band: 'infrastructure',

  // Exchange tokens
  binancecoin: 'exchange', 'crypto-com-chain': 'exchange',
  'okb': 'exchange', 'kucoin-shares': 'exchange',
  'ftx-token': 'exchange', 'gate-token': 'exchange',
  ripple: 'payment', stellar: 'payment', litecoin: 'payment',

  // AI
  'render-token': 'ai', 'fetch-ai': 'ai', 'singularitynet': 'ai',
  'ocean-protocol': 'ai', 'akash-network': 'ai', bittensor: 'ai',
  'worldcoin-wld': 'ai',

  // Storage
  filecoin: 'storage', arweave: 'storage',

  // Gaming
  'axie-infinity': 'gaming', 'the-sandbox': 'gaming',
  decentraland: 'gaming', 'gala-games': 'gaming', 'enjin-coin': 'gaming',

  // Celestia is modular blockchain - put as L1
  celestia: 'layer1',
};

function getCategory(coinId: string): Category {
  return KNOWN_CATEGORIES[coinId] || 'other';
}

function getTier(rank: number): 'mega' | 'large' | 'mid' | 'small' {
  if (rank <= 10) return 'mega';
  if (rank <= 30) return 'large';
  if (rank <= 100) return 'mid';
  return 'small';
}

function fmtSupply(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(1)} billion`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)} milliard`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} million`;
  return n.toLocaleString('fr-FR');
}

// ── Templates par catégorie ──────────────────────────────────

const categoryNames: Record<Category, string> = {
  layer1: 'blockchain Layer 1',
  layer2: 'solution Layer 2',
  defi: 'protocole de finance décentralisée (DeFi)',
  meme: 'meme coin',
  infrastructure: 'protocole d\'infrastructure blockchain',
  exchange: 'token d\'exchange',
  stablecoin: 'stablecoin',
  gaming: 'crypto gaming / metaverse',
  ai: 'crypto liée à l\'intelligence artificielle',
  storage: 'protocole de stockage décentralisé',
  privacy: 'crypto de confidentialité',
  payment: 'crypto de paiement',
  other: 'cryptomonnaie',
};

function generateWhatIsIt(coin: CoinMarketData, cat: Category): string {
  const { name, symbol } = coin;
  const catName = categoryNames[cat];
  const rank = coin.market_cap_rank;

  const intros: Record<Category, string> = {
    layer1: `${name} (${symbol}) est une ${catName} — autrement dit, un réseau blockchain autonome avec son propre mécanisme de consensus. Classé #${rank} par capitalisation, ${name} traite des transactions et exécute des smart contracts sur sa propre infrastructure. Comme toute blockchain de couche 1, ${name} vise à offrir un équilibre entre sécurité, décentralisation et performance.`,
    layer2: `${name} (${symbol}) est une ${catName} construite par-dessus une blockchain existante (souvent Ethereum). Son objectif : rendre les transactions plus rapides et moins chères, sans sacrifier la sécurité du réseau principal. Classé #${rank}, ${name} permet d'effectuer des opérations à une fraction du coût de la couche 1.`,
    defi: `${name} (${symbol}) est un ${catName}. Concrètement, c'est un service financier qui fonctionne sans banque ni intermédiaire — tout repose sur des smart contracts. Classé #${rank} par capitalisation, ${name} fait partie de l'écosystème DeFi qui gère des milliards d'euros de valeur.`,
    meme: `${name} (${symbol}) est un ${catName} — une crypto née de la culture internet et portée par sa communauté. Classé #${rank}, ${name} n'a pas vocation à résoudre un problème technique mais tire sa valeur de l'engouement collectif, du marketing viral et parfois du soutien de personnalités influentes.`,
    infrastructure: `${name} (${symbol}) est un ${catName}. C'est la "plomberie" invisible qui fait tourner l'écosystème crypto : il fournit des données, de l'indexation ou des services essentiels aux applications décentralisées. Classé #${rank}, ${name} est utilisé par des centaines de protocoles.`,
    exchange: `${name} (${symbol}) est un ${catName} émis par une plateforme d'échange centralisée. Détenir du ${symbol} offre des avantages sur la plateforme : réduction des frais, accès prioritaire aux ventes de tokens, et parfois du staking. Classé #${rank} par capitalisation.`,
    stablecoin: `${name} (${symbol}) est un ${catName} — une crypto conçue pour maintenir un prix stable, généralement indexé sur le dollar ou l'euro. Il sert de valeur refuge et de monnaie d'échange dans l'écosystème crypto.`,
    gaming: `${name} (${symbol}) est une ${catName}. Ce token alimente un écosystème de jeux vidéo et d'univers virtuels construits sur la blockchain. Classé #${rank}, ${name} permet d'acheter, vendre et échanger des actifs numériques dans des jeux play-to-earn.`,
    ai: `${name} (${symbol}) est une ${catName}. Ce projet se positionne à l'intersection de la blockchain et de l'IA, en proposant des services de calcul, de données ou de modèles décentralisés. Classé #${rank}, ${name} surfe sur la tendance IA qui attire des milliards d'investissements.`,
    storage: `${name} (${symbol}) est un ${catName}. Au lieu de stocker vos fichiers chez Google ou Amazon, ${name} utilise un réseau décentralisé d'ordinateurs pour héberger des données de façon permanente et résistante à la censure. Classé #${rank} par capitalisation.`,
    privacy: `${name} (${symbol}) est une ${catName} conçue pour protéger l'anonymat des transactions. Contrairement à Bitcoin où toutes les transactions sont publiques, ${name} masque les montants, les expéditeurs et les destinataires.`,
    payment: `${name} (${symbol}) est une ${catName} conçue pour faciliter les transferts d'argent. L'objectif : des paiements rapides, peu coûteux, accessibles partout dans le monde. Classé #${rank} par capitalisation.`,
    other: `${name} (${symbol}) est une ${catName} classée #${rank} par capitalisation de marché. Le ${symbol} s'échange sur les principales plateformes crypto et fait partie des actifs numériques suivis par les investisseurs.`,
  };

  return intros[cat];
}

function generateHowItWorks(coin: CoinMarketData, cat: Category): string {
  const { name, symbol } = coin;
  const supplyInfo = coin.max_supply
    ? `L'offre maximale est plafonnée à ${fmtSupply(coin.max_supply)} ${symbol}.`
    : `Il n'y a pas de limite d'offre pour le ${symbol} — de nouveaux tokens sont créés en continu.`;

  const mechanics: Record<Category, string> = {
    layer1: `${name} repose sur un réseau de validateurs qui vérifient et confirment les transactions. Les détenteurs de ${symbol} peuvent participer au réseau via le staking : ils verrouillent leurs tokens pour sécuriser la blockchain et reçoivent des récompenses en retour. ${supplyInfo} Chaque transaction sur ${name} nécessite un petit montant de ${symbol} en frais de réseau.`,
    layer2: `${name} regroupe des centaines de transactions en un seul lot, puis soumet une preuve compressée à la blockchain principale. Résultat : les utilisateurs paient une fraction des frais normaux tout en profitant de la sécurité du réseau sous-jacent. ${supplyInfo} Le ${symbol} sert à payer les frais sur le réseau et à participer à la gouvernance.`,
    defi: `${name} fonctionne via des smart contracts — des programmes autonomes déployés sur la blockchain. Les utilisateurs interagissent directement avec ces contrats, sans passer par un intermédiaire humain. ${supplyInfo} Le token ${symbol} sert généralement à la gouvernance du protocole : les détenteurs votent sur les évolutions du système.`,
    meme: `${name} fonctionne sur une blockchain existante et n'apporte pas d'innovation technique particulière. Sa force réside dans sa communauté et sa viralité. ${supplyInfo} Le ${symbol} s'échange sur les principales plateformes et peut connaître des variations de prix extrêmes en quelques heures.`,
    infrastructure: `${name} fournit des services essentiels aux autres protocoles blockchain. Son réseau décentralisé d'opérateurs traite les requêtes et fournit les données en échange de récompenses en ${symbol}. ${supplyInfo} Plus le réseau est utilisé, plus la demande de ${symbol} augmente.`,
    exchange: `Le ${symbol} est intégré à l'écosystème de sa plateforme d'échange. Il offre des réductions sur les frais de trading, un accès aux ventes de tokens, et peut être utilisé pour le staking. ${supplyInfo} La plateforme procède régulièrement à des "burns" — elle détruit des tokens pour réduire l'offre et soutenir le prix.`,
    stablecoin: `${name} maintient sa stabilité grâce à des réserves collatérales (dollars, obligations d'État) ou via des mécanismes algorithmiques. Chaque ${symbol} en circulation est censé être adossé à un actif réel de valeur équivalente.`,
    gaming: `${name} permet aux joueurs de posséder réellement leurs objets de jeu sous forme de NFT, et de les échanger contre du ${symbol}. Le modèle économique récompense les joueurs actifs avec des tokens échangeables sur le marché. ${supplyInfo}`,
    ai: `${name} décentralise les ressources de calcul nécessaires à l'intelligence artificielle. Les fournisseurs de GPU mettent leur puissance à disposition du réseau et sont rémunérés en ${symbol}. Les clients accèdent à ces ressources à un coût inférieur aux clouds centralisés. ${supplyInfo}`,
    storage: `${name} incite les opérateurs à stocker des données en les rémunérant en ${symbol}. Les fichiers sont découpés, chiffrés et répartis sur des milliers de nœuds dans le monde. Pour récupérer un fichier, le réseau rassemble les fragments automatiquement. ${supplyInfo}`,
    privacy: `${name} utilise des techniques cryptographiques avancées (ring signatures, zero-knowledge proofs) pour masquer les détails des transactions. L'expéditeur, le destinataire et le montant restent confidentiels, tout en étant vérifiables par le réseau. ${supplyInfo}`,
    payment: `${name} traite les transactions en quelques secondes pour des frais négligeables. Le réseau est conçu pour gérer un grand volume de paiements simultanés, ce qui le positionne comme une alternative aux réseaux bancaires traditionnels. ${supplyInfo}`,
    other: `${name} fonctionne sur la blockchain et utilise le ${symbol} comme token natif. ${supplyInfo} Les tokens s'échangent sur les principales plateformes d'échange crypto.`,
  };

  return mechanics[cat];
}

function generatePriceFactors(coin: CoinMarketData, cat: Category): string {
  const { name, symbol } = coin;
  const tier = getTier(coin.market_cap_rank);

  const common = tier === 'mega'
    ? `En tant que crypto majeure, le ${symbol} est fortement corrélé au sentiment global du marché. Les décisions de la Fed, l'inflation, et les flux institutionnels ont un impact direct.`
    : tier === 'large'
      ? `Le prix du ${symbol} suit en partie les mouvements du Bitcoin et de l'Ethereum, tout en réagissant à ses propres catalyseurs.`
      : `Le ${symbol} est plus volatil que les cryptos majeures. Les mouvements de prix peuvent être amplifiés dans les deux sens — à la hausse comme à la baisse.`;

  const specific: Record<Category, string> = {
    layer1: `L'activité sur le réseau ${name} (nombre de transactions, TVL DeFi, nouveaux projets déployés) influence directement la demande de ${symbol}. Les mises à jour du protocole et les annonces de partenariats sont des catalyseurs récurrents.`,
    layer2: `La croissance du réseau sous-jacent et l'adoption par les développeurs sont des facteurs clés. Plus d'applications sur ${name} = plus de demande de ${symbol}. Les incentives (airdrops, programmes de grants) attirent les utilisateurs et font bouger le prix.`,
    defi: `La TVL (Total Value Locked) dans ${name} est un indicateur clé : plus de valeur déposée signifie plus de confiance et plus de revenus pour le protocole. Les audits de sécurité, les hacks sur des protocoles concurrents, et les changements de rendement influencent le cours.`,
    meme: `Le prix du ${symbol} dépend presque exclusivement du sentiment sur les réseaux sociaux, des tweets de personnalités, et des vagues spéculatives. Les fondamentaux techniques comptent peu — c'est l'engouement communautaire qui fait le prix.`,
    infrastructure: `L'adoption de ${name} par d'autres protocoles est le facteur principal. Chaque nouveau partenariat ou intégration augmente la demande réelle de ${symbol}. Les revenus du réseau (fees payées par les utilisateurs) sont un indicateur de santé.`,
    exchange: `Le volume de trading sur la plateforme associée influence directement la valeur du ${symbol}. L'environnement réglementaire est crucial — une action des régulateurs peut faire chuter le prix du jour au lendemain. Les burns trimestriels créent une pression déflationniste.`,
    stablecoin: `Le prix est censé rester stable. Les variations viennent de situations extrêmes : perte de confiance dans les réserves, dé-peg temporaire, ou crise de liquidité sur les marchés.`,
    gaming: `L'adoption des jeux (nombre de joueurs actifs, volume de transactions in-game) est le facteur principal. Les sorties de nouveaux jeux ou mises à jour majeures génèrent de l'intérêt et de la demande pour le ${symbol}.`,
    ai: `Le narratif IA est un moteur puissant : chaque avancée majeure en intelligence artificielle (nouveau modèle, adoption par des entreprises) profite aux cryptos du secteur. L'utilisation réelle du réseau (GPU loués, requêtes traitées) valide ou non la thèse d'investissement.`,
    storage: `La demande de stockage décentralisé et les partenariats avec des entreprises ou des protocoles Web3 font évoluer le prix. La compétition avec les solutions centralisées (AWS, Google Cloud) reste un défi majeur.`,
    privacy: `La réglementation est le facteur dominant. Les interdictions ou restrictions sur les cryptos de confidentialité font chuter les prix. À l'inverse, les scandales de surveillance ou de fuites de données renforcent la demande.`,
    payment: `L'adoption par les institutions financières, les partenariats commerciaux et la clarté réglementaire sont les moteurs principaux. Le volume réel de transactions (pas le trading spéculatif) est un bon indicateur de la santé du projet.`,
    other: `Le prix du ${symbol} dépend de l'offre et la demande sur les plateformes d'échange, du sentiment général du marché crypto, et des développements spécifiques au projet (mises à jour, partenariats, adoption).`,
  };

  return `${common}\n\n${specific[cat]}`;
}

function generateStrengthsRisks(coin: CoinMarketData, cat: Category): string {
  const { name, symbol } = coin;

  const content: Record<Category, string> = {
    layer1: `Points forts : ${name} dispose de sa propre infrastructure, ce qui lui donne une autonomie complète. L'écosystème de développeurs et d'applications construit autour du ${symbol} crée un effet de réseau difficile à répliquer.\n\nRisques : la concurrence entre blockchains Layer 1 est féroce. ${name} doit constamment innover pour ne pas se faire dépasser. Les problèmes techniques (pannes, congestion) peuvent éroder la confiance des utilisateurs.`,
    layer2: `Points forts : ${name} réduit drastiquement les coûts et les délais de transaction tout en héritant de la sécurité de la couche 1. C'est un secteur en forte croissance.\n\nRisques : la dépendance à la blockchain sous-jacente est un facteur de risque. Si la L1 évolue et intègre nativement les fonctionnalités de ${name}, le projet pourrait perdre sa raison d'être.`,
    defi: `Points forts : ${name} offre des services financiers accessibles à tous, sans intermédiaire. Les revenus du protocole sont vérifiables on-chain — pas de boîte noire.\n\nRisques : les smart contracts peuvent contenir des vulnérabilités. Un hack peut anéantir la valeur du protocole en quelques minutes. La régulation DeFi est encore floue, ce qui crée de l'incertitude.`,
    meme: `Points forts : la communauté du ${symbol} est massive et engagée. La viralité peut générer des rendements spectaculaires en peu de temps.\n\nRisques : sans fondamentaux techniques solides, le ${symbol} est extrêmement vulnérable aux retournements de sentiment. Les pertes de 80-90% depuis les sommets sont courantes sur les meme coins. Ne misez jamais plus que ce que vous pouvez perdre.`,
    infrastructure: `Points forts : ${name} répond à un besoin réel de l'écosystème. Plus la blockchain se développe, plus les services d'infrastructure deviennent indispensables.\n\nRisques : la concurrence est intense et les projets d'infrastructure sont souvent invisibles pour le grand public, ce qui limite le battage médiatique et peut freiner la hausse du prix.`,
    exchange: `Points forts : le ${symbol} profite directement du succès de sa plateforme. Les burns réguliers créent une pression déflationniste sur l'offre.\n\nRisques : le token est très lié à une entreprise centralisée. Les problèmes réglementaires, les scandales ou la perte de parts de marché de la plateforme impactent directement le ${symbol}.`,
    stablecoin: `Points forts : stabilité et liquidité. Utile comme valeur refuge et monnaie d'échange dans l'écosystème crypto.\n\nRisques : risque de dé-peg si les réserves sont insuffisantes ou mal gérées. Les régulateurs surveillent de plus en plus les stablecoins.`,
    gaming: `Points forts : le gaming blockchain combine divertissement et gains financiers. Le marché du jeu vidéo pèse des centaines de milliards — le potentiel de croissance est énorme.\n\nRisques : la plupart des jeux blockchain n'ont pas encore atteint la qualité des jeux traditionnels. Si les joueurs partent, l'économie in-game s'effondre.`,
    ai: `Points forts : le narratif IA est le plus puissant du moment. ${name} se positionne sur un marché en explosion. La demande de calcul décentralisé pourrait devenir massive.\n\nRisques : la plupart des projets crypto-IA n'ont pas encore prouvé leur supériorité face aux solutions centralisées. Le risque de surévaluation liée au hype IA est réel.`,
    storage: `Points forts : le stockage décentralisé offre une résistance à la censure et une permanence que les clouds centralisés ne peuvent pas garantir.\n\nRisques : le coût et la performance restent inférieurs aux solutions centralisées pour l'instant. L'adoption par le grand public est encore très faible.`,
    privacy: `Points forts : la confidentialité financière est un droit fondamental. ${name} répond à un besoin réel pour les utilisateurs soucieux de leur vie privée.\n\nRisques : la pression réglementaire est forte. Plusieurs exchanges ont délisté des cryptos de confidentialité. Le risque juridique est non négligeable.`,
    payment: `Points forts : ${name} traite les paiements plus vite et moins cher que les réseaux traditionnels. Les partenariats institutionnels valident la technologie.\n\nRisques : la concurrence des stablecoins et des CBDC (monnaies numériques de banques centrales) pourrait réduire l'intérêt pour les cryptos de paiement alternatives.`,
    other: `Points forts : ${name} fait partie de l'écosystème crypto en pleine expansion. Son positionnement unique peut lui donner un avantage si le secteur continue de grandir.\n\nRisques : la concurrence est intense et le marché crypto reste très volatil. Les investisseurs doivent faire leurs propres recherches avant d'investir.`,
  };

  return content[cat];
}

function generateFaq(coin: CoinMarketData, cat: Category): Array<{ q: string; a: string }> {
  const { name, symbol } = coin;
  const catName = categoryNames[cat];

  return [
    {
      q: `C'est quoi ${name} (${symbol}) ?`,
      a: `${name} est un(e) ${catName}. Le ${symbol} est son token natif, classé #${coin.market_cap_rank} par capitalisation de marché. Il s'échange sur les principales plateformes crypto comme Binance, Coinbase ou Kraken.`,
    },
    {
      q: `Comment acheter du ${name} en France ?`,
      a: `Vous pouvez acheter du ${symbol} sur des plateformes régulées accessibles en France : Binance, Coinbase, Kraken, ou Bitpanda. Créez un compte, vérifiez votre identité, déposez des euros par virement ou carte bancaire, puis passez un ordre d'achat sur la paire ${symbol}/EUR.`,
    },
    {
      q: `Le ${symbol} est-il un bon investissement ?`,
      a: `Le ${symbol} est classé #${coin.market_cap_rank} et fait partie des ${cat === 'meme' ? 'meme coins — des actifs très spéculatifs' : 'projets crypto établis'}. Comme toute crypto, il reste volatil. Faites vos propres recherches, n'investissez que ce que vous pouvez perdre, et considérez une stratégie DCA pour lisser le risque.`,
    },
    {
      q: `Où suivre le cours du ${name} en temps réel ?`,
      a: `Notre page affiche le prix du ${symbol} en euros en direct, actualisé chaque minute via CoinGecko. Vous avez aussi accès au graphique interactif (7j, 30j, 1an, max), à la capitalisation, au volume et à l'ATH.`,
    },
  ];
}

function generateMilestones(coin: CoinMarketData, cat: Category): string {
  const { name } = coin;
  const athDate = new Date(coin.ath_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  // Generic milestones based on category + ATH
  const milestones = [
    `<li><strong>${athDate}</strong> — ${name} atteint son record historique (ATH) à ${coin.ath.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} €.</li>`,
  ];

  if (cat === 'layer1' || cat === 'layer2' || cat === 'infrastructure') {
    milestones.push(`<li><strong>Lancement</strong> — Le réseau ${name} est déployé et commence à traiter ses premières transactions.</li>`);
    milestones.push(`<li><strong>Écosystème</strong> — Les premières applications et protocoles sont construits sur ${name}, attirant développeurs et utilisateurs.</li>`);
  } else if (cat === 'defi') {
    milestones.push(`<li><strong>Lancement du protocole</strong> — ${name} ouvre ses smart contracts aux utilisateurs et commence à accumuler de la TVL.</li>`);
    milestones.push(`<li><strong>Croissance DeFi</strong> — Le protocole s'impose comme un acteur clé de la finance décentralisée.</li>`);
  } else if (cat === 'meme') {
    milestones.push(`<li><strong>Viralité</strong> — ${name} explose sur les réseaux sociaux et attire des millions de nouveaux acheteurs.</li>`);
    milestones.push(`<li><strong>Listings</strong> — Les grandes plateformes (Binance, Coinbase) ajoutent le ${coin.symbol} à leur catalogue, ouvrant l'accès au grand public.</li>`);
  }

  milestones.push(`<li><strong>Aujourd'hui</strong> — ${name} est classé #${coin.market_cap_rank} avec une capitalisation de ${(coin.market_cap / 1e9).toFixed(1)} milliard€.</li>`);

  return `<ul>${milestones.join('\n')}</ul>`;
}

// ── Fonction principale ──────────────────────────────────

export interface GeneratedCryptoPage {
  name: string;
  symbol: string;
  coingeckoId: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  whatIsIt: string;
  howItWorks: string;
  priceFactors: string;
  strengthsRisks: string;
  keyMilestones: string;
  faq: Array<{ q: string; a: string }>;
  category: Category;
  marketCapRank: number;
}

export function generateCryptoPage(coin: CoinMarketData): GeneratedCryptoPage {
  const cat = getCategory(coin.id);

  return {
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    coingeckoId: coin.id,
    slug: coin.id,
    metaTitle: `Prix ${coin.name} (${coin.symbol.toUpperCase()}) en direct — Cours et analyse | CryptoSous`,
    metaDescription: `Cours ${coin.name} (${coin.symbol.toUpperCase()}) en euros en temps réel. Graphique, capitalisation, volume et analyse détaillée du ${coin.symbol.toUpperCase()}.`,
    whatIsIt: generateWhatIsIt(coin, cat),
    howItWorks: generateHowItWorks(coin, cat),
    priceFactors: generatePriceFactors(coin, cat),
    strengthsRisks: generateStrengthsRisks(coin, cat),
    keyMilestones: generateMilestones(coin, cat),
    faq: generateFaq(coin, cat),
    category: cat,
    marketCapRank: coin.market_cap_rank,
  };
}

// Coins à exclure (stablecoins, wrapped tokens)
export const EXCLUDED_COINS = new Set([
  'tether', 'usd-coin', 'dai', 'first-digital-usd', 'true-usd', 'paxos-standard',
  'wrapped-bitcoin', 'wrapped-ether', 'staked-ether', 'wrapped-steth',
  'binance-usd', 'frax', 'usdd', 'gemini-dollar', 'paypal-usd',
  'ethena-usde', 'usds',
]);
