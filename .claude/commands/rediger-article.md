# Rediger un article SEO pour CryptoSous

Mot-cle cible : $ARGUMENTS

## Workflow complet

### 1. Brief SEO (obligatoire)

Appeler l'API Slashr pour obtenir l'analyse semantique :

```bash
curl -s -X POST "https://outils.agence-slashr.fr/brief-contenu/api/generate-brief" \
  -H "Content-Type: application/json" \
  -d '{"keyword": "$ARGUMENTS", "location": "France", "language": "fr"}'
```

Extraire du brief :
- `semanticData.KW_obligatoires` : mots-cles + frequences cibles (RESPECTER les frequences)
- `semanticData.KW_complementaires` : mots-cles secondaires
- `semanticData.recommended_words` : nombre de mots vise
- `serpData.organicResults[].headingStructure` : structure Hn des concurrents (s'en inspirer)
- `contentPlan.sections` : plan H2/H3 suggere
- `contentPlan.h1` : titre suggere

### 2. Image hero (obligatoire)

**Determiner le type d'image** :
- Article sur une marque/crypto/plateforme/wallet → telecharger le **logo officiel** (CoinGecko, site officiel), sauver dans `site/public/images/logos/`
- Article thematique/editorial → **generer via Recraft V3** (voir ci-dessous)

**Generation Recraft V3** (articles thematiques uniquement) :

```bash
curl -s -X POST "https://fal.run/fal-ai/recraft-20b" \
  -H "Authorization: Key b75e640c-6105-4620-919d-529854a5bf2c:cb43ec0eb051caf4dde3742499c49a57" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"no text, no letters, no numbers, no words - [SCENE CONCRETE ICI]","image_size":"landscape_16_9","style":"digital_illustration","substyle":"[SUBSTYLE]","colors":[{"r":4,"g":6,"b":12},{"r":245,"g":158,"b":11},{"r":139,"g":92,"b":246}]}'
```

**Choix du substyle** :
- Articles tech/blockchain → `grain` (scenes conceptuelles, metaphores visuelles)
- Guides/tutoriels → `2d_art_poster` (minimaliste, flat design)
- Opinion/edito → `grain` (atmospherique, moody)

**Regles prompt** :
- Decrire une SCENE concrete, pas un concept abstrait
- Bien : "aerial view of a dark circuit board where golden traces morph into rivers through a forest"
- Mal : "interconnected blockchain nodes forming a network" (rendu IA generique)

Telecharger l'image : `curl -o site/public/images/blog/{slug}.webp "[URL]"`

### 3. Redaction

**Creer le fichier** : `site/src/content/blog/{slug}.md`

**Frontmatter** :
```yaml
---
title: "Titre avec accents"
description: "Meta description ~155 caracteres"
pubDate: YYYY-MM-DD
category: "blockchain"
author: "CryptoSous"
readingTime: "X min"
image: "/images/blog/{slug}.webp"
---
```

**Regles critiques** :

1. **ACCENTS FRANCAIS OBLIGATOIRES** : é, è, ê, à, ù, ç, î, ô, û. Un article sans accents est a REFAIRE.

2. **Caracteres typographiques** : apostrophes droites ('), guillemets droits ("), tirets simples (-). Les ACCENTS sur les voyelles sont OBLIGATOIRES, seuls les caracteres typographiques speciaux sont bannis.

3. **Mots-cles** : respecter les frequences du brief. Verifier en fin de redaction.

4. **Liens internes** : integrer naturellement dans le texte markdown :
   - Vers `/glossaire/{slug}` pour les termes techniques (blockchain, proof-of-stake, staking, defi, etc.)
   - Vers `/prix/{crypto}` quand on mentionne une crypto specifique (bitcoin, ethereum, cardano, solana...)
   - Vers `/plateformes/{slug}` quand on mentionne un exchange
   - Vers `/wallets/{slug}` quand on mentionne un wallet
   - Format : `[texte visible](/chemin)`

5. **Mots interdits (~100)** : crucial, fondamental, primordial, indispensable, incontournable, captivant, fascinant, essentiel, revolutionnaire, novateur, epoustouflant, majestueux, impressionnant, remarquable, exceptionnel, indeniablement, assurement, veritablement, considerablement, plethore, myriade, phare, tournant, fer de lance, pierre angulaire, temoignage, heritage, exacerber, apprehender, corroborer, preconiser, proner, stipuler, soulignons, notons, mentionnons, il faut souligner/noter/mentionner, il est a noter, dorenavant, des lors, il convient de

6. **Connecteurs** : max 1 par article parmi : de plus, en outre, par consequent, neanmoins, toutefois, cependant, ainsi, en effet. Alternatives : aussi, et puis, mais, pourtant, donc, du coup.

7. **Patterns fluff a eviter** :
   - "voyons maintenant", "passons a", "interessons-nous a", "examinons"
   - "comme nous l'avons mentionne", "dans cette section"
   - "il existe de nombreuses facons de", "plusieurs facteurs entrent en jeu"
   - "il est a noter que", "notons/soulignons/precisons que"
   - "tres/vraiment important/essentiel"
   - "joue un role tres important"

8. **Structures a eviter** :
   - Parallelisme negatif : "Ce n'est pas X, c'est Y"
   - Participe present en fin de phrase : ", permettant de...", ", offrant..."
   - Flatterie : "vraiment remarquable", "un fascinant voyage"

### 4. Verification (obligatoire avant livraison)

Avant de livrer l'article, verifier :
- [ ] Tous les accents francais sont presents (é, è, ê, à, ç, etc.)
- [ ] Aucun mot interdit dans le texte
- [ ] Max 1 connecteur de la liste limitee
- [ ] Zero pattern fluff/remplissage
- [ ] Nombre de mots proche de la cible du brief
- [ ] Mots-cles obligatoires presents aux frequences cibles
- [ ] Liens internes vers glossaire/prix/plateformes integres
- [ ] Image hero presente et referencee dans le frontmatter
- [ ] Frontmatter complet (title, description, pubDate, category, author, readingTime, image)
- [ ] Apostrophes droites (') pas typographiques (')
- [ ] Guillemets droits (") pas typographiques ("")
- [ ] Build OK (`cd site && npm run build`)
