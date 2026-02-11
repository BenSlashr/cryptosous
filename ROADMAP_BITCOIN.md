# Roadmap — Cocon sémantique Bitcoin (147 pages)

## Vue d'ensemble

Créer le cocon sémantique le plus complet en français sur Bitcoin.
34 anciennes URLs de crypto-sous.fr + 113 nouvelles pages = 147 pages.

---

## Phase 0 — Infrastructure technique

Avant de rédiger, mettre en place les gabarits et la collection.

### 0.1 Collection Astro `bitcoin`

Créer `site/src/content/bitcoin/` avec schema dans `content.config.ts` :

```yaml
# Frontmatter type hub
---
title: "Acheter Bitcoin"
description: "..."
type: hub        # hub | guide
branch: acheter  # acheter | vendre | fonctionnement | lightning | portefeuilles | minage | securite | investir | reglementation | histoire | apprendre
parent: null     # null = enfant direct de /bitcoin/, sinon slug du parent
order: 1         # ordre d'affichage dans le hub parent
image: "/images/bitcoin/acheter-bitcoin.webp"
---
```

```yaml
# Frontmatter type guide
---
title: "DCA Bitcoin : la stratégie d'investissement programmé"
description: "..."
type: guide
branch: acheter
parent: acheter-bitcoin
order: 5
image: "/images/bitcoin/dca-bitcoin.webp"
pubDate: 2026-02-15
readingTime: "10 min"
faqSchema: true   # activer le FAQ schema si la page contient des questions
---
```

### 0.2 Route catch-all

Créer `site/src/pages/bitcoin/[...slug].astro` :
- Résout le type depuis le frontmatter
- Rend le gabarit hub ou guide selon `type`
- Gère `/bitcoin/` (index) comme hub racine

### 0.3 Gabarit Hub

Composant pour les 12 pages hub :
- Hero : titre + description + image
- Grille de cards enfants (récupérées dynamiquement via `branch` + `parent`)
- Intro éditoriale (contenu markdown du fichier)
- Cross-links vers les autres branches du cocon
- Breadcrumb : Accueil > Bitcoin > [Branche]
- Schema.org CollectionPage

### 0.4 Gabarit Guide

Composant pour les ~135 pages guide :
- Breadcrumb profond : Accueil > Bitcoin > Branche > Parent > Page
- Hero image
- Table des matières auto-générée depuis les H2/H3
- Contenu markdown (prose-custom)
- Bloc "Pages liées" : frères/soeurs dans la même branche
- Cross-links vers les autres branches
- FAQ schema (si `faqSchema: true`)
- Disclaimer
- Schema.org Article

### 0.5 Build et vérification

- [ ] `npm run build` compile sans erreur
- [ ] Hub `/bitcoin/` affiche la grille des branches
- [ ] Guide test affiche breadcrumb + TOC + contenu
- [ ] Liens entre hub et guides fonctionnent
- [ ] Responsive OK

---

## Phase 1 — Hub Bitcoin + Apprendre (priorité : entrée de funnel)

9 pages. Les hubs structurent le cocon, les pages débutant captent le trafic top-funnel.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/` | Hub racine | P0 |
| 2 | `/bitcoin/bitcoin-debutant/` | Hub apprendre | P0 |
| 3 | `/bitcoin/bitcoin-debutant/bitcoin-cest-quoi/` | Guide | P0 |
| 4 | `/bitcoin/bitcoin-debutant/pourquoi-bitcoin/` | Guide | P0 |
| 5 | `/bitcoin/avantages-inconvenients/` | Guide (existant) | P0 |
| 6 | `/bitcoin/bitcoin-debutant/erreurs-debutant-bitcoin/` | Guide | P1 |
| 7 | `/bitcoin/bitcoin-debutant/glossaire-bitcoin/` | Guide | P1 |
| 8 | `/bitcoin/bitcoin-debutant/livres-bitcoin/` | Guide | P2 |
| 9 | `/bitcoin/bitcoin-debutant/podcasts-documentaires-bitcoin/` | Guide | P2 |

---

## Phase 2 — Acheter Bitcoin (trafic commercial, monétisation)

23 pages. Branche à plus fort potentiel de conversion (affiliation exchanges).

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/acheter-bitcoin/` | Hub | P0 |
| 2 | `/bitcoin/acheter-bitcoin/cours-bitcoin/` | Guide (existant) | P0 |
| 3 | `/bitcoin/acheter-bitcoin/binance/` | Guide (existant) | P0 |
| 4 | `/bitcoin/acheter-bitcoin/coinbase/` | Guide (existant) | P0 |
| 5 | `/bitcoin/acheter-bitcoin/kraken/` | Guide (existant) | P0 |
| 6 | `/bitcoin/acheter-bitcoin/etoro/` | Guide (existant) | P0 |
| 7 | `/bitcoin/acheter-bitcoin/etf-bitcoin/` | Guide | P0 |
| 8 | `/bitcoin/acheter-bitcoin/dca-bitcoin/` | Guide | P0 |
| 9 | `/bitcoin/acheter-bitcoin/achat-bitcoin-cb/` | Guide (existant) | P1 |
| 10 | `/bitcoin/acheter-bitcoin/achat-bitcoin-virement-bancaire/` | Guide (existant) | P1 |
| 11 | `/bitcoin/acheter-bitcoin/acheter-bitcoin-paypal/` | Guide (existant) | P1 |
| 12 | `/bitcoin/acheter-bitcoin/trade-republic/` | Guide | P1 |
| 13 | `/bitcoin/acheter-bitcoin/revolut/` | Guide | P1 |
| 14 | `/bitcoin/acheter-bitcoin/swissborg/` | Guide | P1 |
| 15 | `/bitcoin/acheter-bitcoin/acheter-fraction-bitcoin/` | Guide | P1 |
| 16 | `/bitcoin/acheter-bitcoin/meilleur-moment-acheter-bitcoin/` | Guide | P1 |
| 17 | `/bitcoin/acheter-bitcoin/cours-bitcoin-2009/` | Guide (existant) | P2 |
| 18 | `/bitcoin/acheter-bitcoin/comment-short-bitcoin/` | Guide (existant) | P2 |
| 19 | `/bitcoin/acheter-bitcoin/bitstack/` | Guide | P2 |
| 20 | `/bitcoin/acheter-bitcoin/bitcoin-atm/` | Guide | P2 |
| 21 | `/bitcoin/acheter-bitcoin/acheter-bitcoin-sans-kyc/` | Guide | P2 |
| 22 | `/bitcoin/acheter-bitcoin/bitcoin-spot-vs-cfd/` | Guide | P2 |
| 23 | `/bitcoin/acheter-bitcoin/achat-bitcoin-especes/` | Guide | P2 |

---

## Phase 3 — Vendre et utiliser Bitcoin

8 pages. Complète le parcours utilisateur achat → usage → sortie.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/vendre-bitcoin/` | Hub | P0 |
| 2 | `/bitcoin/vendre-bitcoin/convertir-bitcoin-euro/` | Guide | P0 |
| 3 | `/bitcoin/vendre-bitcoin/envoyer-recevoir-bitcoin/` | Guide | P0 |
| 4 | `/bitcoin/vendre-bitcoin/bitcoin-paiement/` | Guide | P1 |
| 5 | `/bitcoin/vendre-bitcoin/bitcoin-commercants/` | Guide | P1 |
| 6 | `/bitcoin/vendre-bitcoin/gagner-bitcoin-gratuitement/` | Guide | P1 |
| 7 | `/bitcoin/vendre-bitcoin/offrir-bitcoin/` | Guide | P2 |
| 8 | `/bitcoin/vendre-bitcoin/bitcoin-salaire/` | Guide | P2 |

---

## Phase 4 — Comment fonctionne Bitcoin (contenu éducatif, autorité)

18 pages. Construit l'autorité thématique sur Bitcoin.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/comment-fonctionne-bitcoin/` | Hub (existant) | P0 |
| 2 | `/bitcoin/comment-fonctionne-bitcoin/blockchain-bitcoin/` | Guide | P0 |
| 3 | `/bitcoin/comment-fonctionne-bitcoin/proof-of-work-bitcoin/` | Guide | P0 |
| 4 | `/bitcoin/comment-fonctionne-bitcoin/halving-bitcoin/` | Guide (existant) | P0 |
| 5 | `/bitcoin/comment-fonctionne-bitcoin/cle-privee-cle-publique/` | Guide | P0 |
| 6 | `/bitcoin/comment-fonctionne-bitcoin/adresses-bitcoin/` | Guide (existant) | P1 |
| 7 | `/bitcoin/comment-fonctionne-bitcoin/cryptographie/` | Guide (existant) | P1 |
| 8 | `/bitcoin/comment-fonctionne-bitcoin/temps-transaction-bitcoin/` | Guide (existant) | P1 |
| 9 | `/bitcoin/comment-fonctionne-bitcoin/noeuds-bitcoin/` | Guide | P1 |
| 10 | `/bitcoin/comment-fonctionne-bitcoin/mempool-bitcoin/` | Guide | P1 |
| 11 | `/bitcoin/comment-fonctionne-bitcoin/frais-transaction-bitcoin/` | Guide | P1 |
| 12 | `/bitcoin/comment-fonctionne-bitcoin/utxo-bitcoin/` | Guide | P1 |
| 13 | `/bitcoin/comment-fonctionne-bitcoin/whitepaper-bitcoin/` | Guide | P1 |
| 14 | `/bitcoin/comment-fonctionne-bitcoin/segwit/` | Guide | P2 |
| 15 | `/bitcoin/comment-fonctionne-bitcoin/taproot/` | Guide | P2 |
| 16 | `/bitcoin/comment-fonctionne-bitcoin/forks-bitcoin/` | Guide | P2 |
| 17 | `/bitcoin/comment-fonctionne-bitcoin/bitcoin-script/` | Guide | P2 |
| 18 | `/bitcoin/comment-fonctionne-bitcoin/bip-gouvernance-bitcoin/` | Guide | P2 |

---

## Phase 5 — Lightning Network

7 pages. Sujet en forte croissance, différenciant.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/lightning-network-bitcoin/` | Hub (existant → enrichi) | P0 |
| 2 | `/bitcoin/lightning-network-bitcoin/comment-fonctionne-lightning/` | Guide | P0 |
| 3 | `/bitcoin/lightning-network-bitcoin/wallets-lightning/` | Guide | P0 |
| 4 | `/bitcoin/lightning-network-bitcoin/payer-lightning/` | Guide | P1 |
| 5 | `/bitcoin/lightning-network-bitcoin/lightning-vs-onchain/` | Guide | P1 |
| 6 | `/bitcoin/lightning-network-bitcoin/ouvrir-canal-lightning/` | Guide | P2 |
| 7 | `/bitcoin/lightning-network-bitcoin/nostr-lightning/` | Guide | P2 |

---

## Phase 6 — Portefeuilles Bitcoin

11 pages. Complète la branche existante.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/meilleurs-portefeuilles-bitcoin/` | Hub (existant) | P0 |
| 2 | `/bitcoin/meilleurs-portefeuilles-bitcoin/hardware-wallet/` | Guide (existant) | P0 |
| 3 | `/bitcoin/meilleurs-portefeuilles-bitcoin/portefeuille-logiciel/` | Guide (existant) | P0 |
| 4 | `/bitcoin/meilleurs-portefeuilles-bitcoin/ledger-bitcoin/` | Guide | P0 |
| 5 | `/bitcoin/meilleurs-portefeuilles-bitcoin/trezor-bitcoin/` | Guide | P0 |
| 6 | `/bitcoin/meilleurs-portefeuilles-bitcoin/cold-storage-bitcoin/` | Guide | P1 |
| 7 | `/bitcoin/meilleurs-portefeuilles-bitcoin/electrum/` | Guide | P1 |
| 8 | `/bitcoin/meilleurs-portefeuilles-bitcoin/multisig-bitcoin/` | Guide | P1 |
| 9 | `/bitcoin/meilleurs-portefeuilles-bitcoin/bitbox02/` | Guide | P2 |
| 10 | `/bitcoin/meilleurs-portefeuilles-bitcoin/jade-blockstream/` | Guide | P2 |
| 11 | `/bitcoin/meilleurs-portefeuilles-bitcoin/sparrow-wallet/` | Guide | P2 |
| 12 | `/bitcoin/meilleurs-portefeuilles-bitcoin/paper-wallet-bitcoin/` | Guide | P2 |

---

## Phase 7 — Minage Bitcoin

10 pages. Niche mais forte autorité thématique.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/miner-bitcoin/` | Hub (existant) | P0 |
| 2 | `/bitcoin/miner-bitcoin/nombre-bitcoin/` | Guide (existant) | P0 |
| 3 | `/bitcoin/miner-bitcoin/temps-bitcoin/` | Guide (existant) | P0 |
| 4 | `/bitcoin/miner-bitcoin/rentabilite-minage-bitcoin/` | Guide | P0 |
| 5 | `/bitcoin/miner-bitcoin/materiel-minage-bitcoin/` | Guide | P1 |
| 6 | `/bitcoin/miner-bitcoin/pool-minage-bitcoin/` | Guide | P1 |
| 7 | `/bitcoin/miner-bitcoin/hashrate-bitcoin/` | Guide | P1 |
| 8 | `/bitcoin/miner-bitcoin/consommation-energie-bitcoin/` | Guide | P1 |
| 9 | `/bitcoin/miner-bitcoin/minage-bitcoin-domicile/` | Guide | P2 |
| 10 | `/bitcoin/miner-bitcoin/minage-chauffage-bitcoin/` | Guide | P2 |
| 11 | `/bitcoin/miner-bitcoin/minage-cloud-bitcoin/` | Guide | P2 |

---

## Phase 8 — Sécurité Bitcoin

10 pages. Forte valeur ajoutée, rassure les investisseurs.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/securite-bitcoin/` | Hub | P0 |
| 2 | `/bitcoin/securite-bitcoin/proteger-ses-bitcoins/` | Guide | P0 |
| 3 | `/bitcoin/securite-bitcoin/arnaques-bitcoin/` | Guide | P0 |
| 4 | `/bitcoin/securite-bitcoin/seed-phrase-bitcoin/` | Guide | P0 |
| 5 | `/bitcoin/securite-bitcoin/bitcoin-hack/` | Guide (existant) | P1 |
| 6 | `/bitcoin/securite-bitcoin/phishing-bitcoin/` | Guide | P1 |
| 7 | `/bitcoin/securite-bitcoin/heritage-bitcoin/` | Guide | P1 |
| 8 | `/bitcoin/securite-bitcoin/recuperer-bitcoin-perdu/` | Guide | P2 |
| 9 | `/bitcoin/securite-bitcoin/attaque-51-pourcent/` | Guide | P2 |
| 10 | `/bitcoin/securite-bitcoin/coinjoin-bitcoin/` | Guide | P2 |

---

## Phase 9 — Investir Bitcoin

14 pages. Forte intention commerciale.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/investir-bitcoin/` | Hub | P0 |
| 2 | `/bitcoin/investir-bitcoin/bitcoin-vs-or/` | Guide | P0 |
| 3 | `/bitcoin/investir-bitcoin/bitcoin-vs-ethereum/` | Guide | P0 |
| 4 | `/bitcoin/investir-bitcoin/bitcoin-reserve-de-valeur/` | Guide | P0 |
| 5 | `/bitcoin/investir-bitcoin/cycles-bitcoin/` | Guide | P0 |
| 6 | `/bitcoin/investir-bitcoin/prediction-prix-bitcoin/` | Guide | P1 |
| 7 | `/bitcoin/investir-bitcoin/analyse-technique-bitcoin/` | Guide | P1 |
| 8 | `/bitcoin/investir-bitcoin/indicateurs-onchain-bitcoin/` | Guide | P1 |
| 9 | `/bitcoin/investir-bitcoin/bitcoin-inflation/` | Guide | P1 |
| 10 | `/bitcoin/investir-bitcoin/bitcoin-allocation-portefeuille/` | Guide | P1 |
| 11 | `/bitcoin/investir-bitcoin/bitcoin-vs-bourse/` | Guide | P2 |
| 12 | `/bitcoin/investir-bitcoin/bitcoin-vs-immobilier/` | Guide | P2 |
| 13 | `/bitcoin/investir-bitcoin/bitcoin-whales/` | Guide | P2 |
| 14 | `/bitcoin/investir-bitcoin/bitcoin-taux-interet/` | Guide | P2 |

---

## Phase 10 — Réglementation et fiscalité

8 pages. Contenu evergreen à forte valeur.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/reglementation-bitcoin/` | Hub | P0 |
| 2 | `/bitcoin/bitcoin-legal/` | Guide (existant) | P0 |
| 3 | `/bitcoin/fiscalite-bitcoin-france/` | Guide (existant) | P0 |
| 4 | `/bitcoin/reglementation-bitcoin/declarer-bitcoin-impots/` | Guide | P0 |
| 5 | `/bitcoin/legislation-bitcoin/` | Guide (existant) | P1 |
| 6 | `/bitcoin/reglementation-bitcoin/bitcoin-mica-europe/` | Guide | P1 |
| 7 | `/bitcoin/reglementation-bitcoin/bitcoin-kyc-aml/` | Guide | P2 |
| 8 | `/bitcoin/reglementation-bitcoin/bitcoin-amf/` | Guide | P2 |

---

## Phase 11 — Histoire et culture Bitcoin

14 pages. Storytelling, partageabilité, backlinks.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/histoire-bitcoin/` | Hub (existant → enrichi) | P0 |
| 2 | `/bitcoin/histoire-bitcoin/satoshi-nakamoto/` | Guide | P0 |
| 3 | `/bitcoin/histoire-bitcoin/bitcoin-pizza-day/` | Guide | P1 |
| 4 | `/bitcoin/histoire-bitcoin/mt-gox/` | Guide | P1 |
| 5 | `/bitcoin/histoire-bitcoin/silk-road-bitcoin/` | Guide | P1 |
| 6 | `/bitcoin/histoire-bitcoin/block-size-wars/` | Guide | P1 |
| 7 | `/bitcoin/histoire-bitcoin/bitcoin-el-salvador/` | Guide | P1 |
| 8 | `/bitcoin/histoire-bitcoin/bitcoin-etf-approbation/` | Guide | P1 |
| 9 | `/bitcoin/histoire-bitcoin/bitcoin-reserve-strategique-usa/` | Guide | P1 |
| 10 | `/bitcoin/histoire-bitcoin/bitcoin-adoption-mondiale/` | Guide | P2 |
| 11 | `/bitcoin/histoire-bitcoin/bitcoin-entreprises/` | Guide (existant) | P2 |
| 12 | `/bitcoin/histoire-bitcoin/china-ban-bitcoin/` | Guide | P2 |
| 13 | `/bitcoin/histoire-bitcoin/hodl-origine/` | Guide | P2 |
| 14 | `/bitcoin/histoire-bitcoin/bitcoin-maximalism/` | Guide | P2 |

---

## Phase 12 — Pages standalone

16 pages transversales.

| # | URL | Type | Priorité |
|---|-----|------|----------|
| 1 | `/bitcoin/bitcoin-dominance/` | Guide (existant) | P0 |
| 2 | `/bitcoin/bitcoin-valeur/` | Guide (existant) | P0 |
| 3 | `/bitcoin/bitcoin-control/` | Guide (existant) | P1 |
| 4 | `/bitcoin/fructifier-bitcoin/` | Guide (existant) | P1 |
| 5 | `/bitcoin/top-pays-bitcoin/` | Guide (existant) | P1 |
| 6 | `/bitcoin/bitcoin-environnement/` | Guide | P1 |
| 7 | `/bitcoin/bitcoin-anonyme/` | Guide | P1 |
| 8 | `/bitcoin/ordinals-bitcoin/` | Guide | P1 |
| 9 | `/bitcoin/bitcoin-defi/` | Guide | P1 |
| 10 | `/bitcoin/bitcoin-hyperinflation/` | Guide | P1 |
| 11 | `/bitcoin/bitcoin-et-banques/` | Guide | P2 |
| 12 | `/bitcoin/bitcoin-remittances/` | Guide | P2 |
| 13 | `/bitcoin/bitcoin-censure/` | Guide | P2 |
| 14 | `/bitcoin/bitcoin-et-intelligence-artificielle/` | Guide | P2 |
| 15 | `/bitcoin/bitcoin-et-retraite/` | Guide | P2 |
| 16 | `/bitcoin/bitcoin-assurance-vie/` | Guide | P2 |

---

## Résumé par priorité

| Priorité | Description | Pages | Objectif |
|----------|-------------|-------|----------|
| **P0** | Infrastructure + pages à fort trafic/conversion | ~45 | Fondations + quick wins SEO |
| **P1** | Pages à trafic moyen, complètent les branches | ~55 | Couverture thématique solide |
| **P2** | Pages longue traîne, niche, différenciantes | ~47 | Autorité totale sur Bitcoin |
| **Total** | | **147** | |

## Résumé technique

| Élément | Action |
|---------|--------|
| Collection `bitcoin` dans `content.config.ts` | Créer |
| Route `src/pages/bitcoin/[...slug].astro` | Créer |
| Gabarit Hub (hero + grille cards enfants) | Créer |
| Gabarit Guide (breadcrumb + TOC + frères/soeurs) | Créer |
| 147 fichiers markdown dans `src/content/bitcoin/` | Rédiger (via `/rediger-article`) |
| Images (logos + générées) | Par article |
| Maillage interne cocon ↔ silos existants | Via CrossLinks + autoLink |

## Convention fichiers markdown

Les fichiers suivent la hiérarchie URL :

```
src/content/bitcoin/
├── index.md                                    → /bitcoin/
├── acheter-bitcoin/
│   ├── index.md                                → /bitcoin/acheter-bitcoin/
│   ├── binance.md                              → /bitcoin/acheter-bitcoin/binance/
│   ├── coinbase.md                             → /bitcoin/acheter-bitcoin/coinbase/
│   ├── dca-bitcoin.md                          → /bitcoin/acheter-bitcoin/dca-bitcoin/
│   └── ...
├── comment-fonctionne-bitcoin/
│   ├── index.md                                → /bitcoin/comment-fonctionne-bitcoin/
│   ├── blockchain-bitcoin.md                   → /bitcoin/comment-fonctionne-bitcoin/blockchain-bitcoin/
│   └── ...
├── lightning-network-bitcoin/
│   ├── index.md                                → /bitcoin/lightning-network-bitcoin/
│   └── ...
├── meilleurs-portefeuilles-bitcoin/
│   ├── index.md
│   └── ...
├── miner-bitcoin/
│   ├── index.md
│   └── ...
├── securite-bitcoin/
│   ├── index.md
│   └── ...
├── investir-bitcoin/
│   ├── index.md
│   └── ...
├── reglementation-bitcoin/
│   ├── index.md
│   └── ...
├── vendre-bitcoin/
│   ├── index.md
│   └── ...
├── histoire-bitcoin/
│   ├── index.md
│   └── ...
├── bitcoin-debutant/
│   ├── index.md
│   └── ...
└── [standalone pages].md
```
