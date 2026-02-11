---
title: "Smart Contract"
slug: "smart-contract"
shortDefinition: "Programme autonome déployé sur une blockchain qui s'exécute automatiquement quand des conditions prédéfinies sont remplies."
category: "blockchain"
relatedTerms: ["ethereum", "defi", "gas-fees", "dex"]
relatedCryptos: ["ethereum", "cardano"]
difficulty: "intermédiaire"
---

Un smart contract est un programme informatique stocké sur une blockchain. Il s'exécute automatiquement quand les conditions définies dans son code sont remplies. Pas besoin de tiers de confiance : le code fait office de juge et d'exécuteur.

## Un exemple simple

Imaginons un pari entre Alice et Bob sur un match de foot. Avec un smart contract :

1. Alice et Bob déposent chacun 1 ETH dans le contrat
2. Le contrat est programmé pour consulter un oracle (source de données externe) à la fin du match
3. Le gagnant reçoit automatiquement les 2 ETH

Personne ne peut tricher, annuler ou modifier les termes après le déploiement.

## Comment ça fonctionne techniquement ?

Les smart contracts sur Ethereum sont écrits en Solidity (un langage proche de JavaScript). Une fois compilés et déployés sur la blockchain, ils reçoivent une adresse unique. N'importe qui peut interagir avec un smart contract en envoyant une transaction à cette adresse.

Chaque exécution coûte des gas fees, car elle mobilise les ressources du réseau. Plus le contrat est complexe, plus les frais sont élevés.

## Les limites à connaître

**Immutabilité** : une fois déployé, un smart contract ne peut pas être modifié. Si le code contient un bug, les fonds peuvent être perdus. Le hack de "The DAO" en 2016 a causé la perte de 60 millions de dollars à cause d'une faille dans un smart contract.

**Dépendance aux oracles** : les smart contracts ne peuvent pas accéder aux données hors blockchain. Ils dépendent de services comme Chainlink pour obtenir des prix, des résultats sportifs ou des données météo.

C'est pourquoi les audits de sécurité sont devenus une pratique standard avant tout lancement. Des firmes comme CertiK, Trail of Bits ou OpenZeppelin auditent le code avant le déploiement.
