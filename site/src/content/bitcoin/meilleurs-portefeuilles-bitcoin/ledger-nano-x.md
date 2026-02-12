---
title: "Ledger Nano X : Test et Avis 2025 du Hardware Wallet avec Bluetooth"
description: "Test complet du Ledger Nano X : sécurité Secure Element, Bluetooth, autonomie réelle et comparatif avec les concurrents. Notre verdict après utilisation prolongée."
type: guide
branch: portefeuilles
parent: meilleurs-portefeuilles-bitcoin
order: 1
image: "/images/bitcoin/ledger-nano-x.webp"
readingTime: "12 min"
---

Le Ledger Nano X est le hardware wallet le plus vendu au monde depuis son lancement en 2019. Avec plus de 6 millions d'unités écoulées, il domine le marché des portefeuilles physiques. Son atout principal : la connectivité Bluetooth qui permet de gérer ses cryptos depuis un smartphone, sans ordinateur.

Mais à 149 dollars, est-il vraiment supérieur aux alternatives ? Sa batterie limitée à 5-7 ans justifie-t-elle ce prix ? Et la sécurité Secure Element offre-t-elle une protection réelle contre les attaques physiques ?

Nous avons testé le Nano X pendant plusieurs mois sur iOS, Android, Windows et macOS. Voici notre analyse complète, sans langue de bois.

## Ce qu'est le Ledger Nano X

Le Nano X est un cold wallet - un appareil physique qui stocke vos clés privées hors ligne. Il ressemble à une clé USB de 72 x 18,6 x 11,75 mm, pèse 34 grammes et tient dans une poche. L'écran de 128 x 64 pixels affiche 8 lignes de texte, contre 4 lignes sur le Nano S Plus.

La différence majeure avec les autres Ledger : le Bluetooth 5.0 et une batterie lithium-ion de 100 mAh. Vous pouvez l'utiliser avec l'application Ledger Live sur smartphone, sans câble. La batterie offre 8 heures d'autonomie en usage continu, ou plusieurs semaines si vous ne l'utilisez que quelques minutes par jour.

Le Nano X supporte 5 500 cryptomonnaies et tokens. La puce Secure Element (ST33J2M0) stocke les clés privées dans un environnement certifié CC EAL5+. C'est la même puce que dans les cartes bancaires et les passeports biométriques.

> [!IMPORTANT]
> Le Ledger Nano X utilise une puce Secure Element certifiée CC EAL5+ qui résiste aux attaques physiques (laser, injection de fautes, analyse de courant). Aucun vol de fonds par extraction physique de la clé n'a été documenté sur cette puce à ce jour.

## La batterie : promesse marketing ou vraie limite ?

Ledger annonce une durée de vie de la batterie entre 5 et 7 ans. Après cette période, la batterie se dégrade et l'appareil ne fonctionne plus qu'en mode USB. Le problème : Ledger ne propose pas de remplacement de batterie. Quand elle est morte, votre Nano X devient un Nano S Plus plus cher.

Cette limite a créé un débat sur Reddit et les forums crypto. Les utilisateurs de la première génération (2019) commencent à signaler des batteries qui tiennent moins la charge. Certains appareils achetés en 2020 ne fonctionnent déjà plus sans câble branché.

Le calcul est simple : 149 dollars pour 5 ans d'usage Bluetooth, c'est 30 dollars par an. Le Nano S Plus coûte 79 dollars et fonctionne indéfiniment par USB. Si vous n'utilisez pas le Bluetooth régulièrement, le Nano X perd son avantage principal après quelques années.

Pour être clair : même avec une batterie morte, vos fonds restent accessibles. Vous pouvez restaurer votre seed phrase sur n'importe quel autre wallet compatible BIP39. Mais vous perdez la mobilité qui justifie le prix du Nano X.

> [!WARNING]
> La batterie du Nano X a une durée de vie limitée à 5-7 ans et n'est pas remplaçable. Après ce délai, l'appareil ne fonctionne plus qu'en mode USB, comme le Nano S Plus vendu 70 dollars de moins.

## Sécurité : Secure Element contre open source

Ledger utilise une puce Secure Element pour stocker les clés privées. Cette puce résiste aux attaques physiques : analyse du courant électrique, injection de fautes par laser, ou ouverture du boîtier. Elle est certifiée CC EAL5+ par des laboratoires indépendants.

Le revers : le code qui tourne sur cette puce n'est pas entièrement open source. Les fabricants de puces (STMicroelectronics dans le cas de Ledger) imposent des accords de confidentialité (NDA). Ledger ne peut pas publier le code bas niveau qui interagit directement avec le hardware sécurisé.

Trezor, le concurrent principal, a fait le choix inverse : firmware 100% open source, mais pas de Secure Element jusqu'au Safe 5. Résultat : des chercheurs ont démontré des attaques physiques sur le Trezor Model One et le Safe 3. Avec un accès physique à l'appareil, un outillage spécialisé et quelques heures de travail, il était possible d'extraire la seed phrase. Trezor a corrigé ces failles sur le Safe 5 en ajoutant une puce Secure Element certifiée EAL6+.

Aucune extraction physique de clé n'a été démontrée sur les Ledger équipés de Secure Element. Les seules vulnérabilités documentées concernaient l'application Ledger Live (phishing) ou des attaques par supply chain (appareils modifiés avant livraison). Jamais la puce elle-même.

Le compromis : vous gagnez en résistance aux attaques physiques, mais vous perdez la possibilité de vérifier tout le code. C'est un choix de confiance. Ledger publie néanmoins une partie significative de son code sur GitHub, et fait auditer ses produits par des chercheurs en sécurité.

## Configuration et première utilisation

La configuration prend entre 10 et 20 minutes selon votre familiarité avec les wallets crypto.

**Étape 1 : Télécharger Ledger Live**
Rendez-vous sur ledger.com et téléchargez l'application pour Windows, macOS, Linux, iOS ou Android. N'utilisez jamais un lien reçu par email ou un résultat Google sponsorisé - des sites de phishing existent. Vérifiez que l'URL est bien `ledger.com`.

**Étape 2 : Brancher le Nano X**
Utilisez le câble USB-C fourni. L'appareil s'allume et affiche "Welcome to Ledger Nano X". Appuyez sur les deux boutons simultanément pour valider. Choisissez "Set up as new device".

**Étape 3 : Créer un code PIN**
Choisissez un code de 4 à 8 chiffres. Ne réutilisez pas un code que vous utilisez ailleurs. Après trois tentatives ratées, l'appareil se réinitialise. Le code PIN protège l'accès physique, pas vos fonds (la seed phrase fait ça).

**Étape 4 : Noter la seed phrase**
L'appareil génère 24 mots. Écrivez-les dans l'ordre exact sur les trois cartons Recovery Phrase fournis. Utilisez le stylo fourni ou un crayon à papier (l'encre stylo bille peut s'effacer avec le temps). Ne prenez pas de photo. Ne tapez rien sur un ordinateur ou un téléphone.

**Étape 5 : Vérifier la seed**
Le Nano X vous demande de confirmer certains mots (par exemple le mot n°3, n°12 et n°21). Cela garantit que vous avez bien noté la phrase. Si vous avez fait une erreur, recommencez la configuration.

**Étape 6 : Mettre à jour le firmware**
Ledger Live propose souvent une mise à jour firmware au premier lancement. Faites-la. Elle corrige les failles de sécurité découvertes depuis la fabrication de votre appareil.

**Étape 7 : Installer les applications crypto**
Ledger Live permet d'installer les apps Bitcoin, Ethereum, etc. sur l'appareil. Le Nano X peut stocker jusqu'à 100 applications simultanément grâce à ses 2 Mo de mémoire (contre 10 apps sur le Nano S).

> [!TIP]
> Faites un transfert test avec une petite somme (5 à 10 euros) avant d'envoyer des montants importants. Vérifiez que vous savez recevoir et envoyer, et que l'adresse affichée sur l'écran du Nano X correspond à celle de Ledger Live.

## Bluetooth : pratique mais controversé

Le Bluetooth du Nano X est son argument commercial principal. Il permet de gérer vos cryptos depuis un smartphone sans transporter d'ordinateur. L'appairage est simple : activez le Bluetooth sur l'appareil (Paramètres > Bluetooth > Pair), puis scannez depuis Ledger Live mobile.

La connexion fonctionne bien sur iOS et Android. Les transactions se signent directement sur le Nano X. Vous validez sur l'écran de l'appareil, pas sur le téléphone. Le Bluetooth ne transmet jamais les clés privées - seulement les transactions déjà signées.

Mais le Bluetooth a créé un débat dans la communauté crypto. Certains puristes estiment qu'un cold wallet ne devrait jamais communiquer sans fil. Le risque théorique : une faille dans le protocole Bluetooth pourrait permettre à un attaquant proche de vous d'intercepter des données.

Ledger répond que le Bluetooth du Nano X ne transmet que des données publiques (adresses) et des transactions déjà signées. La clé privée reste dans le Secure Element, jamais exposée. Les chercheurs en sécurité qui ont audité le Nano X confirment cette architecture.

En pratique, aucune attaque réussie via Bluetooth n'a été documentée sur le Nano X depuis 2019. Le risque reste théorique. Si vous êtes parano, désactivez le Bluetooth dans les paramètres et utilisez uniquement le câble USB.

## Ledger Live : l'application qui fait la différence

Ledger Live est l'interface logicielle qui accompagne le Nano X. C'est une application desktop et mobile qui affiche vos soldes, génère les adresses de réception, construit les transactions et affiche l'historique.

L'interface a beaucoup progressé depuis 2019. La version 2.0 lancée en 2023 a corrigé la lenteur et les bugs qui frustraient les utilisateurs. L'application supporte maintenant plus de 50 blockchains et permet de staker directement (Ethereum, Solana, Polkadot, Cosmos, Tezos).

Les points forts de Ledger Live :
- Portfolio multi-cryptos avec graphiques en temps réel
- Achat de crypto par carte bancaire (via Transak, MoonPay ou Ramp)
- Swap intégré pour échanger entre cryptos (via Paraswap ou 1inch)
- Staking en un clic pour les cryptos compatibles
- Compatibilité MetaMask et WalletConnect pour les DApps

Les limites :
- L'application collecte des données analytiques (désactivables dans les paramètres)
- Le swap et l'achat par carte ont des frais élevés (2 à 5% selon le service)
- Certaines fonctionnalités avancées (coin control, connexion via Tor) ne sont pas disponibles - il faut utiliser Electrum ou Sparrow

Ledger Live reste plus accessible que Sparrow pour un débutant. Mais si vous cherchez la confidentialité maximale ou des fonctionnalités avancées, vous pouvez utiliser le Nano X avec d'autres logiciels compatibles (Electrum, Sparrow, MetaMask).

> [!NOTE]
> Ledger Live collecte des données analytiques par défaut. Vous pouvez les désactiver dans Paramètres > Confidentialité > Analytiques. Pour une confidentialité maximale, utilisez le Nano X avec Electrum ou Sparrow via connexion Tor.

## Utilisation quotidienne : ce qui marche et ce qui bloque

Nous avons utilisé le Nano X pendant six mois sur différentes plateformes. Voici les situations réelles.

**Recevoir du bitcoin** : vous générez une adresse dans Ledger Live, l'appareil affiche l'adresse sur son écran. Vous vérifiez les premiers et derniers caractères (protection contre les malwares qui remplacent l'adresse). Vous envoyez l'adresse à l'expéditeur. Les fonds arrivent. Simple.

**Envoyer du bitcoin** : vous saisissez l'adresse de destination et le montant dans Ledger Live. L'application construit la transaction et l'envoie au Nano X. Sur l'écran de l'appareil, vous vérifiez l'adresse, le montant et les frais. Vous validez en appuyant sur les deux boutons. La transaction part. Comptez 30 secondes à 1 minute pour le processus complet.

**Utiliser une DApp Ethereum** : connectez le Nano X à MetaMask. Allez sur une DApp (Uniswap, Aave, OpenSea). La DApp demande une signature. MetaMask transmet la demande au Nano X. Vous validez sur l'écran de l'appareil. Ça fonctionne, mais c'est moins fluide qu'un hot wallet - chaque action demande une validation physique.

**Gérer un portefeuille NFT** : Ledger Live affiche vos NFTs dans l'onglet dédié. Vous pouvez les voir, mais pas les vendre directement. Pour vendre sur OpenSea, passez par MetaMask connecté au Nano X.

**Voyager avec le Nano X** : la taille poche et le Bluetooth sont pratiques. Mais certains utilisateurs signalent que les douanes posent des questions sur cet "appareil électronique non identifié". Si vous traversez une frontière avec des montants importants, renseignez-vous sur la réglementation locale (déclaration obligatoire au-dessus de 10 000 EUR dans l'UE).

## Les bugs et irritations

Aucun produit n'est parfait. Voici les problèmes rencontrés.

**Batterie qui se vide en veille** : plusieurs utilisateurs signalent que la batterie se décharge même quand l'appareil est éteint. Sur notre unité, une charge complète descendait à 60% après deux semaines sans utilisation. Ce n'est pas dramatique (l'appareil fonctionne par USB même à 0%), mais c'est irritant si vous comptez sur le Bluetooth.

**Lenteur de synchronisation** : Ledger Live peut mettre plusieurs minutes à synchroniser un compte Bitcoin avec beaucoup de transactions. Le problème vient des serveurs Ledger, pas de l'appareil. Solution : utilisez Electrum qui se connecte directement à la blockchain.

**Incompatibilité avec certaines DApps** : quelques DApps Ethereum ne reconnaissent pas le Nano X via WalletConnect. Nous avons rencontré ce problème avec des applications DeFi obscures. Les plateformes principales (Uniswap, Aave, Curve) fonctionnent.

**Firmware qui bloque pendant la mise à jour** : cela nous est arrivé une fois. La mise à jour s'est figée à 80%. Ledger recommande de débrancher et rebrancher l'appareil, puis de relancer. Ça a fonctionné, mais quelques minutes de stress.

**Bluetooth qui perd la connexion** : sur Android, le Bluetooth se déconnecte parfois en pleine transaction. Il faut réappairer l'appareil. Ce bug semble lié à certains modèles de téléphone (Samsung Galaxy notamment). Sur iPhone, nous n'avons pas eu ce problème.

## Ledger Nano X vs Nano S Plus vs Trezor Safe 5

Le Nano X coûte 149 dollars. Le Nano S Plus coûte 79 dollars. Le Trezor Safe 5 coûte 169 dollars. Voici les différences qui justifient (ou pas) l'écart de prix.

| Critère | Nano X | Nano S Plus | Trezor Safe 5 |
|---------|--------|-------------|---------------|
| Prix | 149 $ | 79 $ | 169 $ |
| Connectivité | Bluetooth + USB-C | USB-C uniquement | USB-C uniquement |
| Batterie | Oui (5-7 ans) | Non | Non |
| Écran | 128x64 px | 128x64 px | Écran tactile couleur |
| Secure Element | Oui (ST33) | Oui (ST33) | Oui (EAL6+) |
| Open source | Partiel | Partiel | Complet |
| Capacité apps | 100 apps | 100 apps | Illimité |
| Poids | 34 g | 21 g | 26 g |

Le Nano S Plus offre les mêmes fonctionnalités que le Nano X, sauf le Bluetooth et la batterie. Si vous ne prévoyez pas d'utiliser le Bluetooth régulièrement, le S Plus est le meilleur rapport qualité-prix. Même puce Secure Element, même compatibilité avec 5 500 cryptos, même écran.

Le Trezor Safe 5 coûte 20 dollars de plus que le Nano X. Il offre un écran tactile couleur (plus agréable à utiliser), un firmware 100% open source et une puce Secure Element certifiée EAL6+ (niveau supérieur au EAL5+ de Ledger). Mais pas de Bluetooth. Le choix entre Ledger et Trezor reste philosophique : sécurité matérielle contre transparence du code.

> [!TIP]
> Si vous n'utilisez pas le Bluetooth au moins une fois par semaine, le Ledger Nano S Plus (79 dollars) offre les mêmes garanties de sécurité que le Nano X, sans la limite de durée de vie de la batterie.

## Notre verdict après six mois d'utilisation

Le Ledger Nano X reste le hardware wallet le plus polyvalent du marché. L'écran lisible, les 100 apps installables et la compatibilité avec 5 500 cryptos en font un choix solide pour gérer un portefeuille diversifié.

Le Bluetooth est pratique si vous gérez vos cryptos en déplacement ou depuis un smartphone. Mais il ne justifie pas le surcoût de 70 dollars par rapport au Nano S Plus si vous utilisez principalement un ordinateur.

La vraie limite du Nano X, c'est la batterie non remplaçable. Payer 149 dollars pour un appareil qui deviendra un Nano S Plus dans 5 ans, c'est dur à avaler. Ledger devrait proposer un programme de remplacement de batterie ou une version sans batterie à prix réduit.

**On recommande le Nano X si** :
- Vous voyagez régulièrement et voulez gérer vos cryptos depuis votre smartphone
- Vous détenez plusieurs cryptomonnaies (pas seulement Bitcoin)
- Vous privilégiez la sécurité Secure Element contre les attaques physiques

**On déconseille le Nano X si** :
- Vous utilisez uniquement un ordinateur (prenez le Nano S Plus)
- Vous ne détenez que du Bitcoin (prenez un BitBox02 Bitcoin-only)
- Vous cherchez le meilleur rapport qualité-prix (prenez le Nano S Plus)

La sécurité est solide. L'expérience utilisateur est bonne. Mais le positionnement prix face au Nano S Plus devient difficile à justifier quand la batterie perd son intérêt après quelques années.