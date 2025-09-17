export type Grade = 'A+' | 'A' | 'B' | 'C' | 'D';

export function gradeResult(wpm: number, accuracy: number): Grade {
  // Simple rubric for Chinese typing (adjust later)
  if (wpm >= 80 && accuracy >= 0.98) return 'A+';
  if (wpm >= 70 && accuracy >= 0.96) return 'A';
  if (wpm >= 55 && accuracy >= 0.94) return 'B';
  if (wpm >= 40 && accuracy >= 0.90) return 'C';
  return 'D';
}

