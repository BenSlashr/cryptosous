import type { EventCategory } from '@/data/bitcoin-timeline';

export const CATEGORY_CONFIG: Record<EventCategory, { label: string; color: string }> = {
  halving:    { label: 'Halvings',     color: 'var(--color-gold)' },
  adoption:   { label: 'Adoption',     color: 'var(--color-positive)' },
  crisis:     { label: 'Crises',       color: 'var(--color-negative)' },
  regulation: { label: 'Regulation',   color: 'var(--color-info)' },
  innovation: { label: 'Innovation',   color: 'var(--color-violet)' },
  milestone:  { label: 'Jalons',       color: 'var(--color-gold-light)' },
};

export const ALL_CATEGORIES: EventCategory[] = [
  'halving', 'milestone', 'adoption', 'crisis', 'regulation', 'innovation',
];

export interface EraPreset {
  label: string;
  start: number;
  end: number;
}

export const ERA_PRESETS: Record<string, EraPreset> = {
  all:         { label: 'Tout',     start: Date.parse('2008-09-01'), end: Date.parse('2025-06-01') },
  '2008-2012': { label: '2008-12', start: Date.parse('2008-09-01'), end: Date.parse('2013-01-01') },
  '2013-2016': { label: '2013-16', start: Date.parse('2013-01-01'), end: Date.parse('2017-01-01') },
  '2017-2020': { label: '2017-20', start: Date.parse('2017-01-01'), end: Date.parse('2021-01-01') },
  '2021-2025': { label: '2021-25', start: Date.parse('2021-01-01'), end: Date.parse('2025-06-01') },
};

// SVG layout constants
export const SVG = {
  width: 1200,
  height: 340,
  padding: { left: 56, right: 20, top: 16, bottom: 44 },
  priceAreaBottom: 220,  // y where price area ends
  eventRowY: 260,        // y center for event dots
  axisY: 240,            // y for the horizontal axis line
};

// Min/max view range (prevent over-zoom)
export const MIN_RANGE_MS = 6 * 30 * 24 * 3600 * 1000;   // ~6 months
export const MAX_RANGE_MS = 18 * 365 * 24 * 3600 * 1000;  // ~18 years

// Price axis tick marks (log scale)
export const PRICE_TICKS = [0.01, 1, 100, 1000, 10000, 100000];
