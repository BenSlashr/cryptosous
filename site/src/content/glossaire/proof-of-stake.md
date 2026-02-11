---
title: "Proof of Stake"
slug: "proof-of-stake"
shortDefinition: "Mécanisme de consensus où les validateurs mettent en jeu leurs tokens pour sécuriser le réseau et valider les transactions."
category: "blockchain"
relatedTerms: ["staking", "ethereum", "blockchain", "halving"]
relatedCryptos: ["ethereum", "cardano"]
difficulty: "intermédiaire"
---

Le Proof of Stake (PoS) est un mécanisme de consensus utilisé par les blockchains pour valider les transactions et créer de nouveaux blocs. Au lieu de résoudre des équations complexes comme en Proof of Work (Bitcoin), les validateurs "mettent en jeu" (stake) leurs tokens comme garantie de bonne conduite.

## PoW vs PoS : la différence

En **Proof of Work**, les mineurs dépensent de l'énergie électrique pour résoudre des puzzles cryptographiques. Le premier à trouver la solution gagne la récompense. Plus vous avez de puissance de calcul, plus vous avez de chances de gagner.

En **Proof of Stake**, les validateurs déposent des tokens en garantie. Le protocole sélectionne un validateur pour proposer le prochain bloc, généralement en proportion de son stake. Plus vous avez de tokens en jeu, plus vous êtes sélectionné souvent.

## Le slashing : la punition

Si un validateur tente de tricher (proposer des blocs invalides, valider deux blocs contradictoires), une partie de son stake est confisquée ("slashed"). Sur Ethereum, la pénalité peut aller de quelques pourcents à la totalité des 32 ETH déposés. Ce risque financier direct incite les validateurs à jouer le jeu.

## Les avantages du PoS

- **Efficacité énergétique** : le passage d'Ethereum du PoW au PoS a réduit sa consommation de 99,95%
- **Accessibilité** : pas besoin de matériel spécialisé coûteux (contrairement aux ASICs du mining)
- **Sécurité économique** : attaquer le réseau nécessite de détenir et risquer des milliards de dollars en tokens

## Les blockchains PoS

Ethereum (depuis 2022), Solana, Cardano, Polkadot, Cosmos, Avalanche, Tezos : la grande majorité des blockchains modernes utilisent le PoS ou une variante. Bitcoin reste le principal défenseur du Proof of Work.

## La critique

Le PoS favorise structurellement les gros détenteurs : plus vous possédez de tokens, plus vous en gagnez. Certains y voient une reproduction du système financier traditionnel où "l'argent fait de l'argent". Le liquid staking (Lido, Rocket Pool) tente de réduire cette barrière à l'entrée.
