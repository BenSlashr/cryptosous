# CryptoSous - Roadmap Outils

## Phase 1 : Outils fiscaux (Q1 2026)

### 1.1 Calculateur fiscal crypto France ✅ FAIT
- **Page** : `/outils/calculateur-fiscal`
- **Livre** :
  - Saisie manuelle acquisitions + cessions
  - Import CSV (Binance, Coinbase, Kraken, Bybit, Bitpanda, Crypto.com, Ledger Live) avec detection auto
  - Calcul PMPA conforme article 150 VH bis du CGI
  - Annee fiscale 2025 (PFU 30%) et 2026 (PFU 31,4%)
  - Seuil exoneration 305 EUR
  - Detail pas-a-pas de chaque cession (pedagogie)
  - Graphique SVG evolution du PTA
  - Export PDF recapitulatif
  - 100% client-side, zero donnee envoyee
- **Reste a faire** :
  - Tests E2E automatises

### 1.2 Comparateur PFU vs Bareme progressif ✅ FAIT
- Integre au calculateur fiscal
- Input : revenu fiscal de reference + nombre de parts
- Output : montant exact dans chaque regime + badge "avantageux"
- Tranches IR 2025 et 2026

---

## Phase 2 : Outils interactifs (Q2 2026)

### 2.1 Glossaire contextuel inline (tooltips) ✅ FAIT
- **Impact SEO** : Fort (temps sur page, taux de rebond)
- **Effort** : Faible (plugin rehype custom)
- **Livre** :
  - Plugin rehype build-time (`src/plugins/rehype-glossaire-tooltip.ts`)
  - Dictionnaire partage 20 termes avec variations (`src/data/glossaire-terms.ts`)
  - Tooltip CSS-only au hover (underline dote gold, popup definition + lien glossaire)
  - Premiere occurrence uniquement par terme, max 8 tooltips par page
  - Self-reference : un terme n'est pas tooltip sur sa propre page glossaire
  - Skip headings, liens, code, pre, SVG
  - Mobile responsive (tooltip en dessous sur petit ecran)
  - Refactor `internal-links.ts` : autoLink() utilise le meme dictionnaire
  - Zero JS client, zero impact sur le bundle

### 2.2 Arbre de decision interactif
- "Quelle plateforme choisir ?" - questionnaire en 5 etapes
- "Quel wallet pour moi ?" - idem
- Composant React reutilisable type flowchart
- Resultat personnalise avec lien vers l'avis detaille
- Plus engageant qu'un tableau comparatif statique

### 2.3 Timeline blockchain interactive ✅ FAIT
- **Page** : `/outils/timeline-bitcoin`
- **Livre** :
  - Composant React island (SVG pur, zero dependance charting)
  - 40 evenements cles de 2008 a 2025, 6 categories (halvings, crises, adoption, regulation, innovation, jalons)
  - Courbe prix BTC en overlay (echelle logarithmique, ~115 points mensuels)
  - Drag pour panner, scroll pour zoomer, Pointer Events API (mouse + touch)
  - 5 presets d'eres (Tout, 2008-12, 2013-16, 2017-20, 2021-25)
  - Filtres par categorie (pills toggleables)
  - Clic sur evenement → carte detail avec lien vers article histoire-bitcoin
  - Tooltip au hover, keyboard navigation (fleches, +/-, Tab)
  - Collision stagger pour evenements proches
  - 100% client-side, donnees statiques, zero API
  - FAQ 6 questions + Schema.org FAQPage

---

## Phase 3 : Data & signaux (Q3 2026)

### 3.1 Indice Fear & Greed CryptoSous
- Indice proprietaire affiche dans le MarketBar
- Agregation : Fear & Greed Index API + Google Trends FR + volumes EUR
- Donne une raison de revenir chaque jour
- Unique en francais

### 3.2 Carte de chaleur fiscale mondiale ✅ FAIT
- **Page** : `/outils/carte-fiscalite-crypto-monde`
- **Livre** :
  - Carte interactive React (composant TaxWorldMap, SVG monde 110m)
  - 50 pays avec regime fiscal detaille (flat tax, exoneration, progressif)
  - Clic pays → detail complet (taux, conditions, notes)
  - Comparaison jusqu'a 4 pays cote a cote
  - Recherche + filtre par regime
  - Legende couleur par type de regime
  - FAQ 6 questions + Schema.org FAQPage
  - Contenu SEO 4 sections

### 3.3 Simulateur "What If" scenarios macro
- Sliders interactifs : impact halving, taux Fed, adoption ETF
- Comparaison avec scenarios historiques reels
- Tres partageable sur les reseaux (captures de resultats)

---

## Phase 4 : Transparence & confiance (Q4 2026)

### 4.1 Comparateur de frais reels (pas theoriques)
- Simule un achat de X EUR de BTC sur chaque plateforme
- Inclut : spread reel, frais depot EUR, frais retrait BTC, frais reseau
- Montre le cout total reel et le montant de BTC reellement recu
- Personne ne fait ca de maniere transparente

### 4.2 Alertes on-chain vulgarisees
- Widget "fil d'actualite on-chain" en francais
- Traduction des mouvements whale en phrases simples
- Integration Whale Alert / Arkham API
- Format unique en francais

---

## Phase 5 : Ecosystem (2027)

### 5.1 API publique CryptoSous
- Exposer les donnees structurees (reviews, comparatifs, quiz)
- Genere des backlinks naturels
- Monetisable a terme (freemium)

### 5.2 PWA + notifications
- Progressive Web App pour l'experience mobile
- Push notifications sur alertes prix / mouvements on-chain

---

## Priorites

| # | Feature | Impact SEO | Effort | Differentiation | Statut |
|---|---------|-----------|--------|-----------------|--------|
| 1 | Calculateur fiscal France | +++ | Moyen | +++ | ✅ FAIT |
| 2 | Comparateur PFU vs Bareme | ++ | Faible | +++ | ✅ FAIT |
| 3 | Glossaire contextuel inline | ++ | Faible | ++ | ✅ FAIT |
| 4 | Arbre de decision | + | Moyen | ++ | A faire |
| 5 | Timeline interactive | + | Moyen | ++ | ✅ FAIT |
| 6 | Indice Fear & Greed | ++ | Moyen | +++ | A faire |
| 7 | Carte fiscale mondiale | ++ | Moyen | +++ | ✅ FAIT |
| 8 | Simulateur What If | + | Eleve | +++ | A faire |
| 9 | Comparateur frais reels | ++ | Moyen | +++ | A faire |
| 10 | Alertes on-chain FR | ++ | Eleve | +++ | A faire |
