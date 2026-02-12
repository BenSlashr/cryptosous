import { useState } from 'react';
import type { CessionResult } from './types';

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

interface Props {
  cessions: CessionResult[];
}

export default function CalculationBreakdown({ cessions }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
        Detail par cession
      </h3>
      {cessions.map((cr, i) => {
        const isOpen = openIndex === i;
        const isPositive = cr.plusValue >= 0;
        return (
          <div
            key={cr.cession.id}
            className="rounded-lg border border-[var(--color-border)] overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--color-surface-hover)]/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--color-text-muted)]">
                  #{i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {cr.cession.description}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {fmtDate(cr.cession.date)} - PC : {fmt(cr.cession.prixDeCession)} EUR
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold font-mono ${
                  isPositive ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'
                }`}>
                  {isPositive ? '+' : ''}{fmt(cr.plusValue)} EUR
                </span>
                <svg
                  className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]/50">
                <div className="mt-3 space-y-2">
                  {cr.steps.map((step, j) => (
                    <div key={j} className="flex items-start justify-between gap-4 py-1.5">
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {step.label}
                      </span>
                      <span className="text-xs font-mono text-[var(--color-text-primary)] text-right whitespace-nowrap">
                        {step.formula}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t border-[var(--color-border)] flex justify-between">
                    <span className="text-xs text-[var(--color-text-muted)]">
                      PTA apres cession
                    </span>
                    <span className="text-xs font-mono text-[var(--color-text-primary)]">
                      {fmt(cr.ptaApresCession)} EUR
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
