import { useState, useEffect, useCallback } from 'react';

interface CoinData {
  market_data: {
    current_price: { eur: number; usd: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    market_cap: { eur: number };
    total_volume: { eur: number };
    ath: { eur: number };
    ath_date: { eur: string };
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    market_cap_rank: number;
  };
}

interface ChartPoint {
  timestamp: number;
  price: number;
}

const PERIODS = [
  { label: '7j', days: 7 },
  { label: '30j', days: 30 },
  { label: '1an', days: 365 },
  { label: 'Max', days: 'max' as const },
];

interface Props {
  coinId: string;
  symbol: string;
  name: string;
}

export default function CryptoPriceWidget({ coinId, symbol, name }: Props) {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number | 'max'>(30);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);

  const fetchCoinData = useCallback(async () => {
    try {
      setError('');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
      );
      if (!res.ok) throw new Error('Erreur API');
      const data: CoinData = await res.json();
      setCoinData(data);
      setLoading(false);
    } catch {
      setError('Impossible de charger les données. Réessayez dans quelques secondes.');
      setLoading(false);
    }
  }, [coinId]);

  const fetchChart = useCallback(async (days: number | 'max') => {
    setChartLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=${days}`
      );
      if (!res.ok) throw new Error('Erreur API');
      const data = await res.json();
      const points: ChartPoint[] = (data.prices as [number, number][]).map(([t, p]) => ({
        timestamp: t,
        price: p,
      }));
      setChartData(points);
    } catch {
      // Chart error is non-critical
    } finally {
      setChartLoading(false);
    }
  }, [coinId]);

  useEffect(() => {
    fetchCoinData();
    fetchChart(selectedPeriod);
    const interval = setInterval(fetchCoinData, 60000);
    return () => clearInterval(interval);
  }, [fetchCoinData, fetchChart, selectedPeriod]);

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

  const changeColor = (pct: number) =>
    pct >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]';

  const changeBg = (pct: number) =>
    pct >= 0
      ? 'bg-[var(--color-positive)]/10 text-[var(--color-positive)]'
      : 'bg-[var(--color-negative)]/10 text-[var(--color-negative)]';

  // Chart rendering
  const renderChart = () => {
    if (chartData.length < 2) return null;
    const w = 700;
    const h = 250;
    const padX = 10;
    const padY = 20;

    const prices = chartData.map((p) => p.price);
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    const rangeP = maxP - minP || 1;

    const toX = (i: number) => padX + (i / (chartData.length - 1)) * (w - 2 * padX);
    const toY = (price: number) => padY + (1 - (price - minP) / rangeP) * (h - 2 * padY);

    const linePath = chartData
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(p.price)}`)
      .join(' ');

    const areaPath = `${linePath} L${toX(chartData.length - 1)},${h - padY} L${toX(0)},${h - padY} Z`;

    const isPositive = chartData[chartData.length - 1].price >= chartData[0].price;
    const lineColor = isPositive ? 'var(--color-positive)' : 'var(--color-negative)';
    const fillColor = isPositive ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)';

    return (
      <div className="relative">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-56 md:h-64"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * w;
            const idx = Math.round(((x - padX) / (w - 2 * padX)) * (chartData.length - 1));
            if (idx >= 0 && idx < chartData.length) {
              setHoveredPoint(chartData[idx]);
            }
          }}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((pct) => (
            <line
              key={pct}
              x1={padX}
              y1={padY + pct * (h - 2 * padY)}
              x2={w - padX}
              y2={padY + pct * (h - 2 * padY)}
              stroke="var(--color-border)"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          ))}
          {/* Area */}
          <path d={areaPath} fill={fillColor} />
          {/* Line */}
          <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* Hover tooltip */}
        {hoveredPoint && (
          <div className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-xs">
            <span className="text-[var(--color-text-muted)]">
              {new Date(hoveredPoint.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <span className="ml-2 font-mono font-medium text-[var(--color-text-primary)]">
              {fmtPrice(hoveredPoint.price)} €
            </span>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-8">
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !coinData) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-8 text-center">
        <p className="text-sm text-[var(--color-negative)]">{error || 'Données indisponibles'}</p>
        <button
          onClick={fetchCoinData}
          className="mt-3 text-sm text-[var(--color-gold)] hover:underline cursor-pointer"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const md = coinData.market_data;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 overflow-hidden">
      {/* Price Hero */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 text-xs font-mono text-[var(--color-text-muted)] border border-[var(--color-border)] rounded">
                #{md.market_cap_rank}
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">{symbol}</span>
            </div>
            <p
              className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {fmtPrice(md.current_price.eur)} <span className="text-xl text-[var(--color-text-muted)]">€</span>
            </p>
          </div>
          <div className="text-right">
            <span
              className={`inline-block px-3 py-1.5 rounded-lg text-sm font-semibold ${changeBg(md.price_change_percentage_24h)}`}
            >
              {md.price_change_percentage_24h >= 0 ? '+' : ''}
              {fmt(md.price_change_percentage_24h)}%
            </span>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">24h</p>
          </div>
        </div>

        {/* Period variations */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: '7 jours', value: md.price_change_percentage_7d },
            { label: '30 jours', value: md.price_change_percentage_30d },
            { label: '24h', value: md.price_change_percentage_24h },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">{item.label}</p>
              <p className={`text-sm font-semibold font-mono ${changeColor(item.value)}`}>
                {item.value >= 0 ? '+' : ''}{fmt(item.value)}%
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
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
          {/* Chart area */}
          <div className="p-4">
            {chartLoading ? (
              <div className="flex items-center justify-center h-56">
                <div className="w-5 h-5 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              renderChart()
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/50">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { label: 'Capitalisation', value: fmtCompact(md.market_cap.eur) },
            { label: 'Volume 24h', value: fmtCompact(md.total_volume.eur) },
            {
              label: 'ATH',
              value: `${fmtPrice(md.ath.eur)} €`,
              sub: new Date(md.ath_date.eur).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
            },
            {
              label: 'Supply',
              value: md.max_supply
                ? `${fmt(md.circulating_supply / 1e6, 1)}M / ${fmt(md.max_supply / 1e6, 1)}M`
                : `${fmt(md.circulating_supply / 1e6, 1)}M`,
              sub: md.max_supply
                ? `${fmt((md.circulating_supply / md.max_supply) * 100, 1)}% en circulation`
                : 'Pas de supply max',
            },
          ].map((stat) => (
            <div key={stat.label} className="p-4 md:p-5 border-b border-r border-[var(--color-border)] last:border-r-0">
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-sm font-semibold font-mono text-[var(--color-text-primary)]">{stat.value}</p>
              {stat.sub && <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{stat.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Refresh */}
      <div className="px-6 py-3 border-t border-[var(--color-border)] flex justify-between items-center">
        <p className="text-[10px] text-[var(--color-text-muted)]">
          Données CoinGecko — actualisées chaque minute
        </p>
        <button
          onClick={fetchCoinData}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors cursor-pointer flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Rafraîchir
        </button>
      </div>
    </div>
  );
}
