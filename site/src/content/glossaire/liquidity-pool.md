---
title: "Liquidity Pool"
slug: "liquidity-pool"
shortDefinition: "Réserve de tokens verrouillés dans un smart contract qui permet les échanges décentralisés sur un DEX."
category: "defi"
relatedTerms: ["dex", "yield-farming", "defi", "smart-contract"]
relatedCryptos: ["ethereum", "solana"]
difficulty: "avancé"
---

Un liquidity pool (pool de liquidité) est un ensemble de tokens déposés dans un smart contract. Ces réserves servent à faciliter les échanges sur les plateformes décentralisées (DEX) sans avoir besoin d'un carnet d'ordres classique.

## Comment ça marche ?

Sur un exchange traditionnel (Binance, Coinbase), un acheteur est mis en relation avec un vendeur. Sur un DEX comme Uniswap, il n'y a pas de vendeur : vous échangez vos tokens directement contre le pool.

Prenons le pool ETH/USDC sur Uniswap. Des fournisseurs de liquidité (LPs) déposent une valeur équivalente d'ETH et d'USDC dans le contrat. Quand vous voulez acheter de l'ETH, vous envoyez des USDC au pool et recevez de l'ETH en retour. Le prix est calculé automatiquement par une formule mathématique (x * y = k pour Uniswap v2).

## Fournir de la liquidité : les gains

Les LPs reçoivent une part des frais de transaction. Sur Uniswap v3, les frais varient entre 0,01% et 1% par échange selon le pool. Plus le pool est actif (gros volume de trading), plus les LPs gagnent.

Des protocoles distribuent aussi leurs propres tokens aux LPs comme incitation supplémentaire.

## Le piège : l'impermanent loss

Si le prix d'un des deux tokens du pool change significativement par rapport à l'autre, les LPs subissent une perte "impermanente". Exemple : vous déposez 1 ETH + 2 000 USDC dans un pool. Si l'ETH monte à 4 000 $, votre position dans le pool vaudra moins que si vous aviez simplement gardé vos tokens.

Sur une variation de prix de 2x, l'impermanent loss est d'environ 5,7%. Sur une variation de 5x, elle atteint 25,5%.

## Pools stables vs pools volatils

Les pools de stablecoins (USDC/USDT/DAI) subissent très peu d'impermanent loss car les prix restent proches. Les rendements sont plus faibles (2 à 5%) mais beaucoup plus prévisibles. Les pools de tokens volatils offrent des rendements supérieurs mais avec un risque d'impermanent loss bien réel.
