# CryptoSous - Instructions projet

## Stack
- Astro 5 + React islands + Tailwind 4
- Dossier projet : `site/`
- Build : `cd site && npm run build`

## Guidelines de redaction de contenu

### Workflow obligatoire pour chaque article

**Etape 1 : Generer un brief SEO via l'API Slashr**

Avant de rediger tout contenu, appeler l'API brief pour obtenir l'analyse semantique SERP, le plan de contenu et les mots-cles obligatoires :

```bash
curl -s -X POST "https://outils.agence-slashr.fr/brief-contenu/api/generate-brief" \
  -H "Content-Type: application/json" \
  -d '{"keyword": "MOT_CLE_PRINCIPAL", "location": "France", "language": "fr"}' \
  | jq .
```

La reponse contient :
- `semanticData.KW_obligatoires` : mots-cles a integrer obligatoirement (avec frequences cibles)
- `semanticData.KW_complementaires` : mots-cles secondaires a integrer si pertinent
- `semanticData.recommended_words` : nombre de mots recommande
- `serpData.organicResults` : top 10 SERP avec structure Hn des concurrents
- `contentPlan.sections` : plan de contenu suggere avec H2/H3
- `contentPlan.h1` : titre H1 suggere
- `contentAnalysis.writingStyle` : ton et style recommandes
- `seoMetadata` : slug, title, metaDescription suggeres

**Etape 2 : Generer l'image hero de l'article**

Chaque article DOIT avoir une image hero. Utiliser l'API fal.ai (voir section "Generation d'images" ci-dessous). Sauvegarder dans `site/public/images/blog/{slug}.webp` et referencer dans le frontmatter : `image: "/images/blog/{slug}.webp"`.

**Etape 3 : Rediger en suivant le brief + les patterns anti-IA**

**REGLE CRITIQUE : TOUJOURS ecrire avec les accents francais** (e, e, e, a, u, c, i, o, u). Un article sans accents est un article a refaire. Les seuls caracteres typographiques bannis sont les guillemets/apostrophes/tirets typographiques (voir ci-dessous), PAS les accents.

### Patterns anti-detection IA

#### Caracteres typographiques bannis
- Tiret cadratin/demi-cadratin (— –) → tiret simple (-)
- Apostrophe typographique (') → apostrophe droite (')
- Guillemets typographiques (" ") → guillemets droits (")
- Tiret insecable, points de suspension unicode → equivalents ASCII

#### Mots interdits (~100)
de plus, en outre, par consequent, neanmoins, toutefois, dorenavant, des lors, il convient de,
crucial/e/aux, fondamental/e/aux, primordial/e/aux, indispensable/s, incontournable/s,
captivant/e/s, fascinant/e/s, majeur/e/s, essentiel/le/s, revolutionnaire/s, novateur/trice/s,
epoustouflant/e/s, majestueux/se, impressionnant/e, remarquable/s, exceptionnel/le/s,
inegale/e, indeniablement, assurement, indubitablement, incontestablement, manifestement,
veritablement, considerablement, substantiellement, profondement, plethore, myriade,
subsequent/e/s, tapisserie, phare, tournant, fer de lance, pierre angulaire, temoignage,
heritage, exacerber, apprehender, corroborer, eluder, entraver, pallier, preconiser, proner,
stipuler, soulignons, notons, mentionnons, il faut souligner/noter/mentionner,
il est a noter, on peut noter, notons egalement

#### Connecteurs limites (max 1 par article)
de plus, en outre, par consequent, neanmoins, toutefois, cependant, ainsi, en effet

#### Patterns de remplissage (fluff) a eviter
- "voyons maintenant", "passons a", "interessons-nous a", "examinons", "penchons-nous sur"
- "comme nous l'avons mentionne precedemment"
- "nous allons maintenant voir/etudier/analyser"
- "dans cette section/partie/chapitre"
- "il existe de nombreuses facons de"
- "plusieurs facteurs entrent en jeu"
- "c'est une question importante"
- "en resume de cette section", "nous avons vu que", "ce qu'il faut retenir"
- "il est a noter que", "il faut savoir/noter/souligner que"
- "notons/signalons/rappelons/precisons/soulignons que"

#### Patterns faible densite informationnelle a eviter
- "tres/vraiment important/essentiel/fondamental/crucial"
- "joue un role tres important/essentiel/cle"
- "a une grande importance"
- "merite toute notre attention"
- "ne doit pas etre neglige"

#### Parallelisme negatif (a eviter)
- "Ce n'est pas X, c'est Y"
- "Il ne s'agit pas X, il s'agit Y"

#### Participes presents en fin de phrase (a eviter)
- ", soulignant/mettant en evidence/refletant/demontrant/illustrant/assurant..."
- ", permettant/offrant/creant/rendant..."

#### Patterns de flatterie (a eviter)
- "vraiment/reellement/absolument remarquable/extraordinaire/exceptionnel"
- "un fascinant voyage/exploration"

#### Alternatives recommandees
- de plus → aussi, et puis, en plus
- en outre → aussi, par ailleurs
- par consequent → donc, du coup, resultat
- neanmoins/toutefois → mais, pourtant
- crucial → important, cle, central
- fondamental → de base, premier
- incontournable → important, a connaitre
- revolutionnaire → nouveau, different, innovant
- exceptionnel → rare, particulier, notable
- preconiser → recommander, conseiller, suggerer
- apprehender → comprendre, saisir, aborder
- corroborer → confirmer, appuyer, soutenir
- plethore/myriade → beaucoup, quantite, masse
- en conclusion/en resume → supprimer
- "il est important de noter" → supprimer
- "temoigne de" → montre, prouve
- "joue un role crucial" → est important pour, compte pour

## Generation d'images - Recraft V3 via fal.ai

### API
- **Endpoint** : `POST https://fal.run/fal-ai/recraft-20b`
- **Auth** : Header `Authorization: Key $FAL_KEY` (cle dans `site/.env`)
- **Cout** : ~$0.022/image (realiste), ~$0.044 (vector)

### Appel type

```bash
source site/.env && curl -s -X POST "https://fal.run/fal-ai/recraft-20b" \
  -H "Authorization: Key $FAL_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Description de l image ici",
    "image_size": "landscape_16_9",
    "style": "digital_illustration"
  }' | jq '.images[0].url'
```

### Reponse
```json
{
  "images": [{ "url": "https://...", "content_type": "image/png", "file_size": 123456 }]
}
```

### Strategie image par type de contenu

| Type d'article | Source image |
|---|---|
| Crypto specifique (Bitcoin, Ethereum...) | **Logo officiel** de la crypto (CoinGecko, site officiel) |
| Avis plateforme (Coinbase, Binance...) | **Logo officiel** de la plateforme |
| Avis wallet (Ledger, Trezor...) | **Logo/photo officielle** du produit |
| Article thematique/editorial | **Image generee** via Recraft V3 (voir ci-dessous) |

Pour les logos : les telecharger en haute qualite (SVG ou PNG transparent), les stocker dans `site/public/images/logos/`. Ne JAMAIS generer un logo avec l'IA.

### Charte visuelle CryptoSous - Images generees (articles thematiques uniquement)

**Regles strictes** :
- **JAMAIS de texte** sur les images (pas de labels, pas de titres, pas de chiffres)
- **Palette sombre** coherente avec le design system (fonds noirs/bleu nuit, accents dores/violets)
- **Couleurs a passer** : `"colors": [{"r": 4, "g": 6, "b": 12}, {"r": 245, "g": 158, "b": 11}, {"r": 139, "g": 92, "b": 246}]` (void + gold + violet)
- **Pas de photos realistes** de personnes
- **Coherence visuelle** : meme palette, meme niveau de detail entre toutes les images
- **Format** : `landscape_16_9` pour les headers d'articles, `square_hd` pour les thumbnails/cartes
- **Eviter le look "IA generique"** : preferer des scenes concretes et des compositions asymetriques plutot que des patterns symetriques abstraits avec des noeuds/cubes flottants

### Sous-styles par type de contenu

Le style et le substyle doivent s'adapter au sujet de l'article :

| Type de contenu | Style | Substyle | Approche |
|----------------|-------|----------|----------|
| Articles tech/blockchain | `digital_illustration` | `grain` | Scenes conceptuelles (circuit→nature, vues aeriennes, metaphores visuelles) |
| Guides/tutoriels | `digital_illustration` | `2d_art_poster` | Compositions minimalistes, flat design, espace negatif |
| Avis plateformes (Coinbase, etc.) | `digital_illustration` | `hand_drawn` | Mise en scene de l'interface/UX, atmosphere urbaine/moderne |
| Avis wallets | `digital_illustration` | `hand_drawn` | Objet physique stylise, securite, coffre-fort |
| Articles opinion/edito | `digital_illustration` | `grain` | Atmospherique, moody, cinematique |

### Tailles recommandees
| Usage | Format | Taille |
|-------|--------|--------|
| Header article/page | `landscape_16_9` | 1920x1080 |
| Carte/thumbnail | `square_hd` | 1024x1024 |
| OG image | `landscape_4_3` | 1200x900 |

### Prompt template
Pour garantir la coherence palette, toujours inclure dans le prompt :
> "no text, no letters, no numbers, no words"

Et toujours passer le parametre `colors` avec la palette void/gold/violet.

**Ecrire des prompts concrets** qui decrivent une scene, pas des concepts abstraits :
- Bien : "aerial view of a dark circuit board where golden traces morph into river tributaries through a night forest"
- Mal : "interconnected blockchain nodes forming a decentralized network" (trop generique → rendu IA)
