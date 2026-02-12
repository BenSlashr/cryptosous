export type TaxRegime = 'exemption' | 'flat_tax' | 'capital_gains' | 'progressive' | 'unclear';

export interface HoldingPeriodRule {
  period: string;
  benefit: string;
}

export interface Source {
  label: string;
  url: string;
}

export interface CountryTaxInfo {
  code: string;          // ISO alpha-2 (FR, PT, CH, AE)
  numericCode: string;   // ISO 3166-1 numeric (for topojson matching)
  name: string;          // Nom francais
  regime: TaxRegime;
  rates: string;         // "30%", "0%", "0-45%"
  rateValue: number;     // Taux principal numerique (pour tri/couleur)
  holdingPeriodRules: HoldingPeriodRule[];
  exemptions: string[];
  keyRules: string[];
  notes: string;
  lastUpdated: string;   // YYYY-MM-DD
  sources: Source[];
}

export interface TaxMapState {
  selectedCountry: string | null;   // ISO alpha-2
  comparedCountries: string[];      // max 4
  hoveredCountry: string | null;
  detailOpen: boolean;
  comparisonOpen: boolean;
  searchQuery: string;
  filterRegime: TaxRegime | 'all';
}

export type TaxMapAction =
  | { type: 'SELECT_COUNTRY'; code: string }
  | { type: 'CLOSE_DETAIL' }
  | { type: 'HOVER_COUNTRY'; code: string | null }
  | { type: 'ADD_COMPARISON'; code: string }
  | { type: 'REMOVE_COMPARISON'; code: string }
  | { type: 'CLEAR_COMPARISON' }
  | { type: 'TOGGLE_COMPARISON' }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'SET_FILTER'; regime: TaxRegime | 'all' };
