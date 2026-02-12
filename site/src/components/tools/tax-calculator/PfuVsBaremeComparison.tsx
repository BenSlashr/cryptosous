import { useState } from 'react';
import type { TaxCalculationResult } from './types';
import { calculateBareme } from './engine';
import { PFU_RATES } from './constants';

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

const inputClass =
  'w-full px-3 py-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold)] text-sm font-mono';
const labelClass =
  'block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5';

interface Props {
  result: TaxCalculationResult;
}

export default function PfuVsBaremeComparison({ result }: Props) {
  const [revenuFiscal, setRevenuFiscal] = useState('');
  const [nbParts, setNbParts] = useState('1');
  const [baremeResult, setBaremeResult] = useState<ReturnType<typeof calculateBareme> | null>(null);

  if (result.seuilExonere || result.plusValueNette <= 0) {
    return null;
  }

  const handleCompare = () => {
    const revenu = parseFloat(revenuFiscal) || 0;
    const parts = parseFloat(nbParts) || 1;
    const res = calculateBareme(result.plusValueNette, revenu, parts, result.taxYear);
    setBaremeResult(res);
  };

  const pfuRate = PFU_RATES[result.taxYear];
  const pfuTotal = result.impotPfu;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
        PFU ou bareme progressif ?
      </h3>
      <p className="text-xs text-[var(--color-text-muted)]">
        Entrez votre revenu fiscal et nombre de parts pour comparer les deux regimes.
        Le bareme progressif integre vos plus-values crypto dans vos revenus globaux.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Revenu fiscal de reference (EUR)</label>
          <input
            type="number"
            value={revenuFiscal}
            onChange={(e) => setRevenuFiscal(e.target.value)}
            placeholder="30000"
            min="0"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Nombre de parts fiscales</label>
          <input
            type="number"
            value={nbParts}
            onChange={(e) => setNbParts(e.target.value)}
            placeholder="1"
            min="1"
            step="0.5"
            className={inputClass}
          />
        </div>
      </div>

      <button
        onClick={handleCompare}
        disabled={!revenuFiscal}
        className="px-4 py-2.5 rounded-lg border border-[var(--color-violet)] text-sm font-medium text-[var(--color-violet)] hover:bg-[var(--color-violet)]/10 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Comparer les regimes
      </button>

      {baremeResult && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* PFU column */}
          <div className={`p-4 rounded-lg border ${
            pfuTotal <= baremeResult.totalImpot
              ? 'border-[var(--color-positive)] bg-[var(--color-positive)]/5'
              : 'border-[var(--color-border)] bg-[var(--color-surface)]'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                PFU ({(pfuRate.total * 100).toFixed(1)}%)
              </h4>
              {pfuTotal <= baremeResult.totalImpot && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-positive)]/15 text-[var(--color-positive)] font-semibold">
                  Avantageux
                </span>
              )}
            </div>
            <p className="text-xl font-bold font-mono text-[var(--color-text-primary)]">
              {fmt(pfuTotal)} EUR
            </p>
            <div className="mt-2 space-y-1 text-xs text-[var(--color-text-muted)]">
              <div className="flex justify-between">
                <span>IR ({(pfuRate.ir * 100).toFixed(1)}%)</span>
                <span className="font-mono">{fmt(result.plusValueNette * pfuRate.ir)}</span>
              </div>
              <div className="flex justify-between">
                <span>PS ({(pfuRate.ps * 100).toFixed(1)}%)</span>
                <span className="font-mono">{fmt(result.plusValueNette * pfuRate.ps)}</span>
              </div>
            </div>
          </div>

          {/* Bareme column */}
          <div className={`p-4 rounded-lg border ${
            baremeResult.totalImpot < pfuTotal
              ? 'border-[var(--color-positive)] bg-[var(--color-positive)]/5'
              : 'border-[var(--color-border)] bg-[var(--color-surface)]'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Bareme progressif
              </h4>
              {baremeResult.totalImpot < pfuTotal && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-positive)]/15 text-[var(--color-positive)] font-semibold">
                  Avantageux
                </span>
              )}
            </div>
            <p className="text-xl font-bold font-mono text-[var(--color-text-primary)]">
              {fmt(baremeResult.totalImpot)} EUR
            </p>
            <div className="mt-2 space-y-1 text-xs text-[var(--color-text-muted)]">
              <div className="flex justify-between">
                <span>IR (taux effectif {(baremeResult.tauxEffectif * 100).toFixed(1)}%)</span>
                <span className="font-mono">{fmt(baremeResult.irBrut)}</span>
              </div>
              <div className="flex justify-between">
                <span>PS ({(baremeResult.prelevementsSociaux / result.plusValueNette * 100).toFixed(1)}%)</span>
                <span className="font-mono">{fmt(baremeResult.prelevementsSociaux)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {baremeResult && (
        <p className="text-xs text-[var(--color-text-muted)]">
          Economie potentielle :{' '}
          <strong className="text-[var(--color-positive)] font-mono">
            {fmt(Math.abs(pfuTotal - baremeResult.totalImpot))} EUR
          </strong>
          {' '}en choisissant le{' '}
          {pfuTotal <= baremeResult.totalImpot ? 'PFU' : 'bareme progressif'}.
          Ce calcul est indicatif - l'option bareme s'applique a tous vos revenus du capital.
        </p>
      )}
    </div>
  );
}
