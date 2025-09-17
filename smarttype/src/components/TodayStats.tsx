'use client';

import { useEffect, useState } from 'react';
import { loadExamHistory } from '@/lib/history';

interface Stats {
  count: number;
  avgWpm: number;
  avgAcc: number; // 0..1
}

export default function TodayStats() {
  const [stats, setStats] = useState<Stats>({ count: 0, avgWpm: 0, avgAcc: 0 });

  useEffect(() => {
    const list = loadExamHistory();
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const today = list.filter((r) => r.timestamp >= cutoff);
    const count = today.length;
    const avgWpm = count ? Math.round(today.reduce((s, r) => s + r.wpm, 0) / count) : 0;
    const avgAcc = count ? today.reduce((s, r) => s + r.accuracy, 0) / count : 0;
    setStats({ count, avgWpm, avgAcc });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3 text-center text-sm">
      <div className="rounded-md bg-gray-50 p-3">
        <div className="text-gray-500">练习次数</div>
        <div className="mt-1 text-xl font-semibold">{stats.count}</div>
      </div>
      <div className="rounded-md bg-gray-50 p-3">
        <div className="text-gray-500">平均速度(WPM)</div>
        <div className="mt-1 text-xl font-semibold">{stats.avgWpm}</div>
      </div>
      <div className="rounded-md bg-gray-50 p-3">
        <div className="text-gray-500">平均准确率</div>
        <div className="mt-1 text-xl font-semibold">{Math.round(stats.avgAcc * 100)}%</div>
      </div>
    </div>
  );
}

