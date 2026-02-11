---
title: "Layer 2"
slug: "layer-2"
shortDefinition: "Solution construite au-dessus d'une blockchain (Layer 1) pour augmenter sa vitesse et réduire ses frais."
category: "blockchain"
relatedTerms: ["ethereum", "gas-fees", "blockchain", "smart-contract"]
relatedCryptos: ["ethereum"]
difficulty: "intermédiaire"
---

Un Layer 2 (L2) est un réseau secondaire construit au-dessus d'une blockchain principale (Layer 1, comme Ethereum). Son objectif : traiter les transactions plus rapidement et à moindre coût, tout en bénéficiant de la sécurité du L1.

## Le problème que les L2 résolvent

Ethereum traite environ 15 à 30 transactions par seconde. C'est lent et cher quand des millions d'utilisateurs veulent interagir en même temps. Plutôt que de modifier Ethereum directement (long et complexe), les L2 traitent les transactions "hors chaîne" et ne publient qu'un résumé sur Ethereum.

## Les principaux types de Layer 2

**Optimistic Rollups** (Arbitrum, Optimism, Base) : ils partent du principe que les transactions sont valides par défaut. Si quelqu'un conteste une transaction, un mécanisme de "fraud proof" permet de la vérifier. Délai de retrait vers le L1 : environ 7 jours.

**ZK-Rollups** (zkSync, StarkNet, Polygon zkEVM) : ils utilisent des preuves cryptographiques (zero-knowledge proofs) pour prouver la validité des transactions. Plus complexes à développer mais plus rapides pour les retraits et potentiellement plus sécurisés.

## Les chiffres concrets

- Un swap sur Uniswap via Ethereum L1 : 5 à 50 $ de frais
- Le même swap sur Arbitrum : 0,10 à 0,50 $
- Le même swap sur Base : 0,01 à 0,05 $

En termes de vitesse, les L2 atteignent plusieurs centaines à milliers de transactions par seconde.

## L'écosystème L2 en 2024

Arbitrum et Base (développé par Coinbase) dominent en TVL et en activité. Les L2 hébergent désormais plus de transactions quotidiennes qu'Ethereum L1 lui-même. Les principales applications DeFi (Uniswap, Aave, Curve) sont déployées sur plusieurs L2.

Le risque ? La fragmentation de la liquidité entre les différents L2. Des projets de "bridges" et de standards d'interopérabilité tentent de résoudre ce problème.
