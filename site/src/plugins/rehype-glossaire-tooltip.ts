/**
 * rehype-glossaire-tooltip
 *
 * Plugin rehype (build-time) qui detecte les termes du glossaire
 * dans le contenu markdown et injecte des tooltips CSS-only.
 *
 * - Premiere occurrence uniquement par terme par page
 * - Max 8 tooltips par page
 * - Skip : headings, links, code, pre, svg, tooltips existants
 * - Self-reference : ne tooltip pas un terme sur sa propre page glossaire
 */

import type { Root, Element, Text, ElementContent, RootContent } from 'hast';
import { GLOSSAIRE_TERMS } from '../data/glossaire-terms.js';

const SKIP_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'code', 'pre', 'svg', 'script', 'style']);
const MAX_TOOLTIPS = 8;

interface MatchInfo {
  slug: string;
  title: string;
  shortDefinition: string;
  regex: RegExp;
}

// Build regex list once (sorted longest-first via GLOSSAIRE_TERMS sort)
const MATCH_LIST: MatchInfo[] = [];
for (const term of GLOSSAIRE_TERMS) {
  for (const m of term.matches) {
    const escaped = m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    MATCH_LIST.push({
      slug: term.slug,
      title: term.title,
      shortDefinition: term.shortDefinition,
      regex: new RegExp(`\\b(${escaped})\\b`, 'i'),
    });
  }
}
// Sort by match pattern length descending (longest first)
MATCH_LIST.sort((a, b) => b.regex.source.length - a.regex.source.length);

function extractSelfSlug(filePath: string): string | null {
  // content/glossaire/bitcoin.md → "bitcoin"
  const match = filePath.match(/content\/glossaire\/([^/]+)\.md$/);
  return match ? match[1] : null;
}

function createTooltipNode(
  originalText: string,
  slug: string,
  title: string,
  shortDefinition: string,
): Element {
  return {
    type: 'element',
    tagName: 'a',
    properties: {
      href: `/glossaire/${slug}`,
      className: ['glossaire-tooltip'],
      'data-glossaire': slug,
    },
    children: [
      { type: 'text', value: originalText },
      {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['glossaire-tooltip-content'],
          role: 'tooltip',
          ariaHidden: 'true',
        },
        children: [
          {
            type: 'element',
            tagName: 'strong',
            properties: { className: ['glossaire-tooltip-title'] },
            children: [{ type: 'text', value: title }],
          },
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['glossaire-tooltip-def'] },
            children: [{ type: 'text', value: shortDefinition }],
          },
        ],
      },
    ],
  };
}

function splitTextNode(
  textNode: Text,
  matchedSlugs: Set<string>,
  selfSlug: string | null,
  tooltipCount: { value: number },
): ElementContent[] {
  let text = textNode.value;
  const result: ElementContent[] = [];

  // Try each term against the remaining text
  for (const entry of MATCH_LIST) {
    if (tooltipCount.value >= MAX_TOOLTIPS) break;
    if (matchedSlugs.has(entry.slug)) continue;
    if (selfSlug && entry.slug === selfSlug) continue;

    const match = text.match(entry.regex);
    if (!match || match.index === undefined) continue;

    const before = text.slice(0, match.index);
    const matched = match[1];
    const after = text.slice(match.index + matched.length);

    if (before) {
      result.push({ type: 'text', value: before });
    }

    result.push(createTooltipNode(matched, entry.slug, entry.title, entry.shortDefinition));
    matchedSlugs.add(entry.slug);
    tooltipCount.value++;

    // Continue processing the remainder
    text = after;
  }

  // Push remaining text
  if (text) {
    result.push({ type: 'text', value: text });
  }

  return result.length > 0 ? result : [textNode];
}

function walkAndReplace(
  node: Element | Root,
  matchedSlugs: Set<string>,
  selfSlug: string | null,
  tooltipCount: { value: number },
): void {
  if (tooltipCount.value >= MAX_TOOLTIPS) return;

  const children = node.children as (RootContent | ElementContent)[];
  if (!children) return;

  const newChildren: (RootContent | ElementContent)[] = [];

  for (const child of children) {
    if (tooltipCount.value >= MAX_TOOLTIPS) {
      newChildren.push(child);
      continue;
    }

    if (child.type === 'text') {
      const replaced = splitTextNode(
        child as Text,
        matchedSlugs,
        selfSlug,
        tooltipCount,
      );
      newChildren.push(...replaced);
    } else if (child.type === 'element') {
      const el = child as Element;
      // Skip subtrees that shouldn't be processed
      if (SKIP_TAGS.has(el.tagName)) {
        newChildren.push(child);
        continue;
      }
      if (
        Array.isArray(el.properties?.className) &&
        (el.properties.className as string[]).includes('glossaire-tooltip')
      ) {
        newChildren.push(child);
        continue;
      }
      // Recurse into this element
      walkAndReplace(el, matchedSlugs, selfSlug, tooltipCount);
      newChildren.push(child);
    } else {
      newChildren.push(child);
    }
  }

  node.children = newChildren as any;
}

export default function rehypeGlossaireTooltip() {
  return (tree: Root, vFile: any) => {
    const filePath: string = vFile.history?.[0] ?? '';
    const selfSlug = extractSelfSlug(filePath);
    const matchedSlugs = new Set<string>();
    const tooltipCount = { value: 0 };

    walkAndReplace(tree, matchedSlugs, selfSlug, tooltipCount);
  };
}
