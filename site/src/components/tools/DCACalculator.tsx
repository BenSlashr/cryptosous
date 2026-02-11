import { useState, useCallback } from 'react';

const COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
];

const FREQUENCIES = [
  { value: 7, label: 'Hebdomadaire' },
  { value: 14, label: 'Bi-mensuel' },
  { value: 30, label: 'Mensuel' },
];

interface DCAResult {
  totalInvested: number;
  totalValue: number;
  totalCoins: number;
  profit: number;
  profitPercent: number;
  avgPrice: number;
  currentPrice: number;
  dataPoints: { date: string; invested: number; value: number }[];
}

export default function DCACalculator() {
  const [coin, setCoin] = useState('bitcoin');
  const [amount, setAmount] = useState('100');
  const [frequency, setFrequency] = useState(30);
  const [months, setMonths] = useState(12);
  const [result, setResult] = useState<DCAResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculate = useCallback(async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const days = months * 30;
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=eur&days=${days}`
      );
      if (!res.ok) throw new Error('Erreur API');
      const data = await res.json();
      const priceHistory: [number, number][] = data.prices;

      if (!priceHistory || priceHistory.length === 0) {
        throw new Error('Pas de données disponibles');
      }

      const investAmount = parseFloat(amount) || 100;
      const intervalMs = frequency * 24 * 60 * 60 * 1000;
      const startTime = priceHistory[0][0];
      const endTime = priceHistory[priceHistory.length - 1][0];

      let totalCoins = 0;
      let totalInvested = 0;
      const dataPoints: DCAResult['dataPoints'] = [];

      const findPrice = (timestamp: number): number => {
        let closest = priceHistory[0];
        let minDiff = Math.abs(priceHistory[0][0] - timestamp);
        for (const point of priceHistory) {
          const diff = Math.abs(point[0] - timestamp);
          if (diff < minDiff) {
            minDiff = diff;
            closest = point;
          }
        }
        return closest[1];
      };

      for (let t = startTime; t <= endTime; t += intervalMs) {
        const price = findPrice(t);
        const coinsAcquired = investAmount / price;
        totalCoins += coinsAcquired;
        totalInvested += investAmount;

        const currentVal = totalCoins * findPrice(t);
        dataPoints.push({
          date: new Date(t).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
          invested: totalInvested,
          value: currentVal,
        });
      }

      const currentPrice = priceHistory[priceHistory.length - 1][1];
      const totalValue = totalCoins * currentPrice;
      const profit = totalValue - totalInvested;
      const profitPercent = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;
      const avgPrice = totalInvested / totalCoins;

      setResult({
        totalInvested,
        totalValue,
        totalCoins,
        profit,
        profitPercent,
        avgPrice,
        currentPrice,
        dataPoints,
      });
    } catch {
      setError('Impossible de récupérer les données historiques. Réessayez.');
    } finally {
      setLoading(false);
    }
  }, [coin, amount, frequency, months]);

  const coinData = COINS.find((c) => c.id === coin);

  const fmt = (n: number) =>
    n.toLocaleString('fr-FR', { maximumFractionDigits: 2 });

  // Simple SVG chart
  const renderChart = () => {
    if (!result || result.dataPoints.length < 2) return null;
    const points = result.dataPoints;
    const maxVal = Math.max(...points.map((p) => Math.max(p.invested, p.value)));
    const w = 600;
    const h = 200;
    const pad = 10;

    const toX = (i: number) => pad + (i / (points.length - 1)) * (w - 2 * pad);
    const toY = (val: number) => h - pad - (val / maxVal) * (h - 2 * pad);

    const investedPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(p.invested)}`).join(' ');
    const valuePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(p.value)}`).join(' ');

    // Area fill for value
    const valueArea = `${valuePath} L${toX(points.length - 1)},${h - pad} L${toX(0)},${h - pad} Z`;

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48 md:h-56 mt-4">
        {/* Value area fill */}
        <path d={valueArea} fill="rgba(245, 158, 11, 0.1)" />
        {/* Invested line */}
        <path d={investedPath} fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="4 4" />
        {/* Value line */}
        <path d={valuePath} fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
      {/* Form */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Crypto */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
            Cryptomonnaie
          </label>
          <select
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold)] cursor-pointer"
          >
            {COINS.map((c) => (
              <option key={c.id} value={c.id}>{c.symbol} - {c.name}</option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
            Montant par achat (EUR)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold)] font-mono"
            placeholder="100"
          />
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
            Fréquence d'achat
          </label>
          <div className="grid grid-cols-3 gap-2">
            {FREQUENCIES.map((f) => (
              <button
                key={f.value}
                onClick={() => setFrequency(f.value)}
                className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                  frequency === f.value
                    ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
            Période : {months} mois
          </label>
          <input
            type="range"
            min="3"
            max="60"
            step="3"
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value))}
            className="w-full mt-2 accent-[var(--color-gold)] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mt-1">
            <span>3 mois</span>
            <span>1 an</span>
            <span>2 ans</span>
            <span>5 ans</span>
          </div>
        </div>
      </div>

      {/* Calculate button */}
      <button
        onClick={calculate}
        disabled={loading}
        className="w-full py-3.5 rounded-lg bg-[var(--color-gold)] text-[var(--color-void)] font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-[var(--color-void)] border-t-transparent rounded-full animate-spin" />
            Calcul en cours...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Simuler mon DCA
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-[var(--color-negative)] mt-4 text-center">{error}</p>
      )}

      {/* Results */}
      {result && (
        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Total investi</p>
              <p className="text-lg font-bold font-mono">{fmt(result.totalInvested)}\u20AC</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Valeur actuelle</p>
              <p className="text-lg font-bold font-mono text-[var(--color-gold)]">{fmt(result.totalValue)}\u20AC</p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Profit / Perte</p>
              <p className={`text-lg font-bold font-mono ${result.profit >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                {result.profit >= 0 ? '+' : ''}{fmt(result.profit)}\u20AC
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Rendement</p>
              <p className={`text-lg font-bold font-mono ${result.profitPercent >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}`}>
                {result.profitPercent >= 0 ? '+' : ''}{fmt(result.profitPercent)}%
              </p>
            </div>
          </div>

          {/* Additional info */}
          <div className="flex flex-wrap gap-6 text-sm text-[var(--color-text-secondary)] mb-4">
            <span>{coinData?.symbol} accumulés : <strong className="text-[var(--color-text-primary)] font-mono">{result.totalCoins.toFixed(6)}</strong></span>
            <span>Prix moyen d'achat : <strong className="text-[var(--color-text-primary)] font-mono">{fmt(result.avgPrice)}\u20AC</strong></span>
            <span>Prix actuel : <strong className="text-[var(--color-text-primary)] font-mono">{fmt(result.currentPrice)}\u20AC</strong></span>
          </div>

          {/* Chart */}
          <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[var(--color-text-muted)]" style={{ borderTop: '2px dashed var(--color-text-muted)' }}></span>
                Investi
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[var(--color-gold)]"></span>
                Valeur du portefeuille
              </span>
            </div>
            {renderChart()}
          </div>
        </div>
      )}
    </div>
  );
}
