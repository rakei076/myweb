"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { computeMetrics, formatPercent, formatWpm } from '@/lib/metrics';
import { gradeResult } from '@/lib/grades';
import { saveExamRecord } from '@/lib/history';
import { sampleExamText } from '@/lib/corpus';

type Duration = 60 | 180 | 300;

export default function ExamPage() {
  const [duration, setDuration] = useState<Duration>(60);
  const [target, setTarget] = useState<string>('');
  const [typed, setTyped] = useState<string>('');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number>(60);
  const [finished, setFinished] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = sampleExamText(duration);
    setTarget(t);
    setTyped('');
    setStartedAt(null);
    setRemaining(duration);
    setFinished(false);
  }, [duration]);

  useEffect(() => {
    if (!startedAt || finished) return;
    const id = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startedAt) / 1000);
      const rem = Math.max(0, duration - elapsed);
      setRemaining(rem);
      if (rem === 0) {
        setFinished(true);
      }
    }, 200);
    return () => clearInterval(id);
  }, [startedAt, duration, finished]);

  const metrics = useMemo(() => {
    const start = startedAt ?? Date.now();
    return computeMetrics(start, typed, target);
  }, [startedAt, typed, target]);

  useEffect(() => {
    if (!finished) return;
    const grade = gradeResult(metrics.wpm, metrics.accuracy);
    saveExamRecord({
      id: `${Date.now()}`,
      timestamp: Date.now(),
      durationSec: duration,
      wpm: Math.round(metrics.wpm),
      accuracy: Math.round(metrics.accuracy * 100) / 100,
      grade
    });
  }, [finished, metrics.accuracy, metrics.wpm, duration]);

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    if (!startedAt) setStartedAt(Date.now());
    setTyped(value.slice(0, target.length));
  }

  function reset() {
    setDuration(duration); // trigger useEffect by setting state to same? we force new text:
    const t = sampleExamText(duration, Math.floor(Math.random() * 100000));
    setTarget(t);
    setTyped('');
    setStartedAt(null);
    setRemaining(duration);
    setFinished(false);
    inputRef.current?.focus();
  }

  const progress = 1 - remaining / duration;

  return (
    <div className="py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">模式：考试模式</span>
          <select
            className="rounded border px-2 py-1 text-sm"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value) as Duration)}
          >
            <option value={60}>1 分钟</option>
            <option value={180}>3 分钟</option>
            <option value={300}>5 分钟</option>
          </select>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-gray-500">WPM：</span>
            <span className="font-semibold">{formatWpm(metrics.wpm)}</span>
          </div>
          <div>
            <span className="text-gray-500">准确率：</span>
            <span className="font-semibold">{formatPercent(metrics.accuracy)}</span>
          </div>
          <div>
            <span className="text-gray-500">按键：</span>
            <span className="font-semibold">{metrics.keystrokes}</span>
          </div>
          <div>
            <span className="text-gray-500">剩余：</span>
            <span className="font-semibold">{remaining}s</span>
          </div>
        </div>
      </div>

      <div className="mb-3 h-2 w-full overflow-hidden rounded bg-gray-100">
        <div className="h-full bg-primary-500 transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      <div className="rounded-lg border bg-white p-4">
        <TargetText target={target} typed={typed} />
      </div>

      <div className="mt-4">
        <textarea
          ref={inputRef}
          className="h-36 w-full resize-none rounded-md border p-3 caret-primary focus:outline-none focus:ring-2 focus:ring-primary-300"
          placeholder="开始输入以启动计时…"
          value={typed}
          onChange={onChange}
          disabled={finished}
        />
        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <div>自动保存成绩，考试结束后可重开。</div>
          <button className="text-primary-600 hover:underline" onClick={reset}>重开本次考试</button>
        </div>
      </div>

      {finished && (
        <div className="mt-6 rounded-lg border bg-gray-50 p-4">
          <ResultSummary duration={duration} wpm={metrics.wpm} accuracy={metrics.accuracy} />
        </div>
      )}
    </div>
  );
}

function TargetText({ target, typed }: { target: string; typed: string }) {
  const cursor = typed.length;
  return (
    <div className="leading-8">
      <span className="text-gray-400">{target.slice(0, cursor)}</span>
      <span className="bg-primary-100 text-primary-700">{target[cursor] ?? ''}</span>
      <span>{target.slice(cursor + 1)}</span>
    </div>
  );
}

function ResultSummary({ duration, wpm, accuracy }: { duration: number; wpm: number; accuracy: number }) {
  const grade = gradeResult(wpm, accuracy);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-gray-600">考试结束（{duration}s）</div>
      <div className="flex items-center gap-6">
        <div>
          <div className="text-gray-500">WPM</div>
          <div className="text-xl font-semibold">{formatWpm(wpm)}</div>
        </div>
        <div>
          <div className="text-gray-500">准确率</div>
          <div className="text-xl font-semibold">{formatPercent(accuracy)}</div>
        </div>
        <div>
          <div className="text-gray-500">评级</div>
          <div className="text-xl font-semibold">{grade}</div>
        </div>
      </div>
    </div>
  );
}

