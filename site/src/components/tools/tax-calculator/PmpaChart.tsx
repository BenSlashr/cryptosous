import type { CessionResult } from './types';

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
}

interface Props {
  cessions: CessionResult[];
}

export default function PmpaChart({ cessions }: Props) {
  if (cessions.length < 1) return null;

  // Build data points: initial PTA + PTA after each cession
  const points = [
    { label: 'Initial', value: cessions[0].ptaAvantCession },
    ...cessions.map((c) => ({
      label: fmtDate(c.cession.date),
      value: c.ptaApresCession,
    })),
  ];

  const maxVal = Math.max(...points.map((p) => p.value));
  if (maxVal === 0 || points.length < 2) return null;

  const w = 600;
  const h = 180;
  const padX = 50;
  const padY = 20;
  const chartW = w - padX * 2;
  const chartH = h - padY * 2;

  const toX = (i: number) => padX + (i / (points.length - 1)) * chartW;
  const toY = (val: number) => padY + chartH - (val / maxVal) * chartH;

  // Path
  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(p.value)}`)
    .join(' ');

  // Area
  const areaPath = `${linePath} L${toX(points.length - 1)},${padY + chartH} L${toX(0)},${padY + chartH} Z`;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
        Evolution du PTA (Prix Total d'Acquisition)
      </h3>
      <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40 md:h-48">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const y = padY + chartH - pct * chartH;
            return (
              <g key={pct}>
                <line
                  x1={padX}
                  y1={y}
                  x2={w - padX}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={padX - 6}
                  y={y + 3}
                  textAnchor="end"
                  fill="var(--color-text-muted)"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                >
                  {fmt(maxVal * pct)}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill="rgba(139, 92, 246, 0.1)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--color-violet)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points + labels */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={toX(i)}
                cy={toY(p.value)}
                r="4"
                fill="var(--color-surface-raised)"
                stroke="var(--color-violet)"
                strokeWidth="2"
              />
              <text
                x={toX(i)}
                y={padY + chartH + 14}
                textAnchor="middle"
                fill="var(--color-text-muted)"
                fontSize="9"
              >
                {p.label}
              </text>
              <text
                x={toX(i)}
                y={toY(p.value) - 10}
                textAnchor="middle"
                fill="var(--color-text-secondary)"
                fontSize="9"
                fontFamily="var(--font-mono)"
              >
                {fmt(p.value)}
              </text>
            </g>
          ))}
        </svg>
        <p className="text-[10px] text-[var(--color-text-muted)] text-center mt-1">
          Le PTA diminue a chaque cession proportionnellement a la fraction vendue.
        </p>
      </div>
    </div>
  );
}
