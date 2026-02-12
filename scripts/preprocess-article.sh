#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# preprocess-article.sh
# Preprocessing des donnees pour un article Bitcoin CryptoSous
#
# Appelle Tavily + Slashr + fal.ai, prepare les donnees dans
# /tmp/preprocess-{slug}/ pour utilisation par Claude Code.
#
# Usage: ./scripts/preprocess-article.sh <slug> <keyword> <branch> <parent> <order>
# Batch: ./scripts/preprocess-article.sh slug1 kw1 b1 p1 o1 & \
#        ./scripts/preprocess-article.sh slug2 kw2 b2 p2 o2 & wait
# ============================================================

if [ $# -lt 5 ]; then
    echo "Usage: $0 <slug> <keyword> <branch> <parent> <order>"
    echo ""
    echo "  slug     Slug de l'article (ex: dca-bitcoin)"
    echo "  keyword  Mot-cle SEO principal (ex: \"DCA bitcoin\")"
    echo "  branch   Branche du contenu (ex: investir)"
    echo "  parent   Slug du hub parent (ex: investir-bitcoin)"
    echo "  order    Ordre dans la branche (ex: 1)"
    exit 1
fi

SLUG="$1"
KEYWORD="$2"
BRANCH="$3"
PARENT="$4"
ORDER="$5"

# --- Paths ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SITE_DIR="$PROJECT_DIR/site"
IMAGE_DIR="$SITE_DIR/public/images/bitcoin"
IMAGE_PATH="$IMAGE_DIR/$SLUG.webp"
OUT="/tmp/preprocess-${SLUG}"

# --- Dependencies ---
for cmd in curl jq; do
    if ! command -v "$cmd" &>/dev/null; then
        echo "[$SLUG] Erreur: '$cmd' requis." >&2
        exit 1
    fi
done

# --- Environment ---
if [ ! -f "$SITE_DIR/.env" ]; then
    echo "[$SLUG] Erreur: $SITE_DIR/.env introuvable." >&2
    exit 1
fi
source "$SITE_DIR/.env"

# --- Setup ---
mkdir -p "$OUT" "$IMAGE_DIR"

echo "[$SLUG] Preprocessing..."

# ============================================================
# 1. TAVILY
# ============================================================
echo "[$SLUG]   Tavily..."
TAVILY_PAYLOAD=$(jq -n --arg q "$KEYWORD" --arg k "$TAVILY_API_KEY" \
    '{api_key: $k, query: $q, search_depth: "advanced", max_results: 5, include_answer: true}')
curl -s --max-time 30 -X POST "https://api.tavily.com/search" \
    -H "Content-Type: application/json" \
    -d "$TAVILY_PAYLOAD" \
    -o "$OUT/tavily.json" 2>/dev/null || echo '{}' > "$OUT/tavily.json"
echo "[$SLUG]   Tavily: $(jq -r '.results | length // 0' "$OUT/tavily.json" 2>/dev/null || echo 0) sources"

# ============================================================
# 2. BRIEF SEO SLASHR
# ============================================================
echo "[$SLUG]   Brief Slashr..."
BRIEF_PAYLOAD=$(jq -n --arg kw "$KEYWORD" \
    '{keyword: $kw, location: "France", language: "fr"}')
curl -s --max-time 60 -X POST "https://outils.agence-slashr.fr/brief-contenu/api/generate-brief" \
    -H "Content-Type: application/json" \
    -d "$BRIEF_PAYLOAD" \
    -o "$OUT/brief.json" 2>/dev/null || echo '{}' > "$OUT/brief.json"
BRIEF_WORDS=$(jq -r '.semanticData.recommended_words // 2500' "$OUT/brief.json" 2>/dev/null || echo 2500)
BRIEF_WORDS=$(echo "$BRIEF_WORDS" | grep -oE '^[0-9]+$' || echo 2500)
echo "[$SLUG]   Brief: $BRIEF_WORDS mots recommandes"

# ============================================================
# 3. IMAGE FAL.AI
# ============================================================
echo "[$SLUG]   Image fal.ai..."
IMAGE_PROMPT="no text, no letters, no numbers, no words. Dark atmospheric digital illustration with grain texture. Scene depicting ${KEYWORD}. Dark void background with golden and violet accent lighting. Asymmetric composition, concrete visual metaphor, cinematic mood."
FAL_PAYLOAD=$(jq -n --arg p "$IMAGE_PROMPT" \
    '{prompt: $p, image_size: "landscape_16_9", style: "digital_illustration", substyle: "grain", colors: [{r:4,g:6,b:12},{r:245,g:158,b:11},{r:139,g:92,b:246}]}')
IMAGE_URL=$(curl -s --max-time 60 -X POST "https://fal.run/fal-ai/recraft-20b" \
    -H "Authorization: Key $FAL_KEY" \
    -H "Content-Type: application/json" \
    -d "$FAL_PAYLOAD" 2>/dev/null | jq -r '.images[0].url // empty' 2>/dev/null || true)
IMAGE_OK="false"
if [ -n "$IMAGE_URL" ]; then
    curl -sL --max-time 30 "$IMAGE_URL" -o "$IMAGE_PATH" 2>/dev/null || true
    if [ -s "$IMAGE_PATH" ]; then
        IMAGE_OK="true"
        echo "[$SLUG]   Image: OK"
    else
        echo "[$SLUG]   Image: echec telechargement"
    fi
else
    echo "[$SLUG]   Image: echec generation"
fi

# ============================================================
# 4. PARENT HUB
# ============================================================
PARENT_HUB="$SITE_DIR/src/content/bitcoin/$PARENT/index.md"
if [ -f "$PARENT_HUB" ]; then
    cp "$PARENT_HUB" "$OUT/parent.md"
else
    echo "" > "$OUT/parent.md"
fi

# ============================================================
# 5. GENERER prompt-data.md (pret a lire par Claude Code)
# ============================================================
BRIEF_H1=$(jq -r '.contentPlan.h1 // empty' "$OUT/brief.json" 2>/dev/null || true)
BRIEF_META=$(jq -r '.seoMetadata.metaDescription // empty' "$OUT/brief.json" 2>/dev/null || true)
TITLE_LINE="${BRIEF_H1:-Titre SEO a ecrire}"
DESC_LINE="${BRIEF_META:-Description SEO ~155 caracteres}"
IMAGE_FM=""
[ "$IMAGE_OK" = "true" ] && IMAGE_FM="image: \"/images/bitcoin/$SLUG.webp\""

CONTENT_PATH="$SITE_DIR/src/content/bitcoin/$PARENT/$SLUG.md"

cat > "$OUT/prompt-data.md" <<DATAEOF
# Donnees preprocessees pour : $SLUG

## Fichier cible
$CONTENT_PATH

## Frontmatter suggere
---
title: "$TITLE_LINE"
description: "$DESC_LINE"
type: guide
branch: $BRANCH
parent: $PARENT
order: $ORDER
${IMAGE_FM}
readingTime: "A calculer"
---

## Brief SEO

Nombre de mots recommande : $BRIEF_WORDS

### Mots-cles obligatoires
$(jq -r '.semanticData.KW_obligatoires // "Non disponible"' "$OUT/brief.json" 2>/dev/null || echo "Non disponible")

### Mots-cles complementaires
$(jq -r '.semanticData.KW_complementaires // "Non disponible"' "$OUT/brief.json" 2>/dev/null || echo "Non disponible")

### Plan de contenu suggere
$(jq -r '.contentPlan.sections // "Non disponible"' "$OUT/brief.json" 2>/dev/null || echo "Non disponible")

## Recherche factuelle (Tavily)

### Synthese
$(jq -r '.answer // "Pas de synthese"' "$OUT/tavily.json" 2>/dev/null || echo "Non disponible")

### Sources
$(jq -r '.results[]? | "- \(.title) (\(.url))\n  \(.content[:500])\n"' "$OUT/tavily.json" 2>/dev/null || echo "Aucune source")

## Contenu du hub parent (ne pas repeter)
$(cat "$OUT/parent.md")
DATAEOF

echo "[$SLUG] OK -> $OUT/prompt-data.md"
