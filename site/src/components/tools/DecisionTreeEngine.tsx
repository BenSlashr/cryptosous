import { useState } from 'react';
import type { DecisionTreeConfig } from '@/data/decision-trees';

export default function DecisionTreeEngine({
  title,
  subtitle,
  questions,
  products,
  scoring,
}: DecisionTreeConfig) {
  type Phase = 'intro' | 'questions' | 'result';
  const [phase, setPhase] = useState<Phase>('intro');
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [fading, setFading] = useState(false);

  const totalSteps = questions.length;
  const currentQuestion = questions[step];

  const results = [...products]
    .map((p) => ({ ...p, score: scores[p.slug] || 0 }))
    .sort((a, b) => b.score - a.score);

  function handleStart() {
    setPhase('questions');
    setStep(0);
    const init: Record<string, number> = {};
    products.forEach((p) => {
      init[p.slug] = 0;
    });
    setScores(init);
  }

  function handleAnswer(answerIdx: number) {
    if (fading) return;

    const deltas = scoring[step]?.[answerIdx] || {};
    setScores((prev) => {
      const next = { ...prev };
      for (const [slug, delta] of Object.entries(deltas)) {
        next[slug] = (next[slug] || 0) + delta;
      }
      return next;
    });

    setFading(true);
    setTimeout(() => {
      if (step < totalSteps - 1) {
        setStep((s) => s + 1);
      } else {
        setPhase('result');
      }
      setFading(false);
    }, 250);
  }

  function handleReset() {
    setPhase('intro');
    setStep(0);
    setScores({});
  }

  // ── Intro ──────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="rounded-xl border border-[var(--color-violet)]/30 bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-violet)]/10 border border-[var(--color-violet)]/20 mb-4">
            <svg
              className="w-6 h-6 text-[var(--color-violet)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-2">
            {title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
            {subtitle}
          </p>
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[var(--color-violet)] text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Commencer le test
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // ── Résultat ───────────────────────────────────────────────────────────
  if (phase === 'result') {
    const top = results[0];
    const runnerUp = results[1];

    return (
      <div className="rounded-xl border border-[var(--color-violet)]/30 bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
        <div className="text-center mb-6">
          <p className="text-xs font-mono text-[var(--color-violet)] uppercase tracking-wider mb-2">
            Résultat
          </p>
          <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)]">
            Notre recommandation pour vous
          </h3>
        </div>

        {/* Top match */}
        <div className="p-5 rounded-xl border-2 border-[var(--color-gold)] bg-[var(--color-gold)]/5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <span className="text-xs font-semibold text-[var(--color-gold)] uppercase tracking-wider">
              Meilleur choix
            </span>
          </div>
          <h4 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-1">
            {top.name}
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">{top.tagline}</p>
          <a
            href={top.url}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[var(--color-gold)] text-[var(--color-void)] rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Lire l'avis complet
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Runner-up */}
        {runnerUp && (
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/30 mb-6">
            <p className="text-xs text-[var(--color-text-muted)] mb-2">Aussi recommandé :</p>
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h4 className="font-display font-semibold text-[var(--color-text-primary)]">
                  {runnerUp.name}
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] truncate">
                  {runnerUp.tagline}
                </p>
              </div>
              <a
                href={runnerUp.url}
                className="text-sm text-[var(--color-violet)] hover:underline cursor-pointer flex-shrink-0"
              >
                Voir l'avis →
              </a>
            </div>
          </div>
        )}

        {/* Reset */}
        <div className="text-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[var(--color-violet)]/10 text-[var(--color-violet)] border border-[var(--color-violet)]/20 rounded-lg hover:bg-[var(--color-violet)]/20 transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  // ── Questions ──────────────────────────────────────────────────────────
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="rounded-xl border border-[var(--color-violet)]/30 bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--color-gold), var(--color-violet))',
            }}
          />
        </div>
        <span className="text-xs font-mono text-[var(--color-text-muted)] flex-shrink-0">
          {step + 1}/{totalSteps}
        </span>
      </div>

      {/* Question + options avec transition */}
      <div
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateX(-16px)' : 'translateX(0)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] mb-5">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, i) => (
            <button
              key={`${step}-${i}`}
              onClick={() => handleAnswer(i)}
              disabled={fading}
              className="w-full text-left p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 transition-all cursor-pointer disabled:cursor-default group"
            >
              <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-gold)] transition-colors">
                {option.label}
              </span>
              {option.description && (
                <span className="block text-xs text-[var(--color-text-muted)] mt-1">
                  {option.description}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
