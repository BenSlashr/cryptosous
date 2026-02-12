# CryptoSous - Instructions projet

## Stack
- Astro 5 + React islands + Tailwind 4
- Dossier projet : `site/`
- Build : `cd site && npm run build`

## Guidelines de redaction de contenu

### Workflow obligatoire pour chaque article

**Etape 1 : Preprocessing (script bash)**

Lancer le script de preprocessing qui appelle les APIs (Tavily, Slashr, fal.ai) et prepare les donnees :

```bash
./scripts/preprocess-article.sh <slug> <keyword> <branch> <parent> <order>
```

Parametres :
- `slug` : identifiant URL de l'article (ex: `dca-bitcoin`)
- `keyword` : mot-cle SEO principal (ex: `"DCA bitcoin strategie"`)
- `branch` : branche du contenu (ex: `investir`)
- `parent` : slug du hub parent (ex: `investir-bitcoin`)
- `order` : ordre dans la branche (ex: `1`)

Le script genere `/tmp/preprocess-{slug}/prompt-data.md` qui contient :
- Brief SEO Slashr (mots-cles obligatoires, complementaires, plan de contenu, nombre de mots)
- Recherche factuelle Tavily (synthese, sources, chiffres)
- Frontmatter suggere (title, description, image)
- Contenu du hub parent (pour eviter les repetitions)

Le plan de contenu du brief est une base de depart : ajouter des sections supplementaires si le sujet le justifie, si la recherche Tavily revele des angles non couverts, ou si l'expertise du redacteur le permet.

Plusieurs articles peuvent etre preprocesses en parallele :
```bash
./scripts/preprocess-article.sh slug1 kw1 branch1 parent1 1 &
./scripts/preprocess-article.sh slug2 kw2 branch2 parent2 2 &
wait
```

**Structure des fichiers et frontmatter**

Chemin : `site/src/content/bitcoin/{branch-slug}/{article-slug}.md`
Images : `site/public/images/bitcoin/{article-slug}.webp`

Frontmatter obligatoire :
```yaml
---
title: "Titre SEO de l'article"
description: "Meta description 150-160 caracteres"
type: guide          # guide (article) ou hub (page de branche)
branch: investir     # branche parente (acheter, vendre, fonctionnement, etc.)
parent: investir-bitcoin  # slug du hub parent
order: 3             # ordre d'affichage dans la branche
image: "/images/bitcoin/{slug}.webp"
readingTime: "12 min"
faqSchema: true      # optionnel, active le schema FAQ si l'article a une section FAQ
---
```

**Etape 2 : Rediger en lisant les donnees preprocessees**

Lire `/tmp/preprocess-{slug}/prompt-data.md` puis rediger l'article en suivant les patterns anti-IA ci-dessous.

**Nombre de mots cible : 2000 a 2800 mots.** En dessous de 2000, l'article manque de profondeur. Au dessus de 2800, ca devient difficile a lire.

**REGLE CRITIQUE : TOUJOURS ecrire avec les accents francais** (e, e, e, a, u, c, i, o, u). Un article sans accents est un article a refaire. Les seuls caracteres typographiques bannis sont les guillemets/apostrophes/tirets typographiques (voir ci-dessous), PAS les accents.

**Etape 3 : Ajouter des callouts (blocs enrichis)**

Chaque article doit contenir 3 a 5 callouts au format GitHub Alerts pour enrichir l'experience de lecture. Syntaxe markdown :

```markdown
> [!TIP]
> Texte du conseil ici. Maximum 1 a 3 phrases.
```

Types disponibles et usage :

| Type | Usage | Couleur |
|------|-------|---------|
| `[!TIP]` | Conseil pratique, astuce concrete | Or (gold) |
| `[!NOTE]` | Bon a savoir, info complementaire | Bleu |
| `[!WARNING]` | Mise en garde, attention | Orange |
| `[!CAUTION]` | Danger, risque important | Rouge |
| `[!IMPORTANT]` | Point cle a retenir absolument | Violet |

Regles pour les callouts :
- 3 a 5 par article, pas plus (sinon ca dilue l'impact)
- Mixer au moins 2 types differents par article
- Placer aux points de rupture naturels (entre sections, apres un paragraphe cle)
- 1 a 3 phrases max par callout - dense en information
- Jamais de fluff ou de reformulation du paragraphe precedent
- Chaque callout doit apporter une info actionnable ou un fait nouveau

**Etape 3b : Ajouter des diagrammes Mermaid**

Chaque article doit contenir 1 a 3 diagrammes Mermaid pour illustrer les concepts. Un article de 2500 mots sans schema est dur a lire.

Types de diagrammes adaptes :
- `graph TD` ou `graph LR` : flux, processus, hierarchies
- `sequenceDiagram` : interactions entre acteurs
- `pie` : repartitions, parts de marche
- `timeline` : chronologies (articles historiques)

Palette obligatoire (design system CryptoSous) :
```
style NODE fill:#141D30,stroke:#F59E0B,color:#F1F5F9   (noeud principal - or)
style NODE fill:#141D30,stroke:#8B5CF6,color:#F1F5F9   (noeud secondaire - violet)
style NODE fill:#1A2540,stroke:#8B5CF6,color:#F1F5F9   (noeud central - violet fonce)
style NODE fill:#0E1525,stroke:#94A3B8,color:#94A3B8   (noeud tertiaire - gris)
```

Regles :
- 1 a 3 diagrammes par article, places aux points ou un visuel aide a la comprehension
- TOUJOURS appliquer les styles de la palette sur CHAQUE noeud
- TOUJOURS utiliser les accents francais dans les labels des noeuds
- Labels entre guillemets doubles : `A["Texte avec accents"]`
- Pas de diagrammes decoratifs - chaque schema doit apporter de l'information

Exemple :
```markdown
` ` `mermaid
graph TD
    A["Etape 1 : Achat"] --> B["Etape 2 : Stockage"]
    B --> C["Etape 3 : Securisation"]
    style A fill:#141D30,stroke:#F59E0B,color:#F1F5F9
    style B fill:#141D30,stroke:#8B5CF6,color:#F1F5F9
    style C fill:#141D30,stroke:#F59E0B,color:#F1F5F9
` ` `
```

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

### Etape 4 : Verification qualite (script bash)

Apres la redaction, lancer le script de verification :

```bash
# Verifier un ou plusieurs articles
./scripts/verify-articles.sh <slug1> [slug2] [slug3]

# Verifier tous les articles
./scripts/verify-articles.sh --all

# Verifier + lancer le build Astro
./scripts/verify-articles.sh --all --build
```

Le script verifie automatiquement :
- **Accents** : minimum 50 caracteres accentues (sinon l'article est probablement sans accents)
- **Mots interdits** : 0 tolerance, affiche les lignes en infraction
- **Caracteres typo** : tirets cadratins, apostrophes typographiques, guillemets courbes
- **Callouts** : entre 3 et 5 par article
- **Longueur** : alerte si > 3000 mots
- **Frontmatter** : presence du bloc `---`
- **Build** : compilation Astro (avec `--build`)

Corriger toute erreur signalee avant de considerer l'article comme termine.

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
