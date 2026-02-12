import type { TaxCalculationResult } from './types';
import { PFU_RATES } from './constants';

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

interface Props {
  result: TaxCalculationResult;
}

export default function TaxSummary({ result }: Props) {
  const pfuRate = PFU_RATES[result.taxYear];

  return (
    <div className="space-y-4">
      {/* 4 summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Total cessions
          </p>
          <p className="text-lg font-bold font-mono">{fmt(result.totalCessions)} EUR</p>
        </div>

        <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Plus-value nette
          </p>
          <p className={`text-lg font-bold font-mono ${
            result.plusValueNette > 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-text-primary)]'
          }`}>
            {result.plusValueNette > 0 ? '+' : ''}{fmt(result.plusValueNette)} EUR
          </p>
          {result.moinsValueBrute > 0 && (
            <p className="text-[10px] text-[var(--color-negative)] mt-0.5">
              dont {fmt(result.moinsValueBrute)} EUR de moins-values
            </p>
          )}
        </div>

        <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Impot PFU ({(pfuRate.total * 100).toFixed(1)}%)
          </p>
          <p className={`text-lg font-bold font-mono ${
            result.seuilExonere ? 'text-[var(--color-positive)]' : 'text-[var(--color-text-primary)]'
          }`}>
            {result.seuilExonere ? '0,00' : fmt(result.impotPfu)} EUR
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Seuil 305 EUR
          </p>
          {result.seuilExonere ? (
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-positive)]/15 text-[var(--color-positive)] border border-[var(--color-positive)]/20">
              Exonere
            </span>
          ) : (
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-negative)]/15 text-[var(--color-negative)] border border-[var(--color-negative)]/20">
              Depasse ({fmt(result.totalCessions)} EUR)
            </span>
          )}
        </div>
      </div>

      {result.seuilExonere && (
        <div className="p-3 rounded-lg bg-[var(--color-positive)]/10 border border-[var(--color-positive)]/20 text-sm text-[var(--color-positive)]">
          Vos cessions totales ({fmt(result.totalCessions)} EUR) ne depassent pas le seuil de 305 EUR. Vous etes exonere d'impot sur les plus-values crypto pour {result.taxYear}.
        </div>
      )}
    </div>
  );
}
