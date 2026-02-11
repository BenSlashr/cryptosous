---
title: "Gas Fees"
slug: "gas-fees"
shortDefinition: "Frais de transaction sur Ethereum payés aux validateurs pour exécuter des opérations sur la blockchain."
category: "blockchain"
relatedTerms: ["ethereum", "smart-contract", "layer-2", "defi"]
relatedCryptos: ["ethereum"]
difficulty: "intermédiaire"
---

Les gas fees sont les frais que vous payez pour effectuer une transaction sur Ethereum. Chaque opération sur le réseau (transfert d'ETH, échange de tokens, interaction avec un smart contract) consomme du "gas", une unité de mesure de l'effort de calcul nécessaire.

## Comment les frais sont calculés ?

Le coût d'une transaction = quantité de gas utilisée x prix du gas (en Gwei).

Un Gwei vaut 0,000000001 ETH. Le prix du gas fluctue selon la demande sur le réseau. En période de forte activité (lancement d'un NFT populaire, crash du marché), les frais peuvent exploser.

**Exemples de coût en gas** :
- Transfert simple d'ETH : 21 000 gas
- Échange de tokens sur Uniswap : 150 000 à 300 000 gas
- Déploiement d'un smart contract : 1 000 000+ gas

## Pourquoi les frais varient autant ?

Ethereum fonctionne avec un système d'enchères. Les utilisateurs proposent un prix pour leur transaction, et les validateurs traitent en priorité celles qui paient le plus. Pendant le bull run de 2021, un simple swap sur Uniswap pouvait coûter 50 à 200 dollars de frais.

## L'EIP-1559 : le mécanisme de burn

Depuis août 2021, une partie des gas fees est brûlée (détruite) au lieu d'aller aux validateurs. Ce mécanisme réduit progressivement l'offre d'ETH en circulation. Lors de périodes de forte activité, plus d'ETH est brûlé que créé, rendant l'actif déflationniste.

## Comment réduire ses frais ?

- Utiliser des solutions Layer 2 (Arbitrum, Optimism, Base) où les frais sont 10 à 100 fois moins chers
- Effectuer ses transactions pendant les heures creuses (nuit et week-end en Europe)
- Utiliser des outils comme Etherscan Gas Tracker pour surveiller les prix en temps réel
