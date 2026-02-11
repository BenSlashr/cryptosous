import { useState } from 'react';

interface ExchangeFees {
  spotMaker: number;
  spotTaker: number;
  spotMakerWithToken: number | null;
  spotTakerWithToken: number | null;
  depositEurBank: string;
  depositEurCard: string;
  withdrawEur: string;
  withdrawBtc: string;
}

interface ExchangeEntry {
  slug: string;
  name: string;
  fees: ExchangeFees;
}

interface Props {
  currentExchange: ExchangeEntry;
  allExchanges: ExchangeEntry[];
}

const QUICK_AMOUNTS = [100, 500, 1000, 5000, 10000];

export default function ExchangeComparator({ currentExchange, allExchanges }: Props) {
  const [amount, setAmount] = useState(1000);
  const [rivalSlug, setRivalSlug] = useState(
    () => allExchanges.find(e => e.slug !== currentExchange.slug)?.slug ?? ''
  );

  const rival = allExchanges.find(e => e.slug === rivalSlug);

  const calcFee = (rate: number) => (amount * rate) / 100;
  const fmt = (n: number) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const rows = [
    {
      label: 'Frais maker',
      current: currentExchange.fees.spotMaker,
      rival: rival?.fees.spotMaker ?? 0,
    },
    {
      label: 'Frais taker',
      current: currentExchange.fees.spotTaker,
      rival: rival?.fees.spotTaker ?? 0,
    },
    ...(currentExchange.fees.spotMakerWithToken !== null || (rival?.fees.spotMakerWithToken ?? null) !== null
      ? [
          {
            label: 'Maker (avec token)',
            current: currentExchange.fees.spotMakerWithToken ?? currentExchange.fees.spotMaker,
            rival: rival?.fees.spotMakerWithToken ?? rival?.fees.spotMaker ?? 0,
          },
          {
            label: 'Taker (avec token)',
            current: currentExchange.fees.spotTakerWithToken ?? currentExchange.fees.spotTaker,
            rival: rival?.fees.spotTakerWithToken ?? rival?.fees.spotTaker ?? 0,
          },
        ]
      : []),
  ];

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 overflow-hidden">
      <div className="p-6 md:p-8">
        <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-6">
          Calculateur de frais — {currentExchange.name}
        </h3>

        {/* Amount input */}
        <div className="mb-6">
          <label className="text-sm text-[var(--color-text-muted)] mb-2 block">
            Montant de la transaction
          </label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-mono text-lg focus:border-[var(--color-gold)] focus:outline-none transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">
                EUR
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {QUICK_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  amount === a
                    ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/30'
                    : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]'
                }`}
              >
                {a.toLocaleString('fr-FR')} €
              </button>
            ))}
          </div>
        </div>

        {/* Rival selector */}
        <div className="mb-6">
          <label className="text-sm text-[var(--color-text-muted)] mb-2 block">
            Comparer avec
          </label>
          <select
            value={rivalSlug}
            onChange={(e) => setRivalSlug(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:border-[var(--color-gold)] focus:outline-none transition-colors cursor-pointer"
          >
            {allExchanges
              .filter(e => e.slug !== currentExchange.slug)
              .map(e => (
                <option key={e.slug} value={e.slug}>{e.name}</option>
              ))}
          </select>
        </div>

        {/* Comparison table */}
        {rival && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 px-3 text-[var(--color-text-muted)] text-xs uppercase tracking-wider font-medium">
                    Type
                  </th>
                  <th className="text-right py-3 px-3 text-[var(--color-gold)] font-display font-bold text-xs">
                    {currentExchange.name}
                  </th>
                  <th className="text-right py-3 px-3 text-[var(--color-violet)] font-display font-bold text-xs">
                    {rival.name}
                  </th>
                  <th className="text-right py-3 px-3 text-[var(--color-text-muted)] text-xs uppercase tracking-wider font-medium">
                    Diff.
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const feeA = calcFee(row.current);
                  const feeB = calcFee(row.rival);
                  const diff = feeA - feeB;
                  const aWins = feeA < feeB;
                  const bWins = feeB < feeA;
                  const tie = Math.abs(diff) < 0.01;

                  return (
                    <tr key={row.label} className="border-b border-[var(--color-border)]/50">
                      <td className="py-3 px-3 text-[var(--color-text-secondary)]">
                        {row.label}
                        <span className="block text-xs text-[var(--color-text-muted)]">
                          {row.current}% / {row.rival}%
                        </span>
                      </td>
                      <td className={`py-3 px-3 text-right font-mono ${aWins ? 'text-[var(--color-gold)] font-semibold' : 'text-[var(--color-text-primary)]'}`}>
                        {fmt(feeA)} €
                        {aWins && !tie && <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />}
                      </td>
                      <td className={`py-3 px-3 text-right font-mono ${bWins ? 'text-[var(--color-violet)] font-semibold' : 'text-[var(--color-text-primary)]'}`}>
                        {fmt(feeB)} €
                        {bWins && !tie && <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-violet)]" />}
                      </td>
                      <td className={`py-3 px-3 text-right font-mono text-xs ${
                        tie ? 'text-[var(--color-text-muted)]'
                          : diff < 0 ? 'text-[var(--color-positive)]'
                          : 'text-[var(--color-negative)]'
                      }`}>
                        {tie ? '=' : diff > 0 ? `+${fmt(diff)} €` : `${fmt(diff)} €`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Other fees */}
      {rival && (
        <div className="border-t border-[var(--color-border)] px-6 md:px-8 py-5">
          <p className="text-xs text-[var(--color-text-muted)] mb-3 uppercase tracking-wider font-medium">
            Autres frais
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <p className="font-display font-semibold text-[var(--color-gold)]">{currentExchange.name}</p>
              <p className="text-[var(--color-text-secondary)]">Dépôt SEPA : {currentExchange.fees.depositEurBank}</p>
              <p className="text-[var(--color-text-secondary)]">Dépôt CB : {currentExchange.fees.depositEurCard}</p>
              <p className="text-[var(--color-text-secondary)]">Retrait EUR : {currentExchange.fees.withdrawEur}</p>
              <p className="text-[var(--color-text-secondary)]">Retrait BTC : {currentExchange.fees.withdrawBtc}</p>
            </div>
            <div className="space-y-2">
              <p className="font-display font-semibold text-[var(--color-violet)]">{rival.name}</p>
              <p className="text-[var(--color-text-secondary)]">Dépôt SEPA : {rival.fees.depositEurBank}</p>
              <p className="text-[var(--color-text-secondary)]">Dépôt CB : {rival.fees.depositEurCard}</p>
              <p className="text-[var(--color-text-secondary)]">Retrait EUR : {rival.fees.withdrawEur}</p>
              <p className="text-[var(--color-text-secondary)]">Retrait BTC : {rival.fees.withdrawBtc}</p>
            </div>
          </div>
        </div>
      )}

      <div className="px-6 md:px-8 py-3 border-t border-[var(--color-border)]">
        <p className="text-[10px] text-[var(--color-text-muted)]">
          Calcul indicatif basé sur les frais standards. Les frais réels peuvent varier selon le volume et le tier VIP.
        </p>
      </div>
    </div>
  );
}
