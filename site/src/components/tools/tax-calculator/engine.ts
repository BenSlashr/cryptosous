import type {
  Acquisition,
  Cession,
  CessionResult,
  CessionStep,
  TaxCalculationResult,
  BaremeResult,
  TaxYear,
} from './types';
import { SEUIL_EXONERATION, PFU_RATES, PS_RATES, IR_TRANCHES } from './constants';

/**
 * Calcul de la plus-value sur une cession unique (methode PMPA).
 * Formule : PV = PC - (PTA x PC / VGP)
 * Nouveau PTA = PTA - (PTA x PC / VGP)
 */
export function calculateCession(
  cession: Cession,
  currentPta: number,
): CessionResult {
  const pc = cession.prixDeCession;
  const vgp = cession.valeurGlobalePortefeuille;

  const fractionPta = (currentPta * pc) / vgp;
  const plusValue = pc - fractionPta;
  const newPta = currentPta - fractionPta;

  const steps: CessionStep[] = [
    {
      label: 'Prix de cession (PC)',
      formula: `${fmt(pc)} EUR`,
      value: pc,
    },
    {
      label: 'Prix total d\'acquisition (PTA)',
      formula: `${fmt(currentPta)} EUR`,
      value: currentPta,
    },
    {
      label: 'Valeur globale du portefeuille (VGP)',
      formula: `${fmt(vgp)} EUR`,
      value: vgp,
    },
    {
      label: 'Fraction du PTA imputable',
      formula: `${fmt(currentPta)} x ${fmt(pc)} / ${fmt(vgp)} = ${fmt(fractionPta)} EUR`,
      value: fractionPta,
    },
    {
      label: 'Plus-value (ou moins-value)',
      formula: `${fmt(pc)} - ${fmt(fractionPta)} = ${fmt(plusValue)} EUR`,
      value: plusValue,
    },
  ];

  return {
    cession,
    ptaAvantCession: currentPta,
    fractionPta,
    plusValue,
    ptaApresCession: Math.max(0, newPta),
    steps,
  };
}

/**
 * Calcul complet des taxes sur toutes les cessions d'une annee.
 */
export function calculateTaxes(
  acquisitions: Acquisition[],
  cessions: Cession[],
  taxYear: TaxYear,
): TaxCalculationResult {
  // PTA initial = somme des acquisitions anterieures a chaque cession
  const sortedAcquisitions = [...acquisitions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const sortedCessions = [...cessions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // PTA = somme de toutes les acquisitions
  let currentPta = sortedAcquisitions.reduce((sum, a) => sum + a.montantEur, 0);

  const cessionResults: CessionResult[] = [];

  for (const cession of sortedCessions) {
    const result = calculateCession(cession, currentPta);
    cessionResults.push(result);
    currentPta = result.ptaApresCession;
  }

  const totalCessions = cessionResults.reduce((sum, r) => sum + r.cession.prixDeCession, 0);
  const plusValueBrute = cessionResults.reduce(
    (sum, r) => (r.plusValue > 0 ? sum + r.plusValue : sum),
    0,
  );
  const moinsValueBrute = cessionResults.reduce(
    (sum, r) => (r.plusValue < 0 ? sum + Math.abs(r.plusValue) : sum),
    0,
  );
  const plusValueNette = Math.max(0, plusValueBrute - moinsValueBrute);
  const seuilExonere = totalCessions <= SEUIL_EXONERATION;
  const impotPfu = seuilExonere ? 0 : plusValueNette * PFU_RATES[taxYear].total;

  return {
    cessions: cessionResults,
    totalCessions,
    plusValueBrute,
    moinsValueBrute,
    plusValueNette,
    seuilExonere,
    impotPfu,
    taxYear,
  };
}

/**
 * Calcul du bareme progressif (IR + PS) pour comparer avec le PFU.
 * On calcule l'IR marginal : IR(revenu + PV) - IR(revenu seul).
 * C'est le surcout d'IR cause par les plus-values crypto.
 */
export function calculateBareme(
  pvNette: number,
  revenuFiscal: number,
  nbParts: number,
  taxYear: TaxYear,
): BaremeResult {
  const tranches = IR_TRANCHES[taxYear];

  const computeIr = (revenu: number): number => {
    const qf = revenu / nbParts;
    let irPart = 0;
    for (const tranche of tranches) {
      if (qf <= tranche.min) break;
      const taxable = Math.min(qf, tranche.max) - tranche.min;
      irPart += taxable * tranche.taux;
    }
    return irPart * nbParts;
  };

  const irAvec = computeIr(revenuFiscal + pvNette);
  const irSans = computeIr(revenuFiscal);
  const irBrut = irAvec - irSans; // IR marginal imputable aux PV crypto

  const prelevementsSociaux = pvNette * PS_RATES[taxYear];
  const totalImpot = irBrut + prelevementsSociaux;
  const tauxEffectif = pvNette > 0 ? totalImpot / pvNette : 0;

  return {
    revenuImposable: revenuFiscal + pvNette,
    nbParts,
    irBrut,
    prelevementsSociaux,
    totalImpot,
    tauxEffectif,
  };
}

/**
 * Valide les donnees avant calcul.
 * Retourne un message d'erreur ou null si tout est OK.
 */
export function validateData(
  acquisitions: Acquisition[],
  cessions: Cession[],
): string | null {
  if (acquisitions.length === 0) {
    return 'Ajoutez au moins une acquisition.';
  }
  if (cessions.length === 0) {
    return 'Ajoutez au moins une cession pour calculer l\'impot.';
  }
  for (const c of cessions) {
    if (c.valeurGlobalePortefeuille <= 0) {
      return `Cession "${c.description}" : la valeur du portefeuille (VGP) doit etre superieure a zero.`;
    }
    if (c.prixDeCession > c.valeurGlobalePortefeuille) {
      return `Cession "${c.description}" : le prix de cession ne peut pas depasser la valeur du portefeuille.`;
    }
    if (c.prixDeCession <= 0) {
      return `Cession "${c.description}" : le prix de cession doit etre superieur a zero.`;
    }
  }
  return null;
}

function fmt(n: number): string {
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}
