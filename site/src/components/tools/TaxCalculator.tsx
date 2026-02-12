import React, { useReducer, useCallback, useState } from 'react';
import type { TaxState, TaxAction, TaxYear, Acquisition, Cession, CsvParseResult } from './tax-calculator/types';
import { calculateTaxes, validateData } from './tax-calculator/engine';
import ManualEntryForm from './tax-calculator/ManualEntryForm';
import TransactionTable from './tax-calculator/TransactionTable';
import TaxSummary from './tax-calculator/TaxSummary';
import CalculationBreakdown from './tax-calculator/CalculationBreakdown';
import PfuVsBaremeComparison from './tax-calculator/PfuVsBaremeComparison';
import PmpaChart from './tax-calculator/PmpaChart';

const initialState: TaxState = {
  tabMode: 'manual',
  taxYear: 2025,
  acquisitions: [],
  cessions: [],
  result: null,
  csvWarnings: [],
  error: '',
};

function reducer(state: TaxState, action: TaxAction): TaxState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, tabMode: action.tab, result: null, error: '' };
    case 'SET_YEAR':
      return { ...state, taxYear: action.year, result: null };
    case 'ADD_ACQUISITION':
      return { ...state, acquisitions: [...state.acquisitions, action.acquisition], result: null };
    case 'REMOVE_ACQUISITION':
      return {
        ...state,
        acquisitions: state.acquisitions.filter((a) => a.id !== action.id),
        result: null,
      };
    case 'UPDATE_ACQUISITION': {
      const acqs = state.acquisitions.map((a) =>
        a.id === action.id ? { ...a, [action.field]: action.value } : a,
      );
      return { ...state, acquisitions: acqs, result: null };
    }
    case 'ADD_CESSION':
      return { ...state, cessions: [...state.cessions, action.cession], result: null };
    case 'REMOVE_CESSION':
      return {
        ...state,
        cessions: state.cessions.filter((c) => c.id !== action.id),
        result: null,
      };
    case 'UPDATE_CESSION': {
      const cess = state.cessions.map((c) =>
        c.id === action.id ? { ...c, [action.field]: action.value } : c,
      );
      return { ...state, cessions: cess, result: null };
    }
    case 'SET_RESULT':
      return { ...state, result: action.result, error: '' };
    case 'IMPORT_CSV':
      return {
        ...state,
        acquisitions: [...state.acquisitions, ...action.data.acquisitions],
        cessions: [...state.cessions, ...action.data.cessions],
        csvWarnings: action.data.warnings,
        result: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'CLEAR_ALL':
      return { ...initialState, tabMode: state.tabMode, taxYear: state.taxYear };
    default:
      return state;
  }
}

export default function TaxCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculate = useCallback(() => {
    const error = validateData(state.acquisitions, state.cessions);
    if (error) {
      dispatch({ type: 'SET_ERROR', error });
      return;
    }
    const result = calculateTaxes(state.acquisitions, state.cessions, state.taxYear);
    dispatch({ type: 'SET_RESULT', result });
  }, [state.acquisitions, state.cessions, state.taxYear]);

  const handleExportPdf = useCallback(async () => {
    if (!state.result) return;
    const { exportTaxReport } = await import('./tax-calculator/pdf-export');
    exportTaxReport(state.result, state.acquisitions);
  }, [state.result, state.acquisitions]);

  const handleCsvImport = useCallback((data: CsvParseResult) => {
    dispatch({ type: 'IMPORT_CSV', data });
  }, []);

  const tabClass = (active: boolean) =>
    `flex-1 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
      active
        ? 'bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] border border-[var(--color-border)]'
        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
    }`;

  const yearBtnClass = (active: boolean) =>
    `px-4 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
      active
        ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
        : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]'
    }`;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
      {/* Year selector + Tab selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider self-center mr-2">
            Annee fiscale
          </span>
          {([2025, 2026] as TaxYear[]).map((y) => (
            <button
              key={y}
              onClick={() => dispatch({ type: 'SET_YEAR', year: y })}
              className={yearBtnClass(state.taxYear === y)}
            >
              {y}
            </button>
          ))}
        </div>

        <div className="flex gap-1 p-1 rounded-lg bg-[var(--color-surface)]">
          <button onClick={() => dispatch({ type: 'SET_TAB', tab: 'manual' })} className={tabClass(state.tabMode === 'manual')}>
            Saisie manuelle
          </button>
          <button onClick={() => dispatch({ type: 'SET_TAB', tab: 'csv' })} className={tabClass(state.tabMode === 'csv')}>
            Import CSV
          </button>
        </div>
      </div>

      {/* Input section */}
      {state.tabMode === 'manual' ? (
        <ManualEntryForm
          onAddAcquisition={(a: Acquisition) => dispatch({ type: 'ADD_ACQUISITION', acquisition: a })}
          onAddCession={(c: Cession) => dispatch({ type: 'ADD_CESSION', cession: c })}
        />
      ) : (
        <CsvImportLazy onImport={handleCsvImport} />
      )}

      {/* CSV warnings */}
      {state.csvWarnings.length > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20">
          <p className="text-xs font-semibold text-[var(--color-gold)] mb-1">Avertissements</p>
          {state.csvWarnings.map((w, i) => (
            <p key={i} className="text-xs text-[var(--color-text-secondary)]">{w}</p>
          ))}
        </div>
      )}

      {/* Transaction table */}
      <div className="mt-6">
        <TransactionTable
          acquisitions={state.acquisitions}
          cessions={state.cessions}
          onRemoveAcquisition={(id: string) => dispatch({ type: 'REMOVE_ACQUISITION', id })}
          onRemoveCession={(id: string) => dispatch({ type: 'REMOVE_CESSION', id })}
          onUpdateCession={state.tabMode === 'csv' ? (id, field, value) => dispatch({ type: 'UPDATE_CESSION', id, field, value }) : undefined}
        />
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleCalculate}
          disabled={state.acquisitions.length === 0 || state.cessions.length === 0}
          className="flex-1 py-3.5 rounded-lg bg-[var(--color-gold)] text-[var(--color-void)] font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Calculer l'impot
        </button>
        {(state.acquisitions.length > 0 || state.cessions.length > 0) && (
          <button
            onClick={() => dispatch({ type: 'CLEAR_ALL' })}
            className="px-4 py-3.5 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-negative)] hover:text-[var(--color-negative)] transition-colors cursor-pointer"
          >
            Effacer tout
          </button>
        )}
      </div>

      {/* Error */}
      {state.error && (
        <p className="text-sm text-[var(--color-negative)] mt-4 text-center">{state.error}</p>
      )}

      {/* Results */}
      {state.result && (
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] space-y-8">
          <TaxSummary result={state.result} />
          <CalculationBreakdown cessions={state.result.cessions} />
          <PmpaChart cessions={state.result.cessions} />
          <PfuVsBaremeComparison result={state.result} />

          {/* Export PDF */}
          <div className="flex justify-center">
            <button
              onClick={handleExportPdf}
              className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exporter en PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Lazy wrapper for CSV import (loaded only when tab is selected)
function CsvImportLazy({ onImport }: { onImport: (data: CsvParseResult) => void }) {
  const [CsvComponent, setCsvComponent] = useState<React.ComponentType<{ onImport: typeof onImport }> | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    import('./tax-calculator/CsvImport').then((mod) => {
      if (!cancelled) setCsvComponent(() => mod.default);
    });
    return () => { cancelled = true; };
  }, []);

  if (!CsvComponent) {
    return (
      <div className="text-center py-8 text-sm text-[var(--color-text-muted)]">
        Chargement du module d'import...
      </div>
    );
  }

  return <CsvComponent onImport={onImport} />;
}

