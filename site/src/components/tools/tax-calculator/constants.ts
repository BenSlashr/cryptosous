import type { TaxYear } from './types';

// Seuil d'exoneration : 305 EUR de cessions totales par an
export const SEUIL_EXONERATION = 305;

// PFU (Prelevement Forfaitaire Unique) par annee
export const PFU_RATES: Record<TaxYear, { total: number; ir: number; ps: number }> = {
  2025: { total: 0.30, ir: 0.128, ps: 0.172 },  // 12.8% IR + 17.2% PS
  2026: { total: 0.314, ir: 0.128, ps: 0.186 },  // 12.8% IR + 18.6% PS (reforme)
};

// Prelevements sociaux pour le bareme progressif
export const PS_RATES: Record<TaxYear, number> = {
  2025: 0.172,
  2026: 0.186,
};

// Tranches IR 2025 (revenus 2024) — bareme progressif
export const IR_TRANCHES_2025 = [
  { min: 0, max: 11_294, taux: 0 },
  { min: 11_294, max: 28_797, taux: 0.11 },
  { min: 28_797, max: 82_341, taux: 0.30 },
  { min: 82_341, max: 177_106, taux: 0.41 },
  { min: 177_106, max: Infinity, taux: 0.45 },
];

// Tranches IR 2026 (revenus 2025) — estimees (indexation ~2%)
export const IR_TRANCHES_2026 = [
  { min: 0, max: 11_520, taux: 0 },
  { min: 11_520, max: 29_373, taux: 0.11 },
  { min: 29_373, max: 83_988, taux: 0.30 },
  { min: 83_988, max: 180_648, taux: 0.41 },
  { min: 180_648, max: Infinity, taux: 0.45 },
];

export const IR_TRANCHES: Record<TaxYear, typeof IR_TRANCHES_2025> = {
  2025: IR_TRANCHES_2025,
  2026: IR_TRANCHES_2026,
};

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
