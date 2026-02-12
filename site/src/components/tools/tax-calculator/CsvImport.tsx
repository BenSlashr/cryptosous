import { useState, useCallback } from 'react';
import type { CsvParseResult } from './types';
import { parseCsvFile } from './csv-parsers';

interface Props {
  onImport: (data: CsvParseResult) => void;
}

export default function CsvImport({ onImport }: Props) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<CsvParseResult | null>(null);
  const [fileName, setFileName] = useState('');

  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;
      const result = parseCsvFile(text);
      setPreview(result);
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith('.csv')) {
        processFile(file);
      }
    },
    [processFile],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleConfirmImport = useCallback(() => {
    if (preview) {
      onImport(preview);
      setPreview(null);
      setFileName('');
    }
  }, [preview, onImport]);

  const platformLabels: Record<string, string> = {
    binance: 'Binance',
    coinbase: 'Coinbase',
    kraken: 'Kraken',
    bybit: 'Bybit',
    bitpanda: 'Bitpanda',
    cryptocom: 'Crypto.com',
    ledger: 'Ledger Live',
    traderepublic: 'Trade Republic',
    unknown: 'Format generique',
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragging
            ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/5'
            : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
        }`}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <svg
          className="w-10 h-10 mx-auto mb-3 text-[var(--color-text-muted)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <p className="text-sm text-[var(--color-text-secondary)] mb-1">
          Glissez votre fichier CSV ici ou cliquez pour selectionner
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          Binance, Coinbase, Kraken, Trade Republic, Bybit, Bitpanda, Crypto.com, Ledger Live
        </p>
      </div>

      {/* Preview */}
      {preview && (
        <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/50 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {fileName}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Plateforme detectee : <strong className="text-[var(--color-gold)]">{platformLabels[preview.platform]}</strong>
              </p>
            </div>
            <button
              onClick={() => { setPreview(null); setFileName(''); }}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-negative)] transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded bg-[var(--color-surface)] text-center">
              <p className="text-lg font-bold text-[var(--color-positive)]">{preview.acquisitions.length}</p>
              <p className="text-xs text-[var(--color-text-muted)]">Acquisitions</p>
            </div>
            <div className="p-3 rounded bg-[var(--color-surface)] text-center">
              <p className="text-lg font-bold text-[var(--color-violet)]">{preview.cessions.length}</p>
              <p className="text-xs text-[var(--color-text-muted)]">Cessions</p>
            </div>
          </div>

          {preview.warnings.length > 0 && (
            <div className="space-y-1">
              {preview.warnings.map((w, i) => (
                <p key={i} className="text-xs text-[var(--color-gold)]">⚠ {w}</p>
              ))}
            </div>
          )}

          <button
            onClick={handleConfirmImport}
            disabled={preview.acquisitions.length === 0 && preview.cessions.length === 0}
            className="w-full py-2.5 rounded-lg bg-[var(--color-gold)] text-[var(--color-void)] font-semibold text-sm hover:bg-[var(--color-gold-light)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Importer {preview.acquisitions.length + preview.cessions.length} transactions
          </button>
        </div>
      )}

      {/* Help text */}
      <div className="p-3 rounded-lg bg-[var(--color-surface)]/50 border border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
          <strong className="text-[var(--color-text-secondary)]">Comment exporter votre CSV :</strong>
        </p>
        <ul className="mt-1.5 space-y-1 text-xs text-[var(--color-text-muted)]">
          <li><strong>Binance</strong> : Wallet → Historique des transactions → Exporter</li>
          <li><strong>Coinbase</strong> : Parametres → Rapports → Generer un rapport</li>
          <li><strong>Kraken</strong> : Historique → Exporter → Ledgers</li>
          <li><strong>Bybit</strong> : Assets → Historique → Exporter CSV</li>
          <li><strong>Bitpanda</strong> : Parametres → Historique des transactions → Telecharger CSV</li>
          <li><strong>Crypto.com</strong> : Comptes → Historique → Exporter</li>
          <li><strong>Trade Republic</strong> : via <a href="https://www.tr-exporter.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)] underline">TR Exporter</a> (extension Chrome)</li>
          <li><strong>Ledger Live</strong> : Parametres → Exporter les operations</li>
        </ul>
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          Vos donnees restent sur votre appareil. Rien n'est envoye a un serveur.
        </p>
      </div>
    </div>
  );
}
