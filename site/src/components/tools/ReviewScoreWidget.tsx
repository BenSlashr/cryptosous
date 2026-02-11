import { useState, useEffect, useRef } from 'react';

interface Props {
  overallScore: number;
  criteria: Array<{ label: string; score: number; color: string }>;
  productName: string;
}

export default function ReviewScoreWidget({ overallScore, criteria, productName }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const circumference = 2 * Math.PI * 54;
  const progress = visible ? (overallScore / 10) * circumference : 0;
  const offset = circumference - progress;

  return (
    <div
      ref={ref}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6 md:p-8"
    >
      <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-6">
        Note globale — {productName}
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Score circle */}
        <div className="relative flex-shrink-0">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle
              cx="64" cy="64" r="54"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="8"
            />
            <circle
              cx="64" cy="64" r="54"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 64 64)"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-extrabold text-3xl text-[var(--color-gold)]">
              {overallScore}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">/ 10</span>
          </div>
        </div>

        {/* Criteria bars */}
        <div className="flex-1 w-full space-y-4">
          {criteria.map((c) => (
            <div key={c.label}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[var(--color-text-secondary)]">{c.label}</span>
                <span className="text-sm font-mono font-semibold text-[var(--color-text-primary)]">
                  {c.score}/10
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-[var(--color-border)] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: visible ? `${(c.score / 10) * 100}%` : '0%',
                    backgroundColor: c.color,
                    transition: 'width 0.8s ease-out',
                    transitionDelay: '0.2s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
