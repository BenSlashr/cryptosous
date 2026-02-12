import { useState } from 'react';
import type { CountryTaxInfo } from './types';
import { FLAG_EMOJI, REGIME_LABELS, REGIME_COLORS, TAX_DATA, getCountryByCode } from './tax-data';

interface CountryComparisonProps {
  comparedCodes: string[];
  onRemove: (code: string) => void;
  onAdd: (code: string) => void;
  onClear: () => void;
}

export default function CountryComparison({
  comparedCodes,
  onRemove,
  onAdd,
  onClear,
}: CountryComparisonProps) {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectorQuery, setSelectorQuery] = useState('');

  const countries = comparedCodes
    .map(getCountryByCode)
    .filter((c): c is CountryTaxInfo => c !== undefined);

  const availableCountries = TAX_DATA.filter(
    (c) => !comparedCodes.includes(c.code)
  ).filter((c) =>
    selectorQuery
      ? c.name.toLowerCase().includes(selectorQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(selectorQuery.toLowerCase())
      : true
  );

  if (countries.length === 0) return null;

  const rows: { label: string; render: (c: CountryTaxInfo) => React.ReactNode }[] = [
    {
      label: 'Regime',
      render: (c) => (
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium"
          style={{
            backgroundColor: REGIME_COLORS[c.regime] + '1A',
            color: REGIME_COLORS[c.regime],
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: REGIME_COLORS[c.regime] }} />
          {REGIME_LABELS[c.regime]}
        </span>
      ),
    },
    {
      label: 'Taux',
      render: (c) => (
        <span className="text-sm font-semibold text-[var(--color-gold)]">{c.rates}</span>
      ),
    },
    {
      label: 'Detention',
      render: (c) =>
        c.holdingPeriodRules.length > 0 ? (
          <div className="space-y-1">
            {c.holdingPeriodRules.map((r, i) => (
              <p key={i} className="text-xs text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-violet-light)] font-medium">{r.period}</span> : {r.benefit}
              </p>
            ))}
          </div>
        ) : (
          <span className="text-xs text-[var(--color-text-muted)]">Aucun avantage</span>
        ),
    },
    {
      label: 'Exonerations',
      render: (c) =>
        c.exemptions.length > 0 ? (
          <ul className="space-y-0.5">
            {c.exemptions.map((ex, i) => (
              <li key={i} className="text-xs text-[var(--color-text-secondary)]">{ex}</li>
            ))}
          </ul>
        ) : (
          <span className="text-xs text-[var(--color-text-muted)]">Aucune</span>
        ),
    },
    {
      label: 'Points cles',
      render: (c) => (
        <ul className="space-y-0.5">
          {c.keyRules.slice(0, 3).map((rule, i) => (
            <li key={i} className="text-xs text-[var(--color-text-secondary)]">{rule}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
        <h3 className="font-display font-700 text-[var(--color-text-primary)]">
          Comparaison
        </h3>
        <div className="flex items-center gap-2">
          {comparedCodes.length < 4 && (
            <div className="relative">
              <button
                onClick={() => setSelectorOpen(!selectorOpen)}
                className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors cursor-pointer"
              >
                + Ajouter
              </button>
              {selectorOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 max-h-64 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-xl z-40">
                  <div className="p-2 border-b border-[var(--color-border)]">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={selectorQuery}
                      onChange={(e) => setSelectorQuery(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-gold)]"
                      autoFocus
                    />
                  </div>
                  <div className="p-1">
                    {availableCountries.slice(0, 15).map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          onAdd(c.code);
                          setSelectorOpen(false);
                          setSelectorQuery('');
                        }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] cursor-pointer transition-colors"
                      >
                        <span>{FLAG_EMOJI[c.code] || ''}</span>
                        <span>{c.name}</span>
                        <span className="ml-auto text-[var(--color-text-muted)]">{c.rates}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <button
            onClick={onClear}
            className="px-3 py-1.5 rounded-lg text-xs text-[var(--color-text-muted)] hover:text-[var(--color-negative)] transition-colors cursor-pointer"
          >
            Effacer
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider p-3 w-28">
              </th>
              {countries.map((c) => (
                <th key={c.code} className="text-center p-3 min-w-[140px]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{FLAG_EMOJI[c.code] || ''}</span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">{c.name}</span>
                    <button
                      onClick={() => onRemove(c.code)}
                      className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-negative)] transition-colors cursor-pointer"
                    >
                      Retirer
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-[var(--color-border)]/50">
                <td className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider p-3 align-top">
                  {row.label}
                </td>
                {countries.map((c) => (
                  <td key={c.code} className="p-3 align-top text-center">
                    {row.render(c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
