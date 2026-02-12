import type { EventCategory } from '@/data/bitcoin-timeline';
import { CATEGORY_CONFIG, ALL_CATEGORIES, ERA_PRESETS } from './constants';

interface TimelineControlsProps {
  activeCategories: EventCategory[];
  onToggleCategory: (cat: EventCategory) => void;
  onSetEra: (start: number, end: number) => void;
  onZoom: (factor: number) => void;
  currentStart: number;
  currentEnd: number;
}

export default function TimelineControls({
  activeCategories,
  onToggleCategory,
  onSetEra,
  onZoom,
  currentStart,
  currentEnd,
}: TimelineControlsProps) {
  // Detect active era
  const activeEra = Object.entries(ERA_PRESETS).find(([, preset]) => {
    return Math.abs(preset.start - currentStart) < 86400000 * 30 &&
           Math.abs(preset.end - currentEnd) < 86400000 * 30;
  })?.[0] || null;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
      {/* Era presets */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-[var(--color-text-muted)] mr-1 hidden sm:inline">Periode :</span>
        {Object.entries(ERA_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => onSetEra(preset.start, preset.end)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
              activeEra === key
                ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-1.5 flex-wrap sm:ml-auto">
        {ALL_CATEGORIES.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          const active = activeCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => onToggleCategory(cat)}
              className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-lg border transition-all ${
                active
                  ? 'border-current'
                  : 'border-[var(--color-border)] opacity-40 hover:opacity-70'
              }`}
              style={{ color: active ? config.color : 'var(--color-text-muted)' }}
              aria-pressed={active}
              aria-label={`${active ? 'Masquer' : 'Afficher'} ${config.label}`}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: config.color, opacity: active ? 1 : 0.4 }}
              />
              <span className="hidden sm:inline">{config.label}</span>
            </button>
          );
        })}
      </div>

      {/* Zoom controls */}
      <div className="flex items-center gap-1 sm:ml-2">
        <button
          onClick={() => onZoom(0.7)}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-all text-sm"
          aria-label="Zoomer"
        >
          +
        </button>
        <button
          onClick={() => onZoom(1.4)}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-all text-sm"
          aria-label="Dezoomer"
        >
          -
        </button>
      </div>
    </div>
  );
}
