---
title: "Blockchain"
slug: "blockchain"
shortDefinition: "Registre numérique décentralisé et infalsifiable qui enregistre des transactions dans des blocs enchaînés."
category: "blockchain"
relatedTerms: ["bitcoin", "ethereum", "smart-contract", "proof-of-stake"]
relatedCryptos: ["bitcoin", "ethereum"]
difficulty: "débutant"
---

Une blockchain est une base de données distribuée. Au lieu d'être stockée sur un seul serveur, elle est répliquée sur des milliers d'ordinateurs (noeuds) à travers le monde. Chaque nouvelle donnée est regroupée dans un "bloc" qui est cryptographiquement lié au bloc précédent, formant une chaîne.

## Le principe en 3 étapes

1. Une transaction est émise (ex : Alice envoie 1 BTC à Bob)
2. Les noeuds du réseau vérifient et valident la transaction
3. La transaction validée est ajoutée dans un nouveau bloc, lié au précédent

Une fois inscrite, la donnée ne peut plus être modifiée sans altérer tous les blocs suivants, ce qui rendrait la fraude détectable instantanément par le réseau.

## Publique vs privée

Les blockchains publiques (Bitcoin, Ethereum) sont ouvertes à tous. N'importe qui peut lire les transactions, devenir validateur ou développer dessus. Les blockchains privées (Hyperledger, Corda) limitent l'accès à un groupe d'acteurs autorisés - elles sont utilisées par des entreprises pour la logistique ou la finance.

## Pourquoi c'est utile ?

- Transparence : toutes les transactions sont visibles publiquement
- Sécurité : la décentralisation rend le système très résistant aux attaques
- Désintermédiation : pas besoin de banque ou de notaire pour valider un échange
- Immutabilité : l'historique ne peut pas être altéré

La blockchain Bitcoin traite environ 7 transactions par seconde, Ethereum environ 15 à 30. Les solutions Layer 2 et les nouvelles blockchains (Solana, Avalanche) visent des milliers de transactions par seconde.
