"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const tabs = [
  { href: "/about", label: "自我介绍" },
  { href: "/hobbies", label: "兴趣爱好" },
  { href: "/projects", label: "作品展示" },
  { href: "/travel", label: "旅游经历" },
  { href: "/blog", label: "文章分享" },
  { href: "/tech", label: "技术栈" },
  { href: "/timeline", label: "成长时间轴" },
  { href: "/links", label: "友链书签" },
  { href: "/guestbook", label: "留言板" },
];

export function RightTabsNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white rounded-xl shadow-sheet border border-line p-3 sticky top-6">
      <ul className="space-y-2">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors border",
                  active
                    ? "bg-accent-blue/60 border-accent-blue text-text-primary"
                    : "bg-surface border-transparent text-text-secondary hover:text-text-primary hover:bg-accent-green/40"
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

