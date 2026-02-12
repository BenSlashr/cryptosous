import type { CountryTaxInfo } from './types';
import { FLAG_EMOJI, REGIME_LABELS, REGIME_COLORS } from './tax-data';

interface CountryDetailProps {
  country: CountryTaxInfo;
  isCompared: boolean;
  onClose: () => void;
  onAddComparison: (code: string) => void;
}

export default function CountryDetail({
  country,
  isCompared,
  onClose,
  onAddComparison,
}: CountryDetailProps) {
  const flag = FLAG_EMOJI[country.code] || '';
  const regimeColor = REGIME_COLORS[country.regime];

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/80 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{flag}</span>
          <div>
            <h3 className="font-display font-700 text-[var(--color-text-primary)]">{country.name}</h3>
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium mt-1"
              style={{
                backgroundColor: regimeColor + '1A',
                color: regimeColor,
                border: `1px solid ${regimeColor}33`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: regimeColor }} />
              {REGIME_LABELS[country.regime]}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Rate */}
        <div>
          <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Taux</span>
          <p className="text-2xl font-display font-700 text-[var(--color-gold)] mt-1">{country.rates}</p>
        </div>

        {/* Holding period rules */}
        {country.holdingPeriodRules.length > 0 && (
          <div>
            <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Duree de detention</span>
            <div className="mt-1 space-y-1">
              {country.holdingPeriodRules.map((rule, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[var(--color-violet-light)] font-medium flex-shrink-0">{rule.period}</span>
                  <span className="text-[var(--color-text-secondary)]">{rule.benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exemptions */}
        {country.exemptions.length > 0 && (
          <div>
            <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Exonerations</span>
            <ul className="mt-1 space-y-1">
              {country.exemptions.map((ex, i) => (
                <li key={i} className="text-sm text-[var(--color-text-secondary)] flex gap-2">
                  <span className="text-[var(--color-positive)] flex-shrink-0">+</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key rules */}
        <div>
          <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Regles principales</span>
          <ul className="mt-1 space-y-1">
            {country.keyRules.map((rule, i) => (
              <li key={i} className="text-sm text-[var(--color-text-secondary)] flex gap-2">
                <span className="text-[var(--color-gold)] flex-shrink-0">-</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Notes */}
        {country.notes && (
          <div>
            <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Notes</span>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1 leading-relaxed">{country.notes}</p>
          </div>
        )}

        {/* Sources */}
        {country.sources.length > 0 && (
          <div>
            <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Sources</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {country.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--color-gold)] hover:underline"
                >
                  {src.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Last updated */}
        <p className="text-xs text-[var(--color-text-muted)]">
          Mis a jour : {country.lastUpdated}
        </p>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <button
          onClick={() => onAddComparison(country.code)}
          disabled={isCompared}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            isCompared
              ? 'bg-[var(--color-surface)] text-[var(--color-text-muted)] cursor-not-allowed'
              : 'border border-[var(--color-violet)] text-[var(--color-violet-light)] hover:bg-[var(--color-violet)]/10'
          }`}
        >
          {isCompared ? 'Deja dans la comparaison' : 'Ajouter a la comparaison'}
        </button>
      </div>
    </div>
  );
}
