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
