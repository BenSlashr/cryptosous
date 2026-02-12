import type { CountryTaxInfo } from './types';
import { FLAG_EMOJI, REGIME_LABELS, REGIME_COLORS } from './tax-data';

interface MapTooltipProps {
  country: CountryTaxInfo;
  x: number;
  y: number;
}

export default function MapTooltip({ country, x, y }: MapTooltipProps) {
  const flag = FLAG_EMOJI[country.code] || '';

  return (
    <div
      className="pointer-events-none fixed z-50 px-3 py-2 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] shadow-lg"
      style={{
        left: x + 12,
        top: y - 10,
        transform: 'translateY(-100%)',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">{flag}</span>
        <span className="text-sm font-medium text-[var(--color-text-primary)]">{country.name}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: REGIME_COLORS[country.regime] }}
        />
        <span className="text-xs text-[var(--color-text-muted)]">
          {REGIME_LABELS[country.regime]} - {country.rates}
        </span>
      </div>
    </div>
  );
}
