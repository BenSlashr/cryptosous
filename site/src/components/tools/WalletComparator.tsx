import { useState } from 'react';

interface WalletSpecs {
  screen: string;
  connectivity: string[];
  battery: string | null;
  dimensions: string;
  weight: string;
  coinsSupported: number;
  material: string;
  certifications: string[];
  openSource: boolean;
  companionApp: string;
}

interface WalletEntry {
  slug: string;
  name: string;
  price: string;
  specs: WalletSpecs;
  overallScore: number;
}

interface Props {
  currentWallet: WalletEntry;
  allWallets: WalletEntry[];
}

export default function WalletComparator({ currentWallet, allWallets }: Props) {
  const [rivalSlug, setRivalSlug] = useState(
    () => allWallets.find(w => w.slug !== currentWallet.slug)?.slug ?? ''
  );

  const rival = allWallets.find(w => w.slug === rivalSlug);

  const parseWeight = (w: string): number => parseFloat(w.replace(/[^\d.]/g, '')) || 0;
  const parsePrice = (p: string): number => parseFloat(p.replace(/[^\d.]/g, '')) || 0;

  type AdvantageResult = 'a' | 'b' | 'tie';

  const rows: Array<{
    label: string;
    valueA: string;
    valueB: string;
    advantage: AdvantageResult;
  }> = rival
    ? [
        {
          label: 'Ecran',
          valueA: currentWallet.specs.screen,
          valueB: rival.specs.screen,
          advantage: 'tie' as AdvantageResult,
        },
        {
          label: 'Connectivite',
          valueA: currentWallet.specs.connectivity.join(', '),
          valueB: rival.specs.connectivity.join(', '),
          advantage: (currentWallet.specs.connectivity.length > rival.specs.connectivity.length
            ? 'a'
            : rival.specs.connectivity.length > currentWallet.specs.connectivity.length
            ? 'b'
            : 'tie') as AdvantageResult,
        },
        {
          label: 'Batterie',
          valueA: currentWallet.specs.battery ?? 'Non',
          valueB: rival.specs.battery ?? 'Non',
          advantage: (currentWallet.specs.battery && !rival.specs.battery
            ? 'a'
            : !currentWallet.specs.battery && rival.specs.battery
            ? 'b'
            : 'tie') as AdvantageResult,
        },
        {
          label: 'Dimensions',
          valueA: currentWallet.specs.dimensions,
          valueB: rival.specs.dimensions,
          advantage: 'tie' as AdvantageResult,
        },
        {
          label: 'Poids',
          valueA: currentWallet.specs.weight,
          valueB: rival.specs.weight,
          advantage: (parseWeight(currentWallet.specs.weight) < parseWeight(rival.specs.weight)
            ? 'a'
            : parseWeight(rival.specs.weight) < parseWeight(currentWallet.specs.weight)
            ? 'b'
            : 'tie') as AdvantageResult,
        },
        {
          label: 'Cryptos supportees',
          valueA: currentWallet.specs.coinsSupported.toLocaleString('fr-FR') + '+',
          valueB: rival.specs.coinsSupported.toLocaleString('fr-FR') + '+',
          advantage: (currentWallet.specs.coinsSupported > rival.specs.coinsSupported * 1.1
            ? 'a'
            : rival.specs.coinsSupported > currentWallet.specs.coinsSupported * 1.1
            ? 'b'
            : 'tie') as AdvantageResult,
        },
        {
          label: 'Open source',
          valueA: currentWallet.specs.openSource ? 'Oui' : 'Non',
          valueB: rival.specs.openSource ? 'Oui' : 'Non',
          advantage: (currentWallet.specs.openSource === rival.specs.openSource
            ? 'tie'
            : currentWallet.specs.openSource
            ? 'a'
            : 'b') as AdvantageResult,
        },
        {
          label: 'Certifications',
          valueA: currentWallet.specs.certifications.length > 0
            ? currentWallet.specs.certifications.join(', ')
            : 'Aucune',
          valueB: rival.specs.certifications.length > 0
            ? rival.specs.certifications.join(', ')
            : 'Aucune',
          advantage: 'tie' as AdvantageResult,
        },
        {
          label: 'App compagnon',
          valueA: currentWallet.specs.companionApp,
          valueB: rival.specs.companionApp,
          advantage: 'tie' as AdvantageResult,
        },
        {
          label: 'Score global',
          valueA: `${currentWallet.overallScore}/10`,
          valueB: `${rival.overallScore}/10`,
          advantage: (currentWallet.overallScore > rival.overallScore
            ? 'a'
            : rival.overallScore > currentWallet.overallScore
            ? 'b'
            : 'tie') as AdvantageResult,
        },
        {
          label: 'Prix',
          valueA: currentWallet.price,
          valueB: rival.price,
          advantage: (parsePrice(currentWallet.price) < parsePrice(rival.price)
            ? 'a'
            : parsePrice(rival.price) < parsePrice(currentWallet.price)
            ? 'b'
            : 'tie') as AdvantageResult,
        },
      ]
    : [];

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 overflow-hidden">
      <div className="p-6 md:p-8">
        <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-6">
          Comparateur de specs — {currentWallet.name}
        </h3>

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
            {allWallets
              .filter(w => w.slug !== currentWallet.slug)
              .map(w => (
                <option key={w.slug} value={w.slug}>{w.name}</option>
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
                    Spec
                  </th>
                  <th className="text-left py-3 px-3 text-[var(--color-gold)] font-display font-bold text-xs">
                    {currentWallet.name}
                  </th>
                  <th className="text-left py-3 px-3 text-[var(--color-violet)] font-display font-bold text-xs">
                    {rival.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-surface-hover)]/30 transition-colors">
                    <td className="py-3 px-3 text-[var(--color-text-secondary)] font-medium">
                      {row.label}
                    </td>
                    <td className="py-3 px-3 text-[var(--color-text-primary)]">
                      {row.valueA}
                      {row.advantage === 'a' && (
                        <span className="ml-2 inline-block w-2 h-2 rounded-full bg-[var(--color-gold)]" title="Avantage" />
                      )}
                    </td>
                    <td className="py-3 px-3 text-[var(--color-text-primary)]">
                      {row.valueB}
                      {row.advantage === 'b' && (
                        <span className="ml-2 inline-block w-2 h-2 rounded-full bg-[var(--color-violet)]" title="Avantage" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-gold)] mr-1 align-middle" /> Avantage {currentWallet.name}
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-violet)] mr-1 ml-4 align-middle" /> Avantage {rival?.name}
        </p>
      </div>
    </div>
  );
}
