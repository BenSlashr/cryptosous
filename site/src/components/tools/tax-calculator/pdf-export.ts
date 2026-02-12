import type { TaxCalculationResult, Acquisition } from './types';
import { PFU_RATES } from './constants';

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString('fr-FR');
}

export async function exportTaxReport(
  result: TaxCalculationResult,
  acquisitions: Acquisition[],
): Promise<void> {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pfuRate = PFU_RATES[result.taxYear];
  let y = 20;

  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`Rapport Fiscal Crypto - Annee ${result.taxYear}`, 14, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120);
  doc.text(`Genere le ${new Date().toLocaleDateString('fr-FR')} - CryptoSous.fr`, 14, y);
  doc.setTextColor(0);
  y += 12;

  // Resume
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Resume', 14, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const summaryData = [
    ['Total des cessions', `${fmt(result.totalCessions)} EUR`],
    ['Plus-values brutes', `${fmt(result.plusValueBrute)} EUR`],
    ['Moins-values brutes', `${fmt(result.moinsValueBrute)} EUR`],
    ['Plus-value nette imposable', `${fmt(result.plusValueNette)} EUR`],
    ['Seuil 305 EUR', result.seuilExonere ? 'Exonere' : 'Depasse'],
    [`Impot PFU (${(pfuRate.total * 100).toFixed(1)}%)`, result.seuilExonere ? '0,00 EUR' : `${fmt(result.impotPfu)} EUR`],
  ];

  autoTable(doc, {
    startY: y,
    head: [],
    body: summaryData,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 80 },
      1: { halign: 'right', font: 'courier' },
    },
    margin: { left: 14 },
  });

  y = (doc as any).lastAutoTable.finalY + 12;

  // Acquisitions table
  if (acquisitions.length > 0) {
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Acquisitions', 14, y);
    y += 2;

    const totalPta = acquisitions.reduce((s, a) => s + a.montantEur, 0);

    autoTable(doc, {
      startY: y,
      head: [['Date', 'Description', 'Montant (EUR)']],
      body: [
        ...acquisitions
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((a) => [fmtDate(a.date), a.description, fmt(a.montantEur)]),
        [{ content: 'PTA Total', colSpan: 2, styles: { fontStyle: 'bold' as const } }, fmt(totalPta)],
      ],
      theme: 'striped',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [20, 29, 48] },
      columnStyles: { 2: { halign: 'right', font: 'courier' } },
      margin: { left: 14 },
    });

    y = (doc as any).lastAutoTable.finalY + 12;
  }

  // Cessions table
  if (result.cessions.length > 0) {
    // Check if we need a new page
    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Detail des cessions', 14, y);
    y += 2;

    autoTable(doc, {
      startY: y,
      head: [['Date', 'Description', 'PC', 'VGP', 'PTA', 'Plus-value']],
      body: result.cessions.map((cr) => [
        fmtDate(cr.cession.date),
        cr.cession.description,
        fmt(cr.cession.prixDeCession),
        fmt(cr.cession.valeurGlobalePortefeuille),
        fmt(cr.ptaAvantCession),
        fmt(cr.plusValue),
      ]),
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [20, 29, 48] },
      columnStyles: {
        2: { halign: 'right', font: 'courier' },
        3: { halign: 'right', font: 'courier' },
        4: { halign: 'right', font: 'courier' },
        5: { halign: 'right', font: 'courier' },
      },
      margin: { left: 14 },
    });

    y = (doc as any).lastAutoTable.finalY + 12;
  }

  // Footer disclaimer
  if (y > 260) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    'Document genere a titre informatif par CryptoSous.fr. Ne constitue pas un conseil fiscal.',
    14, 285,
  );
  doc.text(
    'Methode PMPA - Art. 150 VH bis du CGI. Verifiez avec votre comptable.',
    14, 289,
  );

  doc.save(`rapport-fiscal-crypto-${result.taxYear}.pdf`);
}
