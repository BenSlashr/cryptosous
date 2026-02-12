#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# verify-articles.sh
# Verification qualite des articles Bitcoin CryptoSous
#
# Usage: ./scripts/verify-articles.sh <slug1> [slug2] [slug3] ...
#        ./scripts/verify-articles.sh --all
#        ./scripts/verify-articles.sh --all --build
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SITE_DIR="$PROJECT_DIR/site"
CONTENT_DIR="$SITE_DIR/src/content/bitcoin"
RUN_BUILD=false

# --- Parse args ---
SLUGS=()
for arg in "$@"; do
    if [ "$arg" = "--build" ]; then
        RUN_BUILD=true
    elif [ "$arg" = "--all" ]; then
        while IFS= read -r f; do
            [ -n "$f" ] && SLUGS+=("$(basename "$f" .md)")
        done < <(find "$CONTENT_DIR" -name "*.md" ! -name "index.md" -type f 2>/dev/null)
    else
        SLUGS+=("$arg")
    fi
done

if [ ${#SLUGS[@]} -eq 0 ]; then
    echo "Usage: $0 <slug1> [slug2] ... [--build]"
    echo "       $0 --all [--build]"
    echo ""
    echo "  --all    Verifie tous les articles (hors index.md)"
    echo "  --build  Lance aussi le build Astro a la fin"
    exit 1
fi

# --- Patterns ---
FORBIDDEN='crucial|fondamental|primordial|incontournable|néanmoins|toutefois|dorénavant|dès lors|il convient de|captivant|fascinant|révolutionnaire|novateur|époustouflant|majestueux|remarquable|exceptionnel|inégalé|indéniablement|assurément|indubitablement|incontestablement|véritablement|considérablement|substantiellement|pléthore|myriade|subséquent|tapisserie|pierre angulaire|fer de lance|exacerber|appréhender|corroborer|éluder|entraver|préconiser|prôner|stipuler|soulignons que|notons que|mentionnons que'
BAD_PATTERN="[—–$(printf '\xe2\x80\x98\xe2\x80\x99\xe2\x80\x9c\xe2\x80\x9d')…]"

# --- Header ---
printf "%-35s %6s %5s %4s %4s %5s  %s\n" "Article" "Mots" "Acc" "Int" "Typo" "Call" "Statut"
printf "%-35s %6s %5s %4s %4s %5s  %s\n" "---" "----" "---" "---" "----" "----" "------"

TOTAL_ERRORS=0

for SLUG in "${SLUGS[@]}"; do
    # Find file
    FILEPATH=$(find "$CONTENT_DIR" -name "$SLUG.md" -type f 2>/dev/null | head -1)
    if [ -z "$FILEPATH" ]; then
        printf "%-35s %6s %5s %4s %4s %5s  %s\n" "$SLUG" "-" "-" "-" "-" "-" "INTROUVABLE"
        TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
        continue
    fi

    # Metrics
    WORDS=$(awk 'BEGIN{c=0} /^---$/{c++; next} c>=2{print}' "$FILEPATH" | wc -w | tr -d ' ') || WORDS=0
    ACCENTS=$(grep -o '[éèêëàâùûîïôçÉÈÊËÀÂÙÛÎÏÔÇ]' "$FILEPATH" | wc -l | tr -d ' ') || ACCENTS=0
    INTERDIT=$(grep -ciE "$FORBIDDEN" "$FILEPATH") || INTERDIT=0
    TYPO=$(grep -c "$BAD_PATTERN" "$FILEPATH") || TYPO=0
    CALLOUTS=$(grep -c '> \[!' "$FILEPATH") || CALLOUTS=0

    # Status
    ERRORS=0
    ISSUES=""
    [ "$ACCENTS" -lt 50 ] && ERRORS=$((ERRORS+1)) && ISSUES="${ISSUES}acc "
    [ "$INTERDIT" -gt 0 ] && ERRORS=$((ERRORS+1)) && ISSUES="${ISSUES}mots "
    [ "$TYPO" -gt 0 ] && ERRORS=$((ERRORS+1)) && ISSUES="${ISSUES}typo "
    [ "$CALLOUTS" -lt 3 ] && ERRORS=$((ERRORS+1)) && ISSUES="${ISSUES}call< "
    [ "$CALLOUTS" -gt 5 ] && ISSUES="${ISSUES}call> "
    [ "$WORDS" -gt 3000 ] && ISSUES="${ISSUES}long "
    if ! head -1 "$FILEPATH" | grep -q '^---'; then
        ERRORS=$((ERRORS+1)) && ISSUES="${ISSUES}fm "
    fi

    if [ "$ERRORS" -gt 0 ]; then
        STATUS="ERR: ${ISSUES}"
        TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
    elif [ -n "$ISSUES" ]; then
        STATUS="WARN: ${ISSUES}"
    else
        STATUS="OK"
    fi

    printf "%-35s %6s %5s %4s %4s %5s  %s\n" "$SLUG" "$WORDS" "$ACCENTS" "$INTERDIT" "$TYPO" "$CALLOUTS" "$STATUS"
done

# --- Detail des mots interdits ---
echo ""
HAS_VIOLATIONS=false
for SLUG in "${SLUGS[@]}"; do
    FILEPATH=$(find "$CONTENT_DIR" -name "$SLUG.md" -type f 2>/dev/null | head -1)
    [ -z "$FILEPATH" ] && continue
    VIOLS=$(grep -niE "$FORBIDDEN" "$FILEPATH" 2>/dev/null || true)
    if [ -n "$VIOLS" ]; then
        HAS_VIOLATIONS=true
        echo "--- $SLUG : mots interdits ---"
        echo "$VIOLS" | head -5
        echo ""
    fi
done
$HAS_VIOLATIONS || echo "Aucun mot interdit detecte."

# --- Build ---
if [ "$RUN_BUILD" = true ]; then
    echo ""
    echo "Build Astro..."
    if BUILD_OUTPUT=$(cd "$SITE_DIR" && npm run build 2>&1); then
        echo "Build: OK"
    else
        echo "Build: ECHEC"
        echo "$BUILD_OUTPUT" | tail -5
        TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
    fi
fi

# --- Resume ---
echo ""
if [ "$TOTAL_ERRORS" -gt 0 ]; then
    echo "=== $TOTAL_ERRORS article(s) avec erreurs ==="
    exit 1
else
    echo "=== ${#SLUGS[@]} article(s) verifies ==="
fi
