---
title: "Comment fonctionne Bitcoin : blockchain, minage et transactions"
description: "Le fonctionnement de Bitcoin expliqué simplement : blockchain, proof of work, minage, halving, transactions et noeuds. Comprendre la technologie derrière BTC."
type: hub
branch: fonctionnement
parent: null
order: 4
image: "/images/bitcoin/comment-fonctionne-bitcoin.webp"
---

Bitcoin est un système de paiement qui tourne sans banque, sans serveur central et sans autorité de contrôle. Le réseau fonctionne grâce à des milliers d'ordinateurs répartis dans le monde entier. Chacun détient une copie du même registre de transactions : la blockchain.

Créé en 2009 par Satoshi Nakamoto, Bitcoin repose sur un protocole open source. N'importe qui peut vérifier le code, rejoindre le réseau ou envoyer des bitcoins. Aucune entreprise ne gère le système. Ce sont les règles mathématiques du protocole qui garantissent son fonctionnement.

## La blockchain : un registre partagé et infalsifiable

La blockchain Bitcoin est une chaîne de blocs liés entre eux par des empreintes cryptographiques. Chaque bloc contient un lot de transactions, un horodatage et une référence au bloc précédent. Cette structure rend toute modification rétroactive impossible : changer une seule transaction obligerait à recalculer tous les blocs suivants.

Imaginez un cahier comptable dont chaque page est scellée à la précédente par un cadenas mathématique. Pour falsifier une écriture en page 50, il faudrait casser tous les cadenas des pages 51 à 900 000+. En pratique, c'est irréalisable.

### Un bloc toutes les dix minutes

Le réseau Bitcoin produit un nouveau bloc environ toutes les 10 minutes. Chaque bloc peut contenir plusieurs milliers de transactions. Depuis le lancement en 2009, la blockchain a dépassé les 900 000 blocs et stocke l'intégralité des données de chaque échange de BTC jamais réalisé.

## Les transactions Bitcoin : comment l'argent circule

Quand vous envoyez des bitcoins, vous ne déplacez pas un fichier d'un portefeuille à un autre. Vous signez un message qui dit : "Je transfère X BTC de cette adresse à cette adresse." Ce message est diffusé à l'ensemble du réseau.

### Clés publiques et clés privées

Chaque utilisateur possède deux clés. La clé publique est l'équivalent d'un RIB : vous la partagez pour recevoir des fonds. La clé privée est votre mot de passe. Elle sert à signer les transactions et prouver que vous êtes bien le propriétaire des bitcoins. Si vous perdez cette clé, personne ne peut récupérer vos fonds - même pas le réseau.

### Les frais de transaction

Chaque transaction inclut des frais, payés aux mineurs. Plus vous offrez de frais, plus votre transaction sera traitée vite. En période de forte activité, ces frais peuvent monter. En période calme, envoyer des bitcoins coûte quelques centimes. Le montant des frais dépend de la taille de la transaction en octets, pas de la valeur envoyée.

### Le parcours d'une transaction : du clic à la confirmation

Quand vous appuyez sur "Envoyer" dans votre wallet, votre transaction suit un chemin précis à travers le réseau.

**Broadcast (0 à 2 secondes).** Votre portefeuille signe la transaction avec votre clé privée et l'envoie aux noeuds Bitcoin auxquels il est connecté. Ces noeuds la relaient à leurs voisins. En moins de deux secondes, la transaction atteint la majorité du réseau.

**Mempool (quelques secondes à plusieurs heures).** La transaction atterrit dans la mempool - une salle d'attente où les transactions non confirmées patientent. Chaque noeud du réseau possède sa propre mempool. Les mineurs piochent dans cette file les transactions qui offrent les frais les plus élevés, car ce sont elles qui maximisent leur revenu. Si le réseau est peu chargé, votre transaction sera sélectionnée au bloc suivant. En cas de congestion, il faudra attendre plus longtemps - ou payer des frais plus élevés.

**Inclusion dans un bloc (environ 10 minutes).** Un mineur inclut votre transaction dans le prochain bloc qu'il valide. À ce stade, vous avez une première confirmation. Pour un café à 5 euros, c'est suffisant. Mais pour un achat à 10 000 euros, les commerçants attendent en général plus de confirmations.

**6 confirmations (environ 60 minutes).** Chaque nouveau bloc ajouté après le vôtre renforce la sécurité de votre transaction. Après 6 blocs, la probabilité qu'un attaquant annule votre paiement est infime - de l'ordre de 0,0002 %. C'est le seuil standard adopté par la plupart des plateformes d'échange et des commerçants.

Si votre transaction reste non confirmée pendant 14 jours, elle est automatiquement retirée de la mempool et les fonds reviennent disponibles dans votre portefeuille.

## Le minage et la preuve de travail

Le minage est le mécanisme qui sécurise le réseau et crée de nouveaux bitcoins. Les mineurs sont des ordinateurs spécialisés qui participent à une compétition : trouver un nombre (appelé "nonce") qui, combiné aux données du bloc, produit une empreinte numérique respectant certaines conditions de difficulté.

C'est la preuve de travail - ou proof of work. Le premier mineur qui trouve la solution valide le bloc, l'ajoute à la chaîne et reçoit une récompense en BTC. Les autres mineurs vérifient la solution (ce qui prend une fraction de seconde) et passent au bloc suivant.

### Un réseau à la puissance colossale

Le hashrate du réseau Bitcoin dépasse aujourd'hui les 800 EH/s (exahashes par seconde). Pour situer : c'est l'équivalent de centaines de millions d'ordinateurs qui calculent en parallèle. Cette puissance rend une attaque sur le réseau extrêmement coûteuse, car il faudrait contrôler plus de 50 % de toute cette capacité de calcul.

La difficulté du minage s'ajuste automatiquement tous les 2 016 blocs, soit environ toutes les deux semaines. Si trop de mineurs rejoignent le réseau, la difficulté augmente. Si des mineurs quittent, elle diminue. Ce mécanisme maintient le rythme d'un bloc toutes les 10 minutes, quelle que soit la puissance totale déployée.

## Le halving : la rareté programmée

Tous les 210 000 blocs (environ quatre ans), la récompense des mineurs est divisée par deux. C'est le halving. En 2009, chaque bloc rapportait 50 BTC. Après le halving d'avril 2024, la récompense est passée à 3,125 BTC par bloc. Le prochain halving est prévu aux alentours de 2028.

Ce mécanisme contrôle la création monétaire de Bitcoin. Le nombre total de bitcoins est plafonné à 21 millions. Aujourd'hui, environ 19,8 millions de BTC sont déjà en circulation. Les derniers bitcoins seront minés vers 2140.

Le halving a aussi un effet sur le prix. À chaque division de la récompense, l'offre de nouveaux bitcoins diminue. Si la demande reste stable ou augmente, le prix tend à monter - c'est ce que le marché a observé après chaque halving précédent.

## Les noeuds : la colonne vertébrale du réseau

Les noeuds (nodes) sont des ordinateurs qui font tourner le logiciel Bitcoin et stockent une copie complète de la blockchain. Leur rôle est de vérifier chaque transaction et chaque bloc selon les règles du protocole. Un noeud refuse automatiquement toute transaction invalide, même si elle vient d'un mineur.

Le réseau Bitcoin compte des dizaines de milliers de noeuds actifs répartis dans le monde. N'importe qui peut lancer un noeud depuis chez soi avec un ordinateur modeste et une connexion internet. Cette accessibilité est ce qui rend Bitcoin décentralisé : aucune entité ne peut modifier les règles sans le consensus des utilisateurs qui font tourner les noeuds.

### La différence entre noeuds et mineurs

Un mineur valide les blocs et reçoit des récompenses. Un noeud vérifie que les mineurs respectent les règles. Tous les mineurs sont des noeuds, mais la majorité des noeuds ne minent pas. Ce sont ces noeuds non-mineurs qui servent de contre-pouvoir : ils garantissent que personne ne triche.

## Bitcoin en chiffres : les statistiques du réseau

Quelques données clés pour mesurer l'ampleur du réseau Bitcoin en 2025 :

- **Taille de la blockchain** : plus de 670 Go de données. C'est le double de 2021, et le volume grossit d'environ 1 Go tous les quelques jours.
- **Nombre de blocs** : plus de 900 000 blocs minés depuis janvier 2009.
- **Transactions par jour** : entre 300 000 et 700 000 selon l'activité du réseau. Les pics correspondent aux périodes de forte volatilité du prix.
- **Transactions par bloc** : en moyenne 4 000 à 5 000 transactions par bloc, un record historique lié à l'adoption croissante.
- **Taille moyenne d'un bloc** : entre 1,6 et 1,9 Mo. SegWit et Taproot ont permis de compacter plus de transactions dans chaque bloc.
- **Transactions par seconde (TPS)** : environ 7 TPS sur la couche de base. C'est peu comparé à Visa (environ 1 700 TPS en moyenne), mais le Lightning Network permet des millions de transactions instantanées en surcouche.
- **Hashrate** : plus de 800 EH/s. Pour donner une échelle, 1 exahash représente un milliard de milliards de calculs par seconde.
- **Temps moyen entre blocs** : 10 minutes, ajusté automatiquement par le protocole.

Ces chiffres montrent un réseau qui n'a jamais été aussi actif et aussi sécurisé depuis sa création.

## Bitcoin vs Ethereum : les différences techniques

Bitcoin et Ethereum sont les deux plus grandes blockchains, mais elles n'ont pas la même vocation. Les comparer aide à mieux comprendre les choix techniques de Bitcoin.

### Consensus : preuve de travail vs preuve d'enjeu

Bitcoin utilise la preuve de travail (proof of work). Les mineurs dépensent de l'électricité pour sécuriser le réseau. C'est un choix délibéré : l'énergie physique consommée rend toute attaque très coûteuse.

Ethereum est passé à la preuve d'enjeu (proof of stake) en septembre 2022. Les validateurs bloquent des ETH en garantie au lieu de miner. Ce changement a réduit la consommation énergétique d'Ethereum de plus de 99 %, mais la sécurité repose alors sur des incitations économiques plutôt que sur de l'énergie physique.

Bitcoin n'a aucun projet de passer au proof of stake. Sa communauté considère la preuve de travail comme la seule méthode qui offre une sécurité ancrée dans le monde physique.

### Programmabilité : Bitcoin Script vs smart contracts

Ethereum a été conçu pour exécuter des programmes complexes - les smart contracts. Son langage (Solidity) est Turing-complet : il permet de coder des applications décentralisées, de la finance (DeFi) aux NFT.

Bitcoin possède un langage de script volontairement limité. Ce n'est pas un défaut, c'est un choix. Un langage simple réduit la surface d'attaque. Moins de code = moins de failles. Les hacks de smart contracts sur Ethereum ont coûté des milliards de dollars depuis 2016. Bitcoin a évité ces problèmes en restant minimaliste.

### Supply : 21 millions vs émission variable

Bitcoin a un plafond fixe de 21 millions de BTC. Pas un de plus. Cette rareté programmée est gravée dans le code et ne peut pas être modifiée sans le consensus de tout le réseau.

Ethereum n'a pas de plafond fixe. Son émission dépend d'un mécanisme de "burn" et de création qui ajuste l'offre en fonction de l'activité du réseau. En périodes d'utilisation intense, plus d'ETH est brûlé que créé, ce qui rend l'ETH temporairement déflationniste.

### Temps de bloc et scalabilité

Bitcoin produit un bloc toutes les 10 minutes. Ethereum, un bloc toutes les 12 secondes. Ce rythme plus rapide donne à Ethereum un débit de transactions plus élevé sur sa couche de base.

Mais Bitcoin compense avec le Lightning Network, une surcouche qui permet des paiements quasi instantanés (moins d'une seconde) avec des frais négligeables. Chaque approche a ses compromis : Ethereum mise sur la polyvalence, Bitcoin sur la robustesse et la simplicité.

## Les mises à jour de Bitcoin : comment le protocole évolue

Bitcoin est un logiciel open source. Il évolue, mais lentement et prudemment. Chaque modification passe par un processus rigoureux pour éviter d'introduire des failles dans un réseau qui gère des centaines de milliards de dollars.

### Le processus BIP (Bitcoin Improvement Proposal)

Toute modification du protocole commence par un BIP - un document technique qui décrit le changement proposé. N'importe qui peut rédiger un BIP. Il est publié, débattu par la communauté de développeurs, testé sur des réseaux expérimentaux, puis soumis à l'adoption des noeuds.

Aucune autorité ne peut forcer l'adoption d'un BIP. Chaque opérateur de noeud décide de mettre à jour son logiciel ou non. Si un changement n'obtient pas un large consensus, il ne passe pas. Ce système est lent, mais c'est voulu : la prudence prime sur la vitesse.

### SegWit (2017) : plus de place dans chaque bloc

SegWit (Segregated Witness) a séparé les signatures cryptographiques du reste des données de transaction. Résultat : chaque transaction prend moins de place dans un bloc, ce qui augmente le nombre de transactions traitables par bloc sans modifier la taille maximale officielle.

SegWit a aussi corrigé un bug technique (la malléabilité des transactions) qui bloquait le développement du Lightning Network. Sans SegWit, pas de paiements instantanés en Bitcoin.

### Taproot (2021) : plus de confidentialité et de flexibilité

Taproot est la mise à jour la plus importante depuis SegWit. Activée en novembre 2021 au bloc 709 632, elle repose sur trois BIP complémentaires :

- **Signatures Schnorr (BIP 340)** : elles remplacent l'ancien format ECDSA. Les signatures sont plus légères (64 octets contre 71-72) et permettent d'agréger plusieurs signatures en une seule. Les transactions multi-signatures deviennent indistinguables des transactions simples.
- **MAST (BIP 341)** : au lieu de stocker toutes les conditions d'une transaction complexe sur la blockchain, seule la condition exécutée est enregistrée. Ça économise de l'espace et améliore la confidentialité.
- **Tapscript (BIP 342)** : une mise à jour du langage de script de Bitcoin qui facilite l'ajout de futures fonctionnalités.

### Et après ?

Plusieurs propositions sont en discussion : BIP-324 (chiffrement des communications entre noeuds), OP_CAT (scripts plus avancés) et BIP-119 (restrictions programmables sur les transactions). Chacune suit le même processus lent et prudent, ce qui garantit que Bitcoin reste stable.

## Pourquoi Bitcoin ne peut pas être "piraté"

On entend parfois que Bitcoin pourrait être hacké. En pratique, le réseau lui-même n'a jamais été compromis depuis 2009. Voici pourquoi.

### Le coût d'une attaque 51 %

Pour falsifier des transactions, un attaquant devrait contrôler plus de 50 % du hashrate mondial. Avec un réseau à plus de 800 EH/s, les estimations placent le coût d'une telle opération à environ 6 milliards de dollars - rien que pour le matériel. Il faudrait ajouter l'électricité, l'infrastructure et des années de préparation. Et même en cas de succès, l'attaque serait visible immédiatement par le réseau, déclenchant une chute du prix qui rendrait l'opération non rentable.

À titre de comparaison, les fraudes bancaires traditionnelles coûtent chaque année des dizaines de milliards de dollars au système financier mondial. Bitcoin n'a subi aucune fraude au niveau du protocole en plus de 15 ans d'existence.

### La cryptographie derrière Bitcoin

Bitcoin utilise l'algorithme SHA-256 pour le hachage et l'ECDSA (puis Schnorr depuis Taproot) pour les signatures. Casser SHA-256 par force brute nécessiterait plus d'énergie que n'en produit le Soleil pendant toute sa durée de vie. Ce n'est pas une exagération : c'est un calcul mathématique.

Les failles de sécurité en crypto ne viennent jamais de la blockchain elle-même. Elles viennent des plateformes d'échange mal sécurisées, des erreurs humaines (clés privées mal stockées) ou des arnaques par ingénierie sociale. Le protocole Bitcoin, lui, n'a jamais été cassé.

## Pourquoi Bitcoin fonctionne sans autorité centrale

Bitcoin combine quatre éléments pour fonctionner sans intermédiaire :

- **La blockchain** stocke toutes les transactions de façon transparente et immuable
- **La preuve de travail** empêche quiconque de créer de faux blocs sans y consacrer une énergie considérable
- **Le halving** contrôle l'émission de monnaie selon un calendrier fixe et prévisible
- **Les noeuds** vérifient que tout le monde respecte les règles du protocole

Ce système de cryptomonnaies fonctionne 24 heures sur 24, 7 jours sur 7, sans interruption depuis janvier 2009. Aucune banque, aucun gouvernement ne peut bloquer une transaction ou geler un compte. C'est cette architecture qui donne sa valeur à Bitcoin comme moyen d'échange et réserve de valeur.

## Aller plus loin : les guides techniques

Cette page donne une vue d'ensemble du fonctionnement de Bitcoin. Pour creuser chaque sujet, retrouvez nos guides détaillés :

- **Le minage de Bitcoin** : rentabilité, matériel, pools de minage et consommation d'énergie
- **Le Lightning Network** : les paiements instantanés en BTC, pour quelques centimes de frais
- **La sécurité Bitcoin** : protéger ses clés privées, éviter les arnaques et gérer ses crypto
- **Les portefeuilles Bitcoin** : choisir entre wallet logiciel, hardware wallet et solutions de garde

Chaque guide approfondit un aspect précis de la technologie Bitcoin. Commencez par celui qui correspond à votre question du moment.
