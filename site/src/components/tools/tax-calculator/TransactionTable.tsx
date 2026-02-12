import type { Acquisition, Cession } from './types';

const thClass = 'text-left text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider py-2 px-3';
const tdClass = 'py-2 px-3 text-sm';

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

interface Props {
  acquisitions: Acquisition[];
  cessions: Cession[];
  onRemoveAcquisition: (id: string) => void;
  onRemoveCession: (id: string) => void;
  onUpdateCession?: (id: string, field: keyof Cession, value: string | number) => void;
}

export default function TransactionTable({
  acquisitions,
  cessions,
  onRemoveAcquisition,
  onRemoveCession,
  onUpdateCession,
}: Props) {
  const totalPta = acquisitions.reduce((s, a) => s + a.montantEur, 0);

  if (acquisitions.length === 0 && cessions.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-[var(--color-text-muted)]">
        Aucune transaction. Ajoutez des acquisitions et des cessions ci-dessus.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Acquisitions */}
      {acquisitions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              Acquisitions ({acquisitions.length})
            </h3>
            <span className="text-xs font-mono text-[var(--color-gold)]">
              PTA = {fmt(totalPta)} EUR
            </span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
            <table className="w-full min-w-[400px]">
              <thead className="bg-[var(--color-surface)]">
                <tr>
                  <th className={thClass}>Date</th>
                  <th className={thClass}>Description</th>
                  <th className={`${thClass} text-right`}>Montant</th>
                  <th className={`${thClass} w-10`}></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {[...acquisitions]
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((acq) => (
                    <tr key={acq.id} className="hover:bg-[var(--color-surface-hover)]/30">
                      <td className={`${tdClass} font-mono text-xs`}>{fmtDate(acq.date)}</td>
                      <td className={`${tdClass} text-[var(--color-text-secondary)]`}>{acq.description}</td>
                      <td className={`${tdClass} text-right font-mono text-[var(--color-positive)]`}>
                        +{fmt(acq.montantEur)} EUR
                      </td>
                      <td className={tdClass}>
                        <button
                          onClick={() => onRemoveAcquisition(acq.id)}
                          className="text-[var(--color-text-muted)] hover:text-[var(--color-negative)] transition-colors cursor-pointer"
                          title="Supprimer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cessions */}
      {cessions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
            Cessions ({cessions.length})
          </h3>
          <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
            <table className="w-full min-w-[400px]">
              <thead className="bg-[var(--color-surface)]">
                <tr>
                  <th className={thClass}>Date</th>
                  <th className={thClass}>Description</th>
                  <th className={`${thClass} text-right`}>PC</th>
                  <th className={`${thClass} text-right`}>VGP</th>
                  <th className={`${thClass} w-10`}></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {[...cessions]
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((ces) => (
                    <tr key={ces.id} className="hover:bg-[var(--color-surface-hover)]/30">
                      <td className={`${tdClass} font-mono text-xs`}>{fmtDate(ces.date)}</td>
                      <td className={`${tdClass} text-[var(--color-text-secondary)]`}>{ces.description}</td>
                      <td className={`${tdClass} text-right font-mono`}>
                        {onUpdateCession ? (
                          <input
                            type="number"
                            value={ces.prixDeCession}
                            onChange={(e) => onUpdateCession(ces.id, 'prixDeCession', parseFloat(e.target.value) || 0)}
                            className="w-20 sm:w-24 px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-right text-xs font-mono text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold)]"
                          />
                        ) : (
                          <span>{fmt(ces.prixDeCession)} EUR</span>
                        )}
                      </td>
                      <td className={`${tdClass} text-right font-mono`}>
                        {onUpdateCession ? (
                          <input
                            type="number"
                            value={ces.valeurGlobalePortefeuille}
                            onChange={(e) => onUpdateCession(ces.id, 'valeurGlobalePortefeuille', parseFloat(e.target.value) || 0)}
                            className="w-20 sm:w-24 px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-right text-xs font-mono text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold)]"
                          />
                        ) : (
                          <span>{fmt(ces.valeurGlobalePortefeuille)} EUR</span>
                        )}
                      </td>
                      <td className={tdClass}>
                        <button
                          onClick={() => onRemoveCession(ces.id)}
                          className="text-[var(--color-text-muted)] hover:text-[var(--color-negative)] transition-colors cursor-pointer"
                          title="Supprimer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
