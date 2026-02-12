export interface Acquisition {
  id: string;
  date: string; // YYYY-MM-DD
  montantEur: number;
  description: string;
}

export interface Cession {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  prixDeCession: number;       // PC
  valeurGlobalePortefeuille: number; // VGP
}

export interface CessionStep {
  label: string;
  formula: string;
  value: number;
}

export interface CessionResult {
  cession: Cession;
  ptaAvantCession: number;
  fractionPta: number; // PTA x PC / VGP
  plusValue: number;
  ptaApresCession: number;
  steps: CessionStep[];
}

export interface BaremeResult {
  revenuImposable: number;
  nbParts: number;
  irBrut: number;
  prelevementsSociaux: number; // 18.6% in 2026, 17.2% in 2025
  totalImpot: number;
  tauxEffectif: number;
}

export interface TaxCalculationResult {
  cessions: CessionResult[];
  totalCessions: number;      // Somme des PC
  plusValueBrute: number;      // Somme PV positives
  moinsValueBrute: number;    // Somme PV negatives (valeur absolue)
  plusValueNette: number;      // PV+ - PV- (plancher 0)
  seuilExonere: boolean;      // totalCessions <= 305
  impotPfu: number;
  taxYear: TaxYear;
}

export type TaxYear = 2025 | 2026;

export type TransactionType = 'acquisition' | 'cession';

export interface RawCsvTransaction {
  date: string;
  type: TransactionType;
  montantEur: number;
  description: string;
  prixDeCession?: number;
  valeurGlobalePortefeuille?: number;
}

export type CsvPlatform = 'binance' | 'coinbase' | 'kraken' | 'bybit' | 'bitpanda' | 'cryptocom' | 'ledger' | 'traderepublic' | 'unknown';

export interface CsvParseResult {
  platform: CsvPlatform;
  acquisitions: Acquisition[];
  cessions: Cession[];
  warnings: string[];
}

export type TabMode = 'manual' | 'csv';

export interface TaxState {
  tabMode: TabMode;
  taxYear: TaxYear;
  acquisitions: Acquisition[];
  cessions: Cession[];
  result: TaxCalculationResult | null;
  csvWarnings: string[];
  error: string;
}

export type TaxAction =
  | { type: 'SET_TAB'; tab: TabMode }
  | { type: 'SET_YEAR'; year: TaxYear }
  | { type: 'ADD_ACQUISITION'; acquisition: Acquisition }
  | { type: 'REMOVE_ACQUISITION'; id: string }
  | { type: 'UPDATE_ACQUISITION'; id: string; field: keyof Acquisition; value: string | number }
  | { type: 'ADD_CESSION'; cession: Cession }
  | { type: 'REMOVE_CESSION'; id: string }
  | { type: 'UPDATE_CESSION'; id: string; field: keyof Cession; value: string | number }
  | { type: 'SET_RESULT'; result: TaxCalculationResult }
  | { type: 'IMPORT_CSV'; data: CsvParseResult }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'CLEAR_ALL' };
