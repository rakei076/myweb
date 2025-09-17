"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { computeMetrics, formatPercent, formatWpm } from '@/lib/metrics';

type Category = '综合' | '科技' | '社会' | '财经';

export default function PracticePage() {
  const [category, setCategory] = useState<Category>('综合');
  const [duration, setDuration] = useState<number>(120);
  const [sentences, setSentences] = useState<string[]>([]);
  const [target, setTarget] = useState<string>('');
  const [typed, setTyped] = useState<string>('');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number>(120);
  const [finished, setFinished] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/news?category=${encodeURIComponent(category)}`, { cache: 'no-store' });
      const data = (await res.json()) as { items: string[] };
      const filtered = data.items
        .map((s) => sanitizeNewsSentence(s))
        .filter((s) => s.length >= 10 && s.length <= 50);
      setSentences(filtered);
      const text = filtered.slice(0, 100).join('');
      setTarget(text);
      setTyped('');
      setStartedAt(null);
      setRemaining(duration);
      setFinished(false);
    }
    load();
  }, [category, duration]);

  useEffect(() => {
    if (!startedAt || finished) return;
    const id = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startedAt) / 1000);
      const rem = Math.max(0, duration - elapsed);
      setRemaining(rem);
      if (rem === 0) setFinished(true);
    }, 200);
    return () => clearInterval(id);
  }, [startedAt, duration, finished]);

  const metrics = useMemo(() => computeMetrics(startedAt ?? Date.now(), typed, target), [startedAt, typed, target]);

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    if (!startedAt) setStartedAt(Date.now());
    setTyped(value.slice(0, target.length));
  }

  const progress = 1 - remaining / duration;

  return (
    <div className="py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">模式：练习模式</span>
          <select className="rounded border px-2 py-1 text-sm" value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            <option>综合</option>
            <option>科技</option>
            <option>社会</option>
            <option>财经</option>
          </select>
          <select className="rounded border px-2 py-1 text-sm" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
            <option value={60}>1 分钟</option>
            <option value={120}>2 分钟</option>
            <option value={180}>3 分钟</option>
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
      </div>
    </div>
  );
}

function sanitizeNewsSentence(s: string): string {
  let t = s
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[A-Za-z0-9#@_<>\[\]\(\)\-~=+*/\\|`$%^]/g, '')
    .replace(/[“”"']/g, '')
    .replace(/[\s\t]+/g, '')
    .trim();
  // simple sensitive filter placeholder
  const sensitive = ['暴恐', '黄赌毒'];
  for (const w of sensitive) t = t.replaceAll(w, '***');
  return t;
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

