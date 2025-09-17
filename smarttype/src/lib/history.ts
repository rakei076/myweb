export interface ExamResultRecord {
  id: string;
  timestamp: number;
  durationSec: number;
  wpm: number;
  accuracy: number;
  grade: string;
}

const KEY = 'smarttype_exam_history_v1';

export function loadExamHistory(): ExamResultRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as ExamResultRecord[];
    return [];
  } catch {
    return [];
  }
}

export function saveExamRecord(record: ExamResultRecord): void {
  if (typeof window === 'undefined') return;
  const list = loadExamHistory();
  list.unshift(record);
  while (list.length > 100) list.pop();
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

