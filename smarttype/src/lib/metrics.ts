export interface TypingMetrics {
  elapsedMs: number;
  keystrokes: number;
  correctChars: number;
  totalTyped: number;
  accuracy: number; // 0..1
  cpm: number;
  wpm: number;
}

export function computeMetrics(startTimeMs: number, typed: string, target: string): TypingMetrics {
  const now = Date.now();
  const elapsedMs = Math.max(0, now - startTimeMs);
  const totalTyped = typed.length;
  let correctChars = 0;
  for (let i = 0; i < totalTyped; i++) {
    if (typed[i] === target[i]) correctChars++;
  }
  const accuracy = totalTyped === 0 ? 1 : correctChars / totalTyped;
  const minutes = Math.max(1 / 60, elapsedMs / 60000);
  const cpm = correctChars / minutes;
  const wpm = cpm / 5; // conventional
  return { elapsedMs, keystrokes: totalTyped, correctChars, totalTyped, accuracy, cpm, wpm };
}

export function formatPercent(p: number): string {
  return `${Math.round(p * 100)}%`;
}

export function formatWpm(wpm: number): string {
  return `${Math.round(wpm)}`;
}

