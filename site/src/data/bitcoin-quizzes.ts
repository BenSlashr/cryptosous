export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export const BITCOIN_QUIZZES: Record<string, QuizData> = {
  // ── Root hub (/bitcoin) ──────────────────────────────────────────
  index: {
    title: 'Quiz : Bitcoin',
    questions: [
      {
        question: "Combien de bitcoins existeront au maximum ?",
        options: ['100 millions', '21 millions', '1 milliard', 'Illimite'],
        correctIndex: 1,
        explanation:
          "L'offre de Bitcoin est plafonnee a 21 millions d'unites, une limite inscrite dans le code source par Satoshi Nakamoto.",
      },
      {
        question: "Qui a cree Bitcoin ?",
        options: [
          'Elon Musk',
          'Vitalik Buterin',
          'Satoshi Nakamoto',
          'La NSA',
        ],
        correctIndex: 2,
        explanation:
          "Bitcoin a ete cree par un individu ou groupe utilisant le pseudonyme Satoshi Nakamoto, qui a publie le livre blanc en 2008.",
      },
      {
        question:
          "Quel est le nom de la plus petite unite de Bitcoin ?",
        options: ['Wei', 'Satoshi', 'Gwei', 'Bit'],
        correctIndex: 1,
        explanation:
          "Un satoshi vaut 0,00000001 BTC (un cent-millionieme de bitcoin). Il porte le nom du createur de Bitcoin.",
      },
    ],
  },

  // ── Bitcoin debutant ─────────────────────────────────────────────
  'bitcoin-debutant': {
    title: 'Quiz : Bitcoin pour debutants',
    questions: [
      {
        question: "Faut-il acheter un bitcoin entier pour investir ?",
        options: [
          "Oui, c'est le minimum",
          'Non, on peut acheter des fractions',
          'Il faut au moins 0,1 BTC',
          'Cela depend de la plateforme',
        ],
        correctIndex: 1,
        explanation:
          "Un bitcoin se divise en 100 millions de satoshis. Vous pouvez acheter pour quelques euros de BTC sur n'importe quelle plateforme.",
      },
      {
        question: "Qui controle le reseau Bitcoin ?",
        options: [
          'Une entreprise privee',
          'Les gouvernements',
          'Personne en particulier, le reseau est decentralise',
          'Les banques centrales',
        ],
        correctIndex: 2,
        explanation:
          "Bitcoin est decentralise : des milliers de noeuds repartis dans le monde verifient les transactions et appliquent les regles du protocole, sans autorite centrale.",
      },
      {
        question: "En quelle annee Bitcoin a-t-il ete lance ?",
        options: ['2005', '2009', '2013', '2015'],
        correctIndex: 1,
        explanation:
          "Le premier bloc de Bitcoin (bloc genesis) a ete mine le 3 janvier 2009 par Satoshi Nakamoto.",
      },
    ],
  },

  // ── Acheter bitcoin ──────────────────────────────────────────────
  'acheter-bitcoin': {
    title: 'Quiz : Acheter du Bitcoin',
    questions: [
      {
        question:
          "Quel moyen de paiement offre generalement les frais les plus bas pour acheter du BTC ?",
        options: [
          'Carte bancaire',
          'Virement SEPA',
          'PayPal',
          'Apple Pay',
        ],
        correctIndex: 1,
        explanation:
          "Le virement SEPA est le moins cher (0 a 0,5 % de frais) contre 1,5 a 3,5 % pour la carte bancaire sur la plupart des plateformes.",
      },
      {
        question: "Que signifie KYC dans le contexte des plateformes crypto ?",
        options: [
          'Keep Your Crypto',
          'Know Your Customer',
          'Key Yield Certificate',
          'Korean Yuan Conversion',
        ],
        correctIndex: 1,
        explanation:
          "KYC (Know Your Customer) est la procedure de verification d'identite imposee par la reglementation. Elle est obligatoire sur toutes les plateformes regulees en Europe.",
      },
      {
        question:
          "Quelle strategie consiste a acheter un montant fixe a intervalles reguliers ?",
        options: [
          'Le trading a effet de levier',
          'Le DCA (Dollar Cost Averaging)',
          'Le staking',
          'Le yield farming',
        ],
        correctIndex: 1,
        explanation:
          "Le DCA lisse le prix d'achat moyen en investissant regulierement, peu importe le cours. C'est la strategie la plus recommandee pour les debutants.",
      },
    ],
  },

  // ── Comment fonctionne bitcoin ───────────────────────────────────
  'comment-fonctionne-bitcoin': {
    title: 'Quiz : Le fonctionnement de Bitcoin',
    questions: [
      {
        question: "Combien de temps faut-il en moyenne pour miner un bloc Bitcoin ?",
        options: ['1 minute', '10 minutes', '1 heure', '24 heures'],
        correctIndex: 1,
        explanation:
          "La difficulte de minage s'ajuste automatiquement tous les 2016 blocs pour maintenir un temps moyen de 10 minutes entre chaque bloc.",
      },
      {
        question: "Qu'est-ce que le halving ?",
        options: [
          'La division du prix par deux',
          "La reduction de moitie de la recompense des mineurs",
          'Le doublement du nombre de noeuds',
          'La suppression de la moitie des transactions',
        ],
        correctIndex: 1,
        explanation:
          "Le halving divise par deux la recompense attribuee aux mineurs. Il se produit tous les 210 000 blocs (environ 4 ans). Le dernier a eu lieu en avril 2024.",
      },
      {
        question: "Quel mecanisme de consensus utilise Bitcoin ?",
        options: [
          'Proof of Stake',
          'Proof of Work',
          'Delegated Proof of Stake',
          'Proof of Authority',
        ],
        correctIndex: 1,
        explanation:
          "Bitcoin utilise le Proof of Work (preuve de travail) : les mineurs depensent de l'energie pour resoudre des problemes cryptographiques et securiser le reseau.",
      },
    ],
  },

  // ── Investir bitcoin ─────────────────────────────────────────────
  'investir-bitcoin': {
    title: 'Quiz : Investir dans Bitcoin',
    questions: [
      {
        question:
          "Quel pourcentage de son portefeuille est generalement recommande pour Bitcoin ?",
        options: ['50 a 100 %', '20 a 50 %', '1 a 10 %', '0 %'],
        correctIndex: 2,
        explanation:
          "La plupart des conseillers financiers suggerent entre 1 % et 10 % du portefeuille total en cryptomonnaies, selon le profil de risque de l'investisseur.",
      },
      {
        question: "Qu'est-ce qu'un ETF Bitcoin spot ?",
        options: [
          "Un fonds qui detient directement du Bitcoin",
          'Un derivee synthetique du Bitcoin',
          'Un stablecoin adosse au Bitcoin',
          'Un exchange decentralise',
        ],
        correctIndex: 0,
        explanation:
          "Un ETF spot detient du Bitcoin reel en reserve. Les ETF spot americains ont ete approuves en janvier 2024 et ont attire des milliards de dollars d'investissement institutionnel.",
      },
      {
        question:
          "Tous les 4 ans environ, quel evenement historique precede souvent un cycle haussier ?",
        options: [
          'Un fork du reseau',
          'Le halving',
          'Un changement de PDG',
          'Une mise a jour du protocole',
        ],
        correctIndex: 1,
        explanation:
          "Le halving reduit l'offre nouvelle de BTC de moitie. Historiquement, les 12 a 18 mois suivant chaque halving ont ete marques par des hausses de prix significatives.",
      },
    ],
  },

  // ── Vendre bitcoin ───────────────────────────────────────────────
  'vendre-bitcoin': {
    title: 'Quiz : Vendre du Bitcoin',
    questions: [
      {
        question:
          "En France, quel est le taux de la flat tax sur les plus-values crypto ?",
        options: ['12,8 %', '19 %', '30 %', '45 %'],
        correctIndex: 2,
        explanation:
          "Le PFU (prelevement forfaitaire unique) est de 30 % : 12,8 % d'impot sur le revenu + 17,2 % de prelevements sociaux. L'option pour le bareme progressif est aussi possible.",
      },
      {
        question:
          "Quel seuil annuel de cession est exonere d'impot en France ?",
        options: ['150 euros', '305 euros', '1 000 euros', '5 000 euros'],
        correctIndex: 1,
        explanation:
          "Les cessions annuelles dont le total est inferieur a 305 euros sont exonerees d'impot sur les plus-values. Au-dela, l'ensemble des plus-values est imposable.",
      },
      {
        question:
          "Quel moyen de retrait est generalement le moins cher pour convertir BTC en euros ?",
        options: [
          'Retrait par carte',
          'Virement SEPA',
          'Cheque',
          'Retrait en especes',
        ],
        correctIndex: 1,
        explanation:
          "Le virement SEPA est le moyen le plus economique pour recuperer ses euros, avec des frais souvent inferieurs a 1 euro. Le delai est de 1 a 3 jours ouvrables.",
      },
    ],
  },

  // ── Lightning Network ────────────────────────────────────────────
  'lightning-network-bitcoin': {
    title: 'Quiz : Lightning Network',
    questions: [
      {
        question: "Le Lightning Network est une solution de quel type ?",
        options: [
          'Layer 1 (couche de base)',
          'Layer 2 (seconde couche)',
          'Sidechain',
          'Blockchain independante',
        ],
        correctIndex: 1,
        explanation:
          "Le Lightning Network est un protocole de layer 2 construit au-dessus de la blockchain Bitcoin. Il traite les transactions hors chaine pour plus de rapidite et des frais reduits.",
      },
      {
        question:
          "Quel est le temps typique d'une transaction Lightning ?",
        options: [
          'Environ 10 minutes',
          'Environ 1 heure',
          'Moins de 3 secondes',
          'Environ 30 secondes',
        ],
        correctIndex: 2,
        explanation:
          "Les paiements Lightning sont quasi instantanes (quelques millisecondes a quelques secondes), contre 10 minutes minimum pour une transaction on-chain.",
      },
      {
        question: "Combien coutent en moyenne les frais d'une transaction Lightning ?",
        options: [
          'Environ 5 euros',
          'Environ 1 euro',
          'Moins de 1 centime',
          '0,1 % du montant',
        ],
        correctIndex: 2,
        explanation:
          "Les frais Lightning sont typiquement de quelques satoshis (fractions de centime), ce qui rend le reseau adapte aux micro-paiements.",
      },
    ],
  },

  // ── Meilleurs portefeuilles ──────────────────────────────────────
  'meilleurs-portefeuilles-bitcoin': {
    title: 'Quiz : Les portefeuilles Bitcoin',
    questions: [
      {
        question: "Ou sont reellement stockes vos bitcoins ?",
        options: [
          "Dans votre hardware wallet",
          "Sur la blockchain, accessibles via vos cles privees",
          "Sur les serveurs de votre plateforme",
          "Dans le cloud",
        ],
        correctIndex: 1,
        explanation:
          "Vos bitcoins existent sur la blockchain. Votre portefeuille stocke uniquement les cles privees qui permettent d'y acceder et de les depenser.",
      },
      {
        question: "Que signifie 'Not your keys, not your coins' ?",
        options: [
          'Il faut changer ses mots de passe regulierement',
          "Sans controle de vos cles privees, vous ne possedez pas vraiment vos bitcoins",
          "Il faut avoir plusieurs portefeuilles",
          "Les cles USB sont obligatoires",
        ],
        correctIndex: 1,
        explanation:
          "Si vos bitcoins sont sur une plateforme, c'est elle qui detient les cles privees. En cas de faillite ou de piratage (comme FTX), vous pouvez tout perdre.",
      },
      {
        question: "Combien de mots contient une seed phrase standard ?",
        options: ['6 mots', '8 mots', '12 ou 24 mots', '32 mots'],
        correctIndex: 2,
        explanation:
          "La seed phrase (phrase de recuperation) contient 12 ou 24 mots generes aleatoirement. Ces mots permettent de restaurer l'acces a tous vos fonds.",
      },
    ],
  },

  // ── Miner bitcoin ────────────────────────────────────────────────
  'miner-bitcoin': {
    title: 'Quiz : Le minage de Bitcoin',
    questions: [
      {
        question: "Quel type de materiel est utilise pour miner du Bitcoin ?",
        options: [
          'Des cartes graphiques (GPU)',
          'Des processeurs (CPU)',
          'Des ASICs (circuits specialises)',
          'Des smartphones',
        ],
        correctIndex: 2,
        explanation:
          "Le minage de Bitcoin necessite des ASICs (Application-Specific Integrated Circuits), des puces concues specifiquement pour le calcul SHA-256. Les GPU et CPU ne sont plus competitifs depuis 2014.",
      },
      {
        question:
          "Apres le halving de 2024, quelle est la recompense par bloc ?",
        options: [
          '6,25 BTC',
          '3,125 BTC',
          '1,5625 BTC',
          '12,5 BTC',
        ],
        correctIndex: 1,
        explanation:
          "Le halving d'avril 2024 a reduit la recompense de 6,25 a 3,125 BTC par bloc. Le prochain halving (vers 2028) la reduira a 1,5625 BTC.",
      },
      {
        question:
          "Pourquoi les mineurs rejoignent-ils des pools de minage ?",
        options: [
          'Pour payer moins de frais',
          'Pour obtenir des recompenses plus regulieres',
          "Pour augmenter la difficulte",
          "C'est obligatoire par la loi",
        ],
        correctIndex: 1,
        explanation:
          "Un mineur solo a une probabilite tres faible de trouver un bloc. En pool, la puissance de calcul est mutualisee et les recompenses distribuees proportionnellement, assurant un revenu plus regulier.",
      },
    ],
  },

  // ── Securite bitcoin ─────────────────────────────────────────────
  'securite-bitcoin': {
    title: 'Quiz : La securite Bitcoin',
    questions: [
      {
        question:
          "Quel est le moyen le plus sur pour stocker sa seed phrase ?",
        options: [
          'Dans un fichier sur son ordinateur',
          'En photo dans le cloud',
          "Gravee sur une plaque metallique, dans un lieu sur",
          "Dans ses emails",
        ],
        correctIndex: 2,
        explanation:
          "Le support physique resistant (metal) protege contre les risques numeriques (piratage, panne) et physiques (incendie, inondation). Toute copie numerique est vulnerable.",
      },
      {
        question: "Qu'est-ce que le SIM swapping ?",
        options: [
          'Changer de carte SIM entre deux telephones',
          "Une attaque ou un pirate transfere votre numero de telephone sur sa carte SIM",
          "Une methode de double authentification",
          'Un type de portefeuille crypto',
        ],
        correctIndex: 1,
        explanation:
          "Le SIM swapping permet a un attaquant de recevoir vos SMS (dont les codes 2FA). C'est pourquoi il faut privilegier une application d'authentification ou une cle physique plutot que le SMS.",
      },
      {
        question:
          "Le reseau Bitcoin a-t-il deja ete pirate ?",
        options: [
          'Oui, plusieurs fois',
          "Non, jamais depuis sa creation en 2009",
          'Oui, une fois en 2014',
          'Oui, mais ca a ete repare',
        ],
        correctIndex: 1,
        explanation:
          "Le protocole Bitcoin n'a jamais ete compromis. Les piratages celebres (Mt. Gox, Bitfinex) concernent des plateformes centralisees, pas le reseau lui-meme.",
      },
    ],
  },

  // ── Reglementation bitcoin ───────────────────────────────────────
  'reglementation-bitcoin': {
    title: 'Quiz : La reglementation Bitcoin',
    questions: [
      {
        question:
          "Quel formulaire utiliser pour declarer ses plus-values crypto en France ?",
        options: [
          'Formulaire 2042',
          'Formulaire 2086',
          'Formulaire 3916',
          'Formulaire 2044',
        ],
        correctIndex: 1,
        explanation:
          "Le formulaire 2086 (annexe de la declaration de revenus) est dedie au calcul et a la declaration des plus-values sur actifs numeriques. Le 3916-bis sert a declarer les comptes detenus a l'etranger.",
      },
      {
        question: "Que signifie MiCA ?",
        options: [
          'Monnaie Internationale Crypto-Actifs',
          'Markets in Crypto-Assets',
          'Mining Certified Authority',
          'Multi-Investment Crypto Agreement',
        ],
        correctIndex: 1,
        explanation:
          "MiCA (Markets in Crypto-Assets) est le reglement europeen qui encadre les cryptomonnaies dans l'UE. Il impose des regles uniformes aux plateformes et aux emetteurs de tokens.",
      },
      {
        question:
          "Quel evenement declenche l'imposition des cryptos en France ?",
        options: [
          "L'achat de cryptomonnaies",
          'La conversion en euros ou un achat de bien/service',
          'Le simple fait de detenir des cryptos',
          "L'envoi de crypto a un autre portefeuille",
        ],
        correctIndex: 1,
        explanation:
          "Seule la conversion en monnaie fiat (euros) ou l'achat d'un bien/service constitue un fait generateur d'imposition. Les echanges crypto-crypto et les transferts entre portefeuilles ne sont pas imposables.",
      },
    ],
  },

  // ── Histoire bitcoin ─────────────────────────────────────────────
  'histoire-bitcoin': {
    title: "Quiz : L'histoire de Bitcoin",
    questions: [
      {
        question:
          "Combien de BTC ont ete depenses pour acheter deux pizzas en 2010 ?",
        options: ['100 BTC', '1 000 BTC', '10 000 BTC', '100 000 BTC'],
        correctIndex: 2,
        explanation:
          "Le 22 mai 2010 (Bitcoin Pizza Day), Laszlo Hanyecz a paye 10 000 BTC pour deux pizzas. A l'epoque, 1 BTC valait environ 0,003 dollar.",
      },
      {
        question:
          "En quelle annee le livre blanc de Bitcoin a-t-il ete publie ?",
        options: ['2006', '2008', '2009', '2010'],
        correctIndex: 1,
        explanation:
          "Satoshi Nakamoto a publie le livre blanc 'Bitcoin: A Peer-to-Peer Electronic Cash System' le 31 octobre 2008. Le reseau a ete lance en janvier 2009.",
      },
      {
        question:
          "Quel evenement de 2014 a fortement marque l'histoire de Bitcoin ?",
        options: [
          "Le premier halving",
          "La faillite de Mt. Gox",
          "L'adoption par le Salvador",
          "Le lancement d'Ethereum",
        ],
        correctIndex: 1,
        explanation:
          "Mt. Gox, alors la plus grande plateforme d'echange, a fait faillite en fevrier 2014 apres la perte de 850 000 BTC. Cet evenement a provoque une chute du cours et renforce les exigences de securite.",
      },
    ],
  },
};

export function getQuizForSlug(slug: string): QuizData | null {
  return BITCOIN_QUIZZES[slug] ?? null;
}
