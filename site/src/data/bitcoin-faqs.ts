export interface FAQItem {
  question: string;
  answer: string;
}

export const BITCOIN_FAQS: Record<string, FAQItem[]> = {
  // ── Root hub (/bitcoin) ──────────────────────────────────────────
  index: [
    {
      question: "Qu'est-ce que le Bitcoin ?",
      answer:
        "Bitcoin est une monnaie numerique decentralisee creee en 2009 par Satoshi Nakamoto. Elle permet d'envoyer de l'argent de pair a pair, sans banque ni intermediaire, grace a la technologie blockchain. Son offre est limitee a 21 millions d'unites.",
    },
    {
      question: "Comment acheter du Bitcoin en France ?",
      answer:
        "En France, vous pouvez acheter du Bitcoin sur des plateformes regulees comme Binance, Coinbase ou Kraken. Il suffit de creer un compte, verifier votre identite (KYC), deposer des euros par virement SEPA ou carte bancaire, puis passer un ordre d'achat. Vous pouvez acheter a partir de quelques euros.",
    },
    {
      question: "Le Bitcoin est-il legal en France ?",
      answer:
        "Oui, le Bitcoin est legal en France. Sa detention et son echange sont encadres par la reglementation europeenne MiCA. Les plus-values sont imposees au prelevement forfaitaire unique (PFU) de 30 %, et les comptes sur des plateformes etrangeres doivent etre declares aux impots.",
    },
    {
      question: "Combien faut-il investir dans le Bitcoin ?",
      answer:
        "Il n'y a pas de montant minimum obligatoire. Un bitcoin se divise en 100 millions de satoshis, ce qui permet d'en acheter pour quelques euros. La plupart des plateformes acceptent des ordres a partir de 1 a 10 euros. La strategie DCA (investissement regulier) est recommandee pour lisser la volatilite.",
    },
    {
      question: "Comment securiser ses bitcoins ?",
      answer:
        "Pour securiser vos bitcoins, utilisez un portefeuille personnel (wallet) plutot que de les laisser sur une plateforme d'echange. Les hardware wallets (Ledger, Trezor) offrent le meilleur niveau de securite. Protegez votre seed phrase (phrase de recuperation) et activez l'authentification a deux facteurs (2FA) sur tous vos comptes.",
    },
    {
      question:
        "Quelle est la difference entre Bitcoin et les autres cryptomonnaies ?",
      answer:
        "Bitcoin est la premiere et la plus grande cryptomonnaie par capitalisation. Contrairement a la plupart des altcoins, Bitcoin a une offre strictement limitee (21 millions), un reseau tres decentralise et le plus long historique de securite. Les autres cryptos (Ethereum, Solana...) offrent des fonctionnalites differentes comme les smart contracts.",
    },
  ],

  // ── Bitcoin debutant ─────────────────────────────────────────────
  'bitcoin-debutant': [
    {
      question: "Faut-il acheter un bitcoin entier pour commencer ?",
      answer:
        "Non. Un bitcoin se divise en 100 millions de satoshis. Vous pouvez acheter pour 10 ou 50 euros de BTC sur n'importe quelle plateforme. La plupart des debutants commencent avec de petites sommes pour se familiariser.",
    },
    {
      question: "Bitcoin est-il une arnaque ou un schema de Ponzi ?",
      answer:
        "Non. Bitcoin fonctionne sur un reseau decentralise et open source, verifiable par tous. Il n'y a pas d'entite centrale qui collecte l'argent des nouveaux arrivants pour payer les anciens. Sa valeur vient de sa rarete programmee et de l'adoption croissante par des particuliers, entreprises et institutions.",
    },
    {
      question: "Quelle est la difference entre Bitcoin et bitcoin ?",
      answer:
        "Bitcoin avec un B majuscule designe le reseau et le protocole. Le bitcoin avec un b minuscule designe l'unite monetaire (le jeton que vous achetez et detenez). On ecrit aussi BTC en abrege.",
    },
    {
      question: "Peut-on perdre ses bitcoins ?",
      answer:
        "Oui, si vous perdez l'acces a votre portefeuille et a votre phrase de recuperation (seed phrase), vos bitcoins deviennent inaccessibles. On estime que 3 a 4 millions de BTC sont perdus a jamais. C'est pourquoi la sauvegarde de votre seed phrase est la priorite numero un.",
    },
    {
      question: "Combien de temps faut-il pour comprendre Bitcoin ?",
      answer:
        "Les bases (acheter, stocker, envoyer) s'apprennent en quelques heures. Comprendre le fonctionnement technique (blockchain, minage, halving) prend quelques semaines de lecture. La plupart des utilisateurs approfondissent au fil du temps, sans avoir besoin de tout maitriser pour commencer.",
    },
  ],

  // ── Acheter bitcoin ──────────────────────────────────────────────
  'acheter-bitcoin': [
    {
      question: "Quelle est la meilleure plateforme pour acheter du Bitcoin ?",
      answer:
        "Il n'y a pas de reponse unique. Coinbase est recommandee pour les debutants grace a son interface simple. Binance offre les frais les plus bas. Kraken est repute pour sa securite. Le choix depend de vos priorites : simplicite, frais, ou volume de trading.",
    },
    {
      question: "Peut-on acheter du Bitcoin avec une carte bancaire ?",
      answer:
        "Oui, la plupart des plateformes acceptent la carte bancaire (Visa, Mastercard). Les frais sont plus eleves qu'un virement SEPA (souvent 1,5 % a 3,5 % contre 0 a 0,5 % pour un virement). Le virement SEPA est donc preferable pour les montants importants.",
    },
    {
      question: "Quel est le montant minimum pour acheter du Bitcoin ?",
      answer:
        "Sur la plupart des plateformes, le minimum est de 1 a 10 euros. Vous n'avez pas besoin d'acheter un bitcoin entier : vous pouvez acquerir des fractions (satoshis). Avec 50 euros, vous recevez la quantite de BTC equivalente au cours du moment.",
    },
    {
      question:
        "Est-ce que je dois verifier mon identite pour acheter du Bitcoin ?",
      answer:
        "Oui. Toutes les plateformes regulees en France et en Europe appliquent le KYC (Know Your Customer). Vous devez fournir une piece d'identite et parfois un justificatif de domicile. Cette verification prend generalement entre quelques minutes et 24 heures.",
    },
    {
      question: "Quand est le meilleur moment pour acheter du Bitcoin ?",
      answer:
        "Personne ne peut predire le cours a court terme. La strategie DCA (Dollar Cost Averaging) consiste a acheter un montant fixe a intervalles reguliers (chaque semaine ou chaque mois), ce qui lisse le prix d'entree et reduit l'impact de la volatilite.",
    },
  ],

  // ── Comment fonctionne bitcoin ───────────────────────────────────
  'comment-fonctionne-bitcoin': [
    {
      question: "Qu'est-ce que la blockchain Bitcoin ?",
      answer:
        "La blockchain est un registre public et immutable qui enregistre toutes les transactions Bitcoin depuis 2009. Chaque bloc contient un ensemble de transactions et un lien cryptographique vers le bloc precedent, formant une chaine impossible a modifier sans controler plus de 50 % de la puissance de calcul du reseau.",
    },
    {
      question: "Comment une transaction Bitcoin est-elle validee ?",
      answer:
        "Quand vous envoyez du Bitcoin, la transaction est diffusee au reseau. Les mineurs la regroupent dans un bloc candidat et cherchent une solution cryptographique (proof of work). Le premier mineur qui trouve la solution propose le bloc au reseau, qui le verifie et l'ajoute a la blockchain. Ce processus prend environ 10 minutes.",
    },
    {
      question: "Qu'est-ce que le halving Bitcoin ?",
      answer:
        "Le halving est une reduction de moitie de la recompense des mineurs, programmee tous les 210 000 blocs (environ 4 ans). Le dernier halving a eu lieu en avril 2024, reduisant la recompense de 6,25 a 3,125 BTC par bloc. Ce mecanisme limite l'inflation et renforcera la rarete au fil du temps jusqu'au dernier bitcoin mine vers 2140.",
    },
    {
      question: "Pourquoi Bitcoin est-il limite a 21 millions d'unites ?",
      answer:
        "Cette limite est inscrite dans le code source de Bitcoin par Satoshi Nakamoto. Elle cree une rarete numerique similaire a l'or. Combinee au halving, elle garantit une emission decroissante et previsible. Aucune entite ne peut modifier cette regle sans le consensus de l'ensemble du reseau.",
    },
    {
      question: "Qu'est-ce qu'un noeud Bitcoin ?",
      answer:
        "Un noeud est un ordinateur qui fait tourner le logiciel Bitcoin et conserve une copie complete de la blockchain. Les noeuds verifient independamment chaque transaction et chaque bloc. Plus il y a de noeuds, plus le reseau est decentralise et resistant a la censure. N'importe qui peut en faire tourner un.",
    },
  ],

  // ── Investir bitcoin ─────────────────────────────────────────────
  'investir-bitcoin': [
    {
      question: "Bitcoin est-il un bon investissement ?",
      answer:
        "Bitcoin a ete l'actif le plus performant de la derniere decennie avec un rendement annuel moyen superieur a 100 %. Mais les performances passees ne garantissent pas les resultats futurs. Sa volatilite est elevee (baisses de 50 a 80 % lors des bear markets). Il est recommande de n'investir que ce qu'on peut se permettre de perdre.",
    },
    {
      question: "Qu'est-ce que la strategie DCA pour Bitcoin ?",
      answer:
        "Le DCA (Dollar Cost Averaging) consiste a investir un montant fixe a intervalles reguliers, par exemple 100 euros chaque mois. Cette approche lisse le prix d'achat moyen et evite de tout miser au mauvais moment. Historiquement, un DCA hebdomadaire sur Bitcoin a toujours ete rentable sur des periodes de 4 ans ou plus.",
    },
    {
      question:
        "Quelle part de mon portefeuille allouer au Bitcoin ?",
      answer:
        "La plupart des conseillers financiers suggerent entre 1 % et 10 % du portefeuille total pour les cryptomonnaies. Le pourcentage depend de votre tolerance au risque, de votre horizon d'investissement et de votre situation financiere. Les investisseurs prudents commencent a 1-3 %, les plus convaincus montent a 5-10 %.",
    },
    {
      question: "Faut-il investir dans Bitcoin ou dans les altcoins ?",
      answer:
        "Bitcoin represente environ 55 a 60 % de la capitalisation totale des cryptomonnaies. Il est considere comme le choix le moins risque dans cet univers grace a sa decentralisation, sa liquidite et son adoption institutionnelle (ETF spot). Les altcoins offrent un potentiel de hausse plus eleve mais un risque de perte aussi plus grand.",
    },
  ],

  // ── Vendre bitcoin ───────────────────────────────────────────────
  'vendre-bitcoin': [
    {
      question: "Comment convertir ses bitcoins en euros ?",
      answer:
        "Connectez-vous a votre plateforme d'echange, placez un ordre de vente BTC/EUR, puis effectuez un retrait vers votre compte bancaire par virement SEPA. Le virement arrive generalement en 1 a 3 jours ouvrables. Certaines plateformes proposent aussi des retraits instantanes moyennant des frais supplementaires.",
    },
    {
      question: "Faut-il payer des impots quand on vend du Bitcoin ?",
      answer:
        "Oui. En France, les plus-values sur les cryptomonnaies sont imposees au PFU (prelevement forfaitaire unique) de 30 %. La plus-value se calcule sur la difference entre le prix de vente et le prix moyen d'acquisition pondere. Les cessions inferieures a 305 euros par an sont exonerees.",
    },
    {
      question: "Peut-on payer directement en Bitcoin ?",
      answer:
        "Oui, de plus en plus de commercants acceptent Bitcoin, surtout via le Lightning Network pour les paiements instantanes. Des cartes crypto (Binance Card, Crypto.com) permettent aussi de depenser ses BTC chez n'importe quel commercant. Chaque paiement en BTC est un evenement fiscal en France.",
    },
    {
      question: "Quel est le meilleur moment pour vendre du Bitcoin ?",
      answer:
        "Il n'existe pas de reponse universelle. Certains investisseurs vendent par paliers quand le cours atteint des objectifs de gain predetermines. D'autres appliquent la strategie inverse du DCA en vendant un montant fixe a intervalles reguliers. L'important est d'avoir un plan defini avant de devoir prendre la decision sous l'emotion.",
    },
  ],

  // ── Lightning Network ────────────────────────────────────────────
  'lightning-network-bitcoin': [
    {
      question: "Qu'est-ce que le Lightning Network ?",
      answer:
        "Le Lightning Network est une couche de paiement construite au-dessus de Bitcoin (layer 2). Il permet des transactions quasi instantanees et pour des frais inferieurs a un centime. Les paiements passent par des canaux entre participants, sans encombrer la blockchain principale.",
    },
    {
      question: "Le Lightning Network est-il securise ?",
      answer:
        "Oui, le Lightning Network herite de la securite de Bitcoin. Les fonds restent proteges par la blockchain sous-jacente : si un participant tente de tricher, l'autre partie peut publier une preuve sur la chaine et recuperer ses fonds. Le risque principal est lie a la disponibilite en ligne du noeud.",
    },
    {
      question:
        "Quels portefeuilles supportent le Lightning Network ?",
      answer:
        "Parmi les plus populaires : Phoenix Wallet (Android/iOS), Breez, Muun et Wallet of Satoshi pour les mobiles. Blue Wallet offre une interface simple. Pour les utilisateurs avances, Core Lightning et LND permettent de gerer son propre noeud Lightning.",
    },
    {
      question: "Peut-on recevoir un salaire en Bitcoin via Lightning ?",
      answer:
        "Techniquement oui. Des services comme Strike et Bitwage permettent de recevoir tout ou partie de son salaire en BTC via Lightning. Le paiement arrive en quelques secondes. En France, l'employeur doit verser le salaire en euros, mais vous pouvez convertir automatiquement via ces services.",
    },
  ],

  // ── Meilleurs portefeuilles ──────────────────────────────────────
  'meilleurs-portefeuilles-bitcoin': [
    {
      question:
        "Quelle est la difference entre un hot wallet et un cold wallet ?",
      answer:
        "Un hot wallet est un portefeuille connecte a internet (application mobile ou de bureau), pratique pour les transactions frequentes. Un cold wallet (hardware wallet ou papier) stocke vos cles hors ligne, offrant une securite maximale contre le piratage. Pour des montants importants, le cold wallet est recommande.",
    },
    {
      question: "Ledger ou Trezor : lequel choisir ?",
      answer:
        "Ledger utilise une puce securisee (secure element) et supporte un grand nombre de cryptomonnaies. Trezor mise sur le code open source et une interface web intuitive. Les deux sont fiables. Le Ledger Nano S Plus (60-80 euros) et le Trezor Safe 3 (70 euros) sont d'excellents choix pour debuter.",
    },
    {
      question: "Que se passe-t-il si je perds mon hardware wallet ?",
      answer:
        "Vos bitcoins ne sont pas dans l'appareil mais sur la blockchain. Tant que vous avez votre seed phrase (les 12 ou 24 mots notes lors de la configuration), vous pouvez restaurer vos fonds sur un nouvel appareil. Sans cette phrase, les fonds sont perdus a jamais.",
    },
    {
      question:
        "Peut-on laisser ses bitcoins sur une plateforme d'echange ?",
      answer:
        "C'est possible mais deconseille pour des montants importants. Les plateformes peuvent etre piratees, faire faillite (comme FTX en 2022) ou bloquer les retraits. La regle en crypto : 'not your keys, not your coins'. Transferez vos BTC sur un portefeuille personnel des que possible.",
    },
    {
      question: "Qu'est-ce qu'une seed phrase et comment la proteger ?",
      answer:
        "La seed phrase (ou phrase de recuperation) est une suite de 12 ou 24 mots generes a la creation de votre portefeuille. Elle permet de restaurer l'acces a vos fonds depuis n'importe quel appareil compatible. Ne la stockez jamais numeriquement. Notez-la sur papier ou gravez-la sur metal, et conservez-la dans un endroit sur.",
    },
  ],

  // ── Miner bitcoin ────────────────────────────────────────────────
  'miner-bitcoin': [
    {
      question: "Est-il encore rentable de miner du Bitcoin en 2025 ?",
      answer:
        "La rentabilite depend du cout de l'electricite, du materiel et du cours du BTC. Apres le halving 2024, la recompense est de 3,125 BTC par bloc. En France, avec un tarif electrique autour de 0,25 euro/kWh, le minage solo n'est generalement pas rentable. Les grandes fermes avec electricite bon marche (< 0,05 euro/kWh) restent profitables.",
    },
    {
      question: "Quel materiel faut-il pour miner du Bitcoin ?",
      answer:
        "Le minage de Bitcoin necessite des ASICs (circuits integres specialises). Les modeles actuels comme le Bitmain Antminer S21 ou le MicroBT WhatsMiner M60 offrent les meilleurs ratios hashrate/consommation. Un GPU classique n'est plus competitif pour Bitcoin depuis 2014.",
    },
    {
      question: "Le minage de Bitcoin est-il mauvais pour l'environnement ?",
      answer:
        "Le minage consomme environ 150 TWh par an, comparable a un petit pays. Mais plus de 50 % de cette energie provient de sources renouvelables (hydroelectrique, eolien, solaire) selon le Bitcoin Mining Council. Le minage peut aussi valoriser de l'energie autrement perdue (torchage de gaz, surplus hydroelectriques).",
    },
    {
      question: "Qu'est-ce qu'un pool de minage ?",
      answer:
        "Un pool de minage regroupe la puissance de calcul de plusieurs mineurs pour trouver des blocs plus regulierement. Les recompenses sont reparties au prorata de la puissance fournie par chaque participant. Les plus grands pools sont Foundry USA, AntPool et F2Pool. Rejoindre un pool est quasi obligatoire pour les mineurs individuels.",
    },
  ],

  // ── Securite bitcoin ─────────────────────────────────────────────
  'securite-bitcoin': [
    {
      question: "Quelles sont les arnaques Bitcoin les plus courantes ?",
      answer:
        "Les arnaques les plus frequentes sont le phishing (faux sites de plateformes), les faux investissements a rendements garantis, les arnaques sentimentales (romance scam), et les faux giveaways sur les reseaux sociaux. Regle d'or : personne ne doublera jamais votre Bitcoin, et aucun investissement serieux ne garantit de rendement.",
    },
    {
      question: "Bitcoin peut-il etre pirate ?",
      answer:
        "Le reseau Bitcoin lui-meme n'a jamais ete pirate depuis sa creation en 2009. Une attaque 51 % couterait des milliards de dollars en materiel et electricite. En revanche, les plateformes d'echange, les portefeuilles mal securises et les utilisateurs eux-memes sont des cibles. La securite depend surtout de vos pratiques personnelles.",
    },
    {
      question: "Comment proteger sa seed phrase ?",
      answer:
        "Ne prenez jamais de photo de votre seed phrase et ne la stockez pas sur un ordinateur ou dans le cloud. Ecrivez-la sur papier ou gravez-la sur une plaque metallique resistante au feu et a l'eau. Conservez-la dans un endroit sur (coffre-fort). Certains utilisateurs repartissent les mots sur plusieurs lieux (schema de Shamir).",
    },
    {
      question: "Faut-il activer le 2FA sur ses comptes crypto ?",
      answer:
        "Oui, c'est la protection minimale. Privilegiez une application d'authentification (Google Authenticator, Authy) plutot que le SMS, qui est vulnerable au SIM swapping. Pour les comptes critiques, une cle physique (YubiKey) offre la meilleure protection contre le phishing.",
    },
    {
      question: "Comment transmettre ses bitcoins en cas de deces ?",
      answer:
        "Prevoyez un plan de succession crypto. Les options incluent : un testament mentionnant la localisation de la seed phrase, un coffre partage avec une personne de confiance, ou des solutions techniques comme le multisig (plusieurs cles necessaires). Sans planification, vos bitcoins peuvent etre perdus definitivement.",
    },
  ],

  // ── Reglementation bitcoin ───────────────────────────────────────
  'reglementation-bitcoin': [
    {
      question:
        "Comment declarer ses cryptomonnaies aux impots en France ?",
      answer:
        "Vous devez declarer les plus-values lors de la conversion en euros ou en achat de biens/services (formulaire 2086). Les comptes ouverts sur des plateformes etrangeres doivent etre declares chaque annee (formulaire 3916-bis). Detenir ou acheter des cryptos sans les vendre ne declenche pas d'imposition.",
    },
    {
      question: "Quel est le taux d'imposition des plus-values Bitcoin en France ?",
      answer:
        "Le taux est de 30 % (flat tax ou PFU) : 12,8 % d'impot sur le revenu + 17,2 % de prelevements sociaux. Depuis 2023, vous pouvez opter pour le bareme progressif si c'est plus avantageux. Les cessions annuelles inferieures a 305 euros sont exonerees.",
    },
    {
      question: "Qu'est-ce que le reglement MiCA ?",
      answer:
        "MiCA (Markets in Crypto-Assets) est le cadre reglementaire europeen entre en vigueur progressivement depuis 2024. Il impose aux plateformes d'obtenir un agrement, de respecter des regles de transparence et de proteger les fonds des clients. Il harmonise les regles entre les 27 pays de l'UE.",
    },
    {
      question: "Les plateformes crypto sont-elles regulees en France ?",
      answer:
        "Oui. En France, les plateformes doivent etre enregistrees comme PSAN (Prestataire de Services sur Actifs Numeriques) aupres de l'AMF. Depuis MiCA, un agrement europeen (CASP) est aussi necessaire. Binance, Coinbase et Kraken disposent de cet enregistrement pour operer en France.",
    },
  ],

  // ── Histoire bitcoin ─────────────────────────────────────────────
  'histoire-bitcoin': [
    {
      question: "Qui est Satoshi Nakamoto ?",
      answer:
        "Satoshi Nakamoto est le pseudonyme du createur de Bitcoin, qui a publie le livre blanc en octobre 2008 et lance le reseau en janvier 2009. Son identite reelle reste inconnue. Il a cesse toute communication publique fin 2010. Son portefeuille contiendrait environ 1 million de BTC, jamais deplaces.",
    },
    {
      question: "Quel est le premier achat reel effectue en Bitcoin ?",
      answer:
        "Le 22 mai 2010, Laszlo Hanyecz a achete deux pizzas pour 10 000 BTC. Cette date est celebree chaque annee comme le 'Bitcoin Pizza Day'. Au cours actuel, ces 10 000 BTC valent plusieurs centaines de millions d'euros. C'est la premiere transaction commerciale documentee en Bitcoin.",
    },
    {
      question: "Qu'est-ce qui s'est passe avec Mt. Gox ?",
      answer:
        "Mt. Gox etait la plus grande plateforme d'echange de Bitcoin, basee au Japon. En 2014, elle a fait faillite apres la perte de 850 000 BTC (environ 450 millions de dollars a l'epoque) suite a un piratage prolonge. Cet evenement a provoque un bear market et conduit a l'amelioration des pratiques de securite dans l'industrie.",
    },
    {
      question: "Quand le dernier bitcoin sera-t-il mine ?",
      answer:
        "Le dernier bitcoin sera mine aux alentours de 2140. A cette date, la recompense de minage atteindra zero apres de multiples halvings. Les mineurs seront alors uniquement remuneres par les frais de transaction. Plus de 93 % des 21 millions de BTC sont deja en circulation.",
    },
    {
      question:
        "Pourquoi le cours du Bitcoin a-t-il autant fluctue dans son histoire ?",
      answer:
        "La volatilite de Bitcoin s'explique par sa jeunesse, sa capitalisation encore modeste par rapport aux marches traditionnels, et la forte influence du sentiment de marche. Les cycles haussiers et baissiers sont souvent correles au halving (tous les 4 ans). La volatilite tend a diminuer a mesure que l'adoption et la liquidite augmentent.",
    },
  ],
};

export function getFaqForSlug(slug: string): FAQItem[] {
  return BITCOIN_FAQS[slug] ?? [];
}
