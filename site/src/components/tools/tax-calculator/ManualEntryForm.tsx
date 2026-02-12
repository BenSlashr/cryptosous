import { useState } from 'react';
import type { Acquisition, Cession } from './types';
import { generateId } from './constants';

const inputClass =
  'w-full px-3 py-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold)] text-sm';
const labelClass =
  'block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5';
const btnPrimary =
  'px-4 py-2.5 rounded-lg bg-[var(--color-gold)] text-[var(--color-void)] font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors cursor-pointer';

interface Props {
  onAddAcquisition: (a: Acquisition) => void;
  onAddCession: (c: Cession) => void;
}

export default function ManualEntryForm({ onAddAcquisition, onAddCession }: Props) {
  const [mode, setMode] = useState<'acquisition' | 'cession'>('acquisition');

  // Acquisition fields
  const [acqDate, setAcqDate] = useState('');
  const [acqMontant, setAcqMontant] = useState('');
  const [acqDesc, setAcqDesc] = useState('');

  // Cession fields
  const [cesDate, setCesDate] = useState('');
  const [cesPc, setCesPc] = useState('');
  const [cesVgp, setCesVgp] = useState('');
  const [cesDesc, setCesDesc] = useState('');

  const handleAddAcquisition = () => {
    const montant = parseFloat(acqMontant);
    if (!acqDate || !montant || montant <= 0) return;
    onAddAcquisition({
      id: generateId(),
      date: acqDate,
      montantEur: montant,
      description: acqDesc || 'Achat crypto',
    });
    setAcqMontant('');
    setAcqDesc('');
  };

  const handleAddCession = () => {
    const pc = parseFloat(cesPc);
    const vgp = parseFloat(cesVgp);
    if (!cesDate || !pc || pc <= 0 || !vgp || vgp <= 0) return;
    onAddCession({
      id: generateId(),
      date: cesDate,
      description: cesDesc || 'Vente crypto',
      prixDeCession: pc,
      valeurGlobalePortefeuille: vgp,
    });
    setCesPc('');
    setCesVgp('');
    setCesDesc('');
  };

  return (
    <div className="space-y-4">
      {/* Toggle acquisition / cession */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('acquisition')}
          className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
            mode === 'acquisition'
              ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
              : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]'
          }`}
        >
          + Acquisition (achat)
        </button>
        <button
          onClick={() => setMode('cession')}
          className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
            mode === 'cession'
              ? 'border-[var(--color-violet)] bg-[var(--color-violet)]/10 text-[var(--color-violet)]'
              : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]'
          }`}
        >
          + Cession (vente)
        </button>
      </div>

      {mode === 'acquisition' ? (
        <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/50 space-y-3">
          <p className="text-xs text-[var(--color-text-muted)]">
            Ajoutez chaque achat de crypto (en euros). Le total forme votre Prix Total d'Acquisition (PTA).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Date</label>
              <input type="date" value={acqDate} onChange={(e) => setAcqDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Montant (EUR)</label>
              <input
                type="number"
                value={acqMontant}
                onChange={(e) => setAcqMontant(e.target.value)}
                placeholder="1000"
                min="0"
                step="0.01"
                className={`${inputClass} font-mono`}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Description (optionnel)</label>
            <input
              type="text"
              value={acqDesc}
              onChange={(e) => setAcqDesc(e.target.value)}
              placeholder="Ex: Achat BTC sur Binance"
              className={inputClass}
            />
          </div>
          <button onClick={handleAddAcquisition} className={btnPrimary}>
            Ajouter l'acquisition
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/50 space-y-3">
          <p className="text-xs text-[var(--color-text-muted)]">
            Ajoutez chaque vente de crypto contre des euros. Le VGP est la valeur totale de votre portefeuille au moment de la vente.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Date</label>
              <input type="date" value={cesDate} onChange={(e) => setCesDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Prix de cession (EUR)</label>
              <input
                type="number"
                value={cesPc}
                onChange={(e) => setCesPc(e.target.value)}
                placeholder="500"
                min="0"
                step="0.01"
                className={`${inputClass} font-mono`}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Valeur globale portefeuille (EUR)</label>
            <input
              type="number"
              value={cesVgp}
              onChange={(e) => setCesVgp(e.target.value)}
              placeholder="5000"
              min="0"
              step="0.01"
              className={`${inputClass} font-mono`}
            />
          </div>
          <div>
            <label className={labelClass}>Description (optionnel)</label>
            <input
              type="text"
              value={cesDesc}
              onChange={(e) => setCesDesc(e.target.value)}
              placeholder="Ex: Vente ETH pour EUR"
              className={inputClass}
            />
          </div>
          <button onClick={handleAddCession} className={btnPrimary}>
            Ajouter la cession
          </button>
        </div>
      )}
    </div>
  );
}
