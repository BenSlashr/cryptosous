import { REGIME_COLORS, REGIME_LABELS } from './tax-data';
import type { TaxRegime } from './types';

interface MapLegendProps {
  activeFilter: TaxRegime | 'all';
  onFilter: (regime: TaxRegime | 'all') => void;
}

const REGIMES: (TaxRegime | 'all')[] = ['all', 'exemption', 'flat_tax', 'capital_gains', 'progressive', 'unclear'];

export default function MapLegend({ activeFilter, onFilter }: MapLegendProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {REGIMES.map((regime) => {
        const isAll = regime === 'all';
        const active = activeFilter === regime;
        const color = isAll ? undefined : REGIME_COLORS[regime];
        const label = isAll ? 'Tous' : REGIME_LABELS[regime];

        return (
          <button
            key={regime}
            onClick={() => onFilter(regime)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
              active
                ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-text-primary)]'
                : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            }`}
          >
            {!isAll && (
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
            )}
            {label}
          </button>
        );
      })}
    </div>
  );
}
