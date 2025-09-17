"use client";

import { Dot } from "lucide-react";
import Link from "next/link";

export function BinderSpine() {
  return (
    <div className="h-full bg-white rounded-xl border border-line shadow-sheet p-4 flex flex-col items-center gap-4 relative">
      <div className="absolute inset-y-0 right-[-12px] w-6 rounded-r-xl bg-white/70 backdrop-blur border border-line border-l-0" />
      <div className="flex flex-col items-center gap-3">
        {[0, 1, 2, 3].map((idx) => (
          <div key={idx} className="w-6 h-6 rounded-full bg-surface border border-line shadow-inner" />
        ))}
      </div>
      <div className="mt-auto text-center text-sm text-text-secondary rotate-180 [writing-mode:vertical-rl]">
        Rakel
      </div>
      <Link href="/" className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-text-secondary hover:text-text-primary inline-flex items-center">
        <Dot className="w-4 h-4" />首页
      </Link>
    </div>
  );
}

