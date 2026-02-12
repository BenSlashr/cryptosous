import type { TimelineEvent } from '@/data/bitcoin-timeline';
import { SVG, CATEGORY_CONFIG } from './constants';

interface EventMarkerProps {
  event: TimelineEvent;
  x: number;
  yOffset: number; // stagger offset for collision avoidance
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  priceY: number | null; // y position on price curve, null if no price
}

export default function EventMarker({
  event,
  x,
  yOffset,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  priceY,
}: EventMarkerProps) {
  const config = CATEGORY_CONFIG[event.category];
  const dotY = SVG.eventRowY + yOffset;
  const r = isSelected ? 8 : isHovered ? 7 : 5;

  // Don't render if outside visible area
  if (x < SVG.padding.left - 10 || x > SVG.width - SVG.padding.right + 10) return null;

  return (
    <g>
      {/* Vertical connector line from price curve to event row */}
      {priceY != null && (
        <line
          x1={x}
          y1={priceY}
          x2={x}
          y2={dotY - r - 2}
          stroke={config.color}
          strokeOpacity={isHovered || isSelected ? 0.5 : 0.15}
          strokeWidth="1"
          strokeDasharray="2 4"
        />
      )}

      {/* Event dot */}
      <circle
        cx={x}
        cy={dotY}
        r={r}
        fill={isSelected ? config.color : 'var(--color-surface-raised)'}
        stroke={config.color}
        strokeWidth={isSelected ? 2.5 : 2}
        style={{ transition: 'r 0.15s ease, fill 0.15s ease' }}
      />

      {/* Transparent hit area (larger for easy tapping) */}
      <circle
        cx={x}
        cy={dotY}
        r={16}
        fill="transparent"
        style={{ cursor: 'pointer' }}
        role="button"
        aria-label={`${event.title} - ${formatDate(event.date)}${event.btcPrice ? ` - ${formatPrice(event.btcPrice)}` : ''}`}
        tabIndex={0}
        onPointerEnter={() => onHover(event.id)}
        onPointerLeave={() => onHover(null)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(event.id);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(event.id);
          }
        }}
      />

      {/* Year label under dot (only for selected/hovered) */}
      {(isHovered || isSelected) && (
        <text
          x={x}
          y={dotY + r + 14}
          textAnchor="middle"
          fill="var(--color-text-secondary)"
          fontSize="9"
          fontFamily="var(--font-mono, monospace)"
        >
          {event.date.slice(0, 7)}
        </text>
      )}
    </g>
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  const months = ['jan.', 'fev.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'aout', 'sept.', 'oct.', 'nov.', 'dec.'];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

function formatPrice(price: number): string {
  if (price >= 1000) return `${(price / 1000).toFixed(price >= 10000 ? 0 : 1)}k $`;
  if (price >= 1) return `${price.toFixed(0)} $`;
  return `${price} $`;
}
