import { useMemo } from 'react';
import type { PricePoint } from '@/data/bitcoin-timeline';
import { SVG, PRICE_TICKS } from './constants';

interface PriceCurveProps {
  pricePoints: PricePoint[];
  timeToX: (timestamp: number) => number;
  priceToY: (price: number) => number;
  viewStart: number;
  viewEnd: number;
}

export default function PriceCurve({ pricePoints, timeToX, priceToY, viewStart, viewEnd }: PriceCurveProps) {
  const { linePath, areaPath } = useMemo(() => {
    // Filter to visible range with 1-point margin
    const visible = pricePoints.filter((p) => {
      const t = Date.parse(p.date + '-01');
      return t >= viewStart - 90 * 86400000 && t <= viewEnd + 90 * 86400000;
    });

    if (visible.length < 2) return { linePath: '', areaPath: '' };

    const points = visible
      .filter((p) => p.price > 0)
      .map((p) => ({
        x: timeToX(Date.parse(p.date + '-01')),
        y: priceToY(p.price),
      }));

    if (points.length < 2) return { linePath: '', areaPath: '' };

    const line = points.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ');
    const lastPt = points[points.length - 1];
    const firstPt = points[0];
    const area = `${line} L${lastPt.x.toFixed(1)},${SVG.priceAreaBottom} L${firstPt.x.toFixed(1)},${SVG.priceAreaBottom} Z`;

    return { linePath: line, areaPath: area };
  }, [pricePoints, timeToX, priceToY, viewStart, viewEnd]);

  // Price axis labels
  const priceTicks = useMemo(() => {
    return PRICE_TICKS.filter((p) => {
      const y = priceToY(p);
      return y > SVG.padding.top + 10 && y < SVG.priceAreaBottom - 10;
    }).map((p) => ({
      price: p,
      y: priceToY(p),
      label: p >= 1000 ? `${(p / 1000).toFixed(0)}k$` : p >= 1 ? `${p}$` : `${p}$`,
    }));
  }, [priceToY]);

  if (!linePath) return null;

  return (
    <g>
      {/* Gradient definition */}
      <defs>
        <linearGradient id="price-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Price horizontal grid lines */}
      {priceTicks.map((tick) => (
        <line
          key={tick.price}
          x1={SVG.padding.left}
          y1={tick.y}
          x2={SVG.width - SVG.padding.right}
          y2={tick.y}
          stroke="var(--color-border)"
          strokeOpacity="0.2"
          strokeDasharray="4 6"
        />
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#price-gradient)" />

      {/* Price line */}
      <path
        d={linePath}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Y-axis labels */}
      {priceTicks.map((tick) => (
        <text
          key={`label-${tick.price}`}
          x={SVG.padding.left - 6}
          y={tick.y + 4}
          textAnchor="end"
          fill="var(--color-text-muted)"
          fontSize="10"
          fontFamily="var(--font-mono, monospace)"
        >
          {tick.label}
        </text>
      ))}
    </g>
  );
}
