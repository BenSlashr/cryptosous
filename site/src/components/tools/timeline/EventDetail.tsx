import type { TimelineEvent } from '@/data/bitcoin-timeline';
import { CATEGORY_CONFIG } from './constants';

interface EventDetailProps {
  event: TimelineEvent;
  onClose: () => void;
}

export default function EventDetail({ event, onClose }: EventDetailProps) {
  const config = CATEGORY_CONFIG[event.category];

  return (
    <div
      className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/80 p-5 md:p-6 animate-fade-in-up"
      role="region"
      aria-label={`Detail : ${event.title}`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Category badge */}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border"
            style={{
              color: config.color,
              borderColor: config.color,
              backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            {config.label}
          </span>

          {/* Date */}
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {formatDateLong(event.date)}
          </span>

          {/* Price */}
          {event.btcPrice != null && (
            <span className="text-xs font-mono text-[var(--color-gold)]">
              BTC : {formatPriceFull(event.btcPrice)}
            </span>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors p-1 -m-1 flex-shrink-0"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Title */}
      <h3 className="font-display font-700 text-lg text-[var(--color-text-primary)] mb-2">
        {event.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
        {event.description}
      </p>

      {/* Article link */}
      {event.articleLink && (
        <a
          href={event.articleLink}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors"
        >
          {event.articleLabel || 'Lire l\'article'}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );
}

function formatDateLong(iso: string): string {
  const [y, m, d] = iso.split('-');
  const months = [
    'janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre',
  ];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

function formatPriceFull(price: number): string {
  if (price >= 1) return price.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) + ' $';
  return price.toString() + ' $';
}
