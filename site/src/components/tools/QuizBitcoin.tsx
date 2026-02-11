import { useState, useEffect, useRef } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Props {
  title: string;
  questions: QuizQuestion[];
}

export default function QuizBitcoin({ title, questions }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const total = questions.length;

  function handleSelect(optionIndex: number) {
    if (answered) return;
    setSelectedOption(optionIndex);
    setAnswered(true);
    if (optionIndex === current.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setAnswered(false);
    }
  }

  function handleReset() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  }

  const scoreMessages: Record<number, string> = {
    0: 'Relisez l\'article !',
    1: 'Pas mal, relisez les points manques',
    2: 'Bien joue !',
    3: 'Parfait, vous maitrisez le sujet !',
  };

  // SVG circle values
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const scoreProgress = finished && visible ? (score / total) * circumference : 0;
  const scoreOffset = circumference - scoreProgress;

  if (finished) {
    return (
      <div ref={ref} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
        <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-6 text-center">
          {title} - Resultats
        </h3>

        <div className="flex flex-col items-center gap-6">
          {/* Score circle */}
          <div className="relative">
            <svg width="128" height="128" viewBox="0 0 128 128">
              <circle
                cx="64" cy="64" r={radius}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="8"
              />
              <circle
                cx="64" cy="64" r={radius}
                fill="none"
                stroke={score === total ? 'var(--color-positive)' : score >= 2 ? 'var(--color-gold)' : 'var(--color-negative)'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={scoreOffset}
                transform="rotate(-90 64 64)"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display font-extrabold text-3xl text-[var(--color-text-primary)]">
                {score}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">/ {total}</span>
            </div>
          </div>

          {/* Message */}
          <p className="text-sm text-[var(--color-text-secondary)] text-center">
            {scoreMessages[score] || 'Bien joue !'}
          </p>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20 rounded-lg hover:bg-[var(--color-gold)]/20 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refaire le quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)]/50 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)]">
          {title}
        </h3>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {questions.map((_, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full transition-colors"
              style={{
                backgroundColor:
                  i === currentIndex
                    ? 'var(--color-gold)'
                    : i < currentIndex
                    ? 'var(--color-gold)'
                    : 'var(--color-border)',
                opacity: i < currentIndex ? 0.4 : 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <p className="text-sm font-medium text-[var(--color-text-primary)] mb-4">
        Question {currentIndex + 1}/{total} : {current.question}
      </p>

      {/* Options */}
      <div className="space-y-2.5 mb-4">
        {current.options.map((option, i) => {
          let borderColor = 'var(--color-border)';
          let bgColor = 'transparent';

          if (answered) {
            if (i === current.correctIndex) {
              borderColor = 'var(--color-positive)';
              bgColor = 'rgba(34, 197, 94, 0.1)';
            } else if (i === selectedOption && i !== current.correctIndex) {
              borderColor = 'var(--color-negative)';
              bgColor = 'rgba(239, 68, 68, 0.1)';
            }
          } else if (i === selectedOption) {
            borderColor = 'var(--color-gold)';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className="w-full text-left px-4 py-3 rounded-lg border text-sm transition-all cursor-pointer disabled:cursor-default"
              style={{
                borderColor,
                backgroundColor: bgColor,
                color: 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (!answered) {
                  (e.target as HTMLElement).style.borderColor = 'var(--color-gold)';
                }
              }}
              onMouseLeave={(e) => {
                if (!answered && i !== selectedOption) {
                  (e.target as HTMLElement).style.borderColor = 'var(--color-border)';
                }
              }}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className="border-l-3 border-[var(--color-gold)] pl-4 py-2 mb-4" style={{ borderLeftWidth: '3px', borderLeftColor: 'var(--color-gold)' }}>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {current.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[var(--color-gold)] text-[var(--color-void)] rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            {isLast ? 'Voir mon score' : 'Question suivante'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
