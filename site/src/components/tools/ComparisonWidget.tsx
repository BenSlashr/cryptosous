import { useState, useEffect, useCallback } from 'react';

interface CoinLiveData {
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

interface ChartPoint {
  timestamp: number;
  priceA: number;
  priceB: number;
}

const PERIODS = [
  { label: '7j', days: 7 },
  { label: '30j', days: 30 },
  { label: '1an', days: 365 },
  { label: 'Max', days: 'max' as const },
];

interface Props {
  coinIdA: string;
  coinIdB: string;
  nameA: string;
  nameB: string;
  symbolA: string;
  symbolB: string;
}

export default function ComparisonWidget({ coinIdA, coinIdB, nameA, nameB, symbolA, symbolB }: Props) {
  const [dataA, setDataA] = useState<CoinLiveData | null>(null);
  const [dataB, setDataB] = useState<CoinLiveData | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number | 'max'>(30);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const colorA = 'var(--color-gold)';
  const colorB = 'var(--color-violet)';

  const fetchPrices = useCallback(async () => {
    try {
      setError('');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${coinIdA},${coinIdB}&order=market_cap_desc`
      );
      if (!res.ok) throw new Error('Erreur API');
      const coins = await res.json();
      const a = coins.find((c: any) => c.id === coinIdA);
      const b = coins.find((c: any) => c.id === coinIdB);
      if (a) setDataA({
        current_price: a.current_price,
        price_change_percentage_24h: a.price_change_percentage_24h,
        market_cap: a.market_cap,
        total_volume: a.total_volume,
        image: a.image,
      });
      if (b) setDataB({
        current_price: b.current_price,
        price_change_percentage_24h: b.price_change_percentage_24h,
        market_cap: b.market_cap,
        total_volume: b.total_volume,
        image: b.image,
      });
      setLoading(false);
    } catch {
      setError('Impossible de charger les prix. Réessayez dans quelques secondes.');
      setLoading(false);
    }
  }, [coinIdA, coinIdB]);

  const fetchChart = useCallback(async (days: number | 'max') => {
    setChartLoading(true);
    try {
      const [resA, resB] = await Promise.all([
        fetch(`https://api.coingecko.com/api/v3/coins/${coinIdA}/market_chart?vs_currency=eur&days=${days}`),
        fetch(`https://api.coingecko.com/api/v3/coins/${coinIdB}/market_chart?vs_currency=eur&days=${days}`),
      ]);
      if (!resA.ok || !resB.ok) throw new Error('Erreur API');
      const [chartA, chartB] = await Promise.all([resA.json(), resB.json()]);

      const pricesA: [number, number][] = chartA.prices;
      const pricesB: [number, number][] = chartB.prices;

      // Normalize to base 100 and align by timestamp
      const len = Math.min(pricesA.length, pricesB.length);
      if (len < 2) { setChartLoading(false); return; }

      const baseA = pricesA[0][1];
      const baseB = pricesB[0][1];

      const points: ChartPoint[] = [];
      for (let i = 0; i < len; i++) {
        points.push({
          timestamp: pricesA[i][0],
          priceA: (pricesA[i][1] / baseA) * 100,
          priceB: (pricesB[i][1] / baseB) * 100,
        });
      }
      setChartData(points);
    } catch {
      // Chart error is non-critical
    } finally {
      setChartLoading(false);
    }
  }, [coinIdA, coinIdB]);

  useEffect(() => {
    fetchPrices();
    fetchChart(selectedPeriod);
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [fetchPrices, fetchChart, selectedPeriod]);

  const fmt = (n: number, decimals = 2) =>
    n.toLocaleString('fr-FR', { maximumFractionDigits: decimals });

  const fmtCompact = (n: number) => {
    if (n >= 1e12) return `${fmt(n / 1e12)} T€`;
    if (n >= 1e9) return `${fmt(n / 1e9)} Md€`;
    if (n >= 1e6) return `${fmt(n / 1e6)} M€`;
    return `${fmt(n)} €`;
  };

  const fmtPrice = (n: number) => {
    if (n >= 1000) return fmt(n, 2);
    if (n >= 1) return fmt(n, 4);
    if (n >= 0.01) return fmt(n, 6);
    return fmt(n, 8);
  };

  const changeBg = (pct: number) =>
    pct >= 0
      ? 'bg-[var(--color-positive)]/10 text-[var(--color-positive)]'
      : 'bg-[var(--color-negative)]/10 text-[var(--color-negative)]';

  // Chart rendering (normalized base 100)
  const renderChart = () => {
    if (chartData.length < 2) return null;
    const w = 700;
    const h = 280;
    const padX = 10;
    const padY = 25;

    const allVals = chartData.flatMap(p => [p.priceA, p.priceB]);
    const minV = Math.min(...allVals);
    const maxV = Math.max(...allVals);
    const rangeV = maxV - minV || 1;

    const toX = (i: number) => padX + (i / (chartData.length - 1)) * (w - 2 * padX);
    const toY = (v: number) => padY + (1 - (v - minV) / rangeV) * (h - 2 * padY);

    const pathA = chartData
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(p.priceA)}`)
      .join(' ');
    const pathB = chartData
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(p.priceB)}`)
      .join(' ');

    const hovered = hoveredIdx !== null && hoveredIdx >= 0 && hoveredIdx < chartData.length
      ? chartData[hoveredIdx]
      : null;

    return (
      <div className="relative">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-60 md:h-72"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * w;
            const idx = Math.round(((x - padX) / (w - 2 * padX)) * (chartData.length - 1));
            if (idx >= 0 && idx < chartData.length) {
              setHoveredIdx(idx);
            }
          }}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* Base 100 line */}
          <line
            x1={padX} y1={toY(100)} x2={w - padX} y2={toY(100)}
            stroke="var(--color-border)" strokeWidth="1" strokeDasharray="6 4"
          />
          <text x={w - padX - 2} y={toY(100) - 6} fill="var(--color-text-muted)" fontSize="10" textAnchor="end">
            Base 100
          </text>

          {/* Grid */}
          {[0.25, 0.5, 0.75].map((pct) => (
            <line
              key={pct}
              x1={padX} y1={padY + pct * (h - 2 * padY)}
              x2={w - padX} y2={padY + pct * (h - 2 * padY)}
              stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4"
            />
          ))}

          {/* Coin B line (behind) */}
          <path d={pathB} fill="none" stroke={colorB} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
          {/* Coin A line (front) */}
          <path d={pathA} fill="none" stroke={colorA} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Hover vertical line */}
          {hovered && hoveredIdx !== null && (
            <>
              <line
                x1={toX(hoveredIdx)} y1={padY} x2={toX(hoveredIdx)} y2={h - padY}
                stroke="var(--color-text-muted)" strokeWidth="0.5" strokeDasharray="3 3"
              />
              <circle cx={toX(hoveredIdx)} cy={toY(hovered.priceA)} r="4" fill={colorA} />
              <circle cx={toX(hoveredIdx)} cy={toY(hovered.priceB)} r="4" fill={colorB} />
            </>
          )}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: colorA }} />
            <span className="text-xs text-[var(--color-text-secondary)]">{nameA}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: colorB }} />
            <span className="text-xs text-[var(--color-text-secondary)]">{nameB}</span>
          </div>
        </div>

        {/* Tooltip */}
        {hovered && (
          <div className="absolute top-2 right-2 px-3 py-2 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-xs space-y-1">
            <p className="text-[var(--color-text-muted)]">
              {new Date(hovered.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
            <p>
              <span style={{ color: colorA }} className="font-semibold">{symbolA}</span>
              <span className="ml-2 font-mono text-[var(--color-text-primary)]">{fmt(hovered.priceA, 1)}</span>
            </p>
            <p>
              <span style={{ color: colorB }} className="font-semibold">{symbolB}</span>
              <span className="ml-2 font-mono text-[var(--color-text-primary)]">{fmt(hovered.priceB, 1)}</span>
            </p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-8">
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !dataA || !dataB) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-8 text-center">
        <p className="text-sm text-[var(--color-negative)]">{error || 'Données indisponibles'}</p>
        <button
          onClick={fetchPrices}
          className="mt-3 text-sm text-[var(--color-gold)] hover:underline cursor-pointer"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 overflow-hidden">
      {/* Duel Cards */}
      <div className="grid grid-cols-2 divide-x divide-[var(--color-border)]">
        {/* Coin A */}
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            {dataA.image && <img src={dataA.image} alt={nameA} className="w-8 h-8 rounded-full" loading="lazy" />}
            <div>
              <p className="font-display font-bold text-sm md:text-base text-[var(--color-text-primary)]">{nameA}</p>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">{symbolA}</p>
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold font-display tracking-tight" style={{ color: colorA }}>
            {fmtPrice(dataA.current_price)} <span className="text-sm text-[var(--color-text-muted)]">€</span>
          </p>
          <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold ${changeBg(dataA.price_change_percentage_24h)}`}>
            {dataA.price_change_percentage_24h >= 0 ? '+' : ''}{fmt(dataA.price_change_percentage_24h)}%
          </span>
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--color-text-muted)]">Cap.</span>
              <span className="font-mono text-[var(--color-text-secondary)]">{fmtCompact(dataA.market_cap)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--color-text-muted)]">Vol. 24h</span>
              <span className="font-mono text-[var(--color-text-secondary)]">{fmtCompact(dataA.total_volume)}</span>
            </div>
          </div>
        </div>

        {/* VS divider on mobile */}
        {/* Coin B */}
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            {dataB.image && <img src={dataB.image} alt={nameB} className="w-8 h-8 rounded-full" loading="lazy" />}
            <div>
              <p className="font-display font-bold text-sm md:text-base text-[var(--color-text-primary)]">{nameB}</p>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">{symbolB}</p>
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold font-display tracking-tight" style={{ color: colorB }}>
            {fmtPrice(dataB.current_price)} <span className="text-sm text-[var(--color-text-muted)]">€</span>
          </p>
          <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold ${changeBg(dataB.price_change_percentage_24h)}`}>
            {dataB.price_change_percentage_24h >= 0 ? '+' : ''}{fmt(dataB.price_change_percentage_24h)}%
          </span>
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--color-text-muted)]">Cap.</span>
              <span className="font-mono text-[var(--color-text-secondary)]">{fmtCompact(dataB.market_cap)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--color-text-muted)]">Vol. 24h</span>
              <span className="font-mono text-[var(--color-text-secondary)]">{fmtCompact(dataB.total_volume)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Chart */}
      <div className="border-t border-[var(--color-border)]">
        {/* Period selector */}
        <div className="flex border-b border-[var(--color-border)]">
          {PERIODS.map((period) => (
            <button
              key={period.label}
              onClick={() => {
                setSelectedPeriod(period.days);
                fetchChart(period.days);
              }}
              className={`flex-1 py-2.5 text-xs font-medium transition-all cursor-pointer ${
                selectedPeriod === period.days
                  ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/5 border-b-2 border-[var(--color-gold)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
        <div className="p-4">
          <p className="text-[10px] text-[var(--color-text-muted)] mb-2 text-center uppercase tracking-wider">
            Performance normalisée (base 100)
          </p>
          {chartLoading ? (
            <div className="flex items-center justify-center h-60">
              <div className="w-5 h-5 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            renderChart()
          )}
        </div>
      </div>

      {/* Refresh bar */}
      <div className="px-6 py-3 border-t border-[var(--color-border)] flex justify-between items-center">
        <p className="text-[10px] text-[var(--color-text-muted)]">
          Données CoinGecko — actualisées chaque minute
        </p>
        <button
          onClick={() => { fetchPrices(); fetchChart(selectedPeriod); }}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors cursor-pointer flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Rafraîchir
        </button>
      </div>
    </div>
  );
}
