import Link from 'next/link';
import type { Route } from 'next';
import { Suspense } from 'react';
import TodayStats from '@/components/TodayStats';

export default function HomePage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '智能打字训练平台',
    url: base,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${base}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
  return (
    <div className="py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mb-10 text-center">
        <h1 className="text-balance text-3xl font-bold sm:text-4xl">AI 驱动的中文打字练习与速度测试</h1>
        <p className="mt-3 text-gray-600">平衡难度语料、新闻练习、实时统计与评级，专注于提升输入效率。</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ModeCard title="考试模式" desc="固定时长，AI平衡难度语料，实时 WPM 与准确率" href={'/exam'} icon="📝" />
        <ModeCard title="练习模式" desc="来自主流媒体的新闻语料，支持分类与提示" href={'/practice'} icon="📰" />
        <ModeCard title="故事模式" desc="渐进式关卡，经典与现代故事（即将上线）" href={'/'} icon="📚" disabled />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-5">
          <h2 className="mb-3 text-lg font-semibold">今日统计</h2>
          <Suspense fallback={<div className="text-sm text-gray-500">加载中…</div>}>
            <TodayStats />
          </Suspense>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <h2 className="mb-3 text-lg font-semibold">热门新闻预览</h2>
          <NewsPreview />
        </div>
      </section>
    </div>
  );
}

function ModeCard({ title, desc, href, icon, disabled }: { title: string; desc: string; href: Route; icon: string; disabled?: boolean }) {
  const className = disabled
    ? 'pointer-events-none opacity-60'
    : 'hover:border-primary-300 hover:shadow-sm hover:shadow-primary-100';
  return (
    <Link href={href} className={`rounded-lg border bg-white p-6 transition ${className}`}>
      <div className="mb-3 text-3xl">{icon}</div>
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-1 text-sm text-gray-600">{desc}</div>
    </Link>
  );
}

function NewsPreview() {
  const items = SAMPLE_NEWS.slice(0, 6);
  return (
    <ul className="grid gap-2 text-sm">
      {items.map((t, idx) => (
        <li key={idx} className="truncate text-gray-700">• {t}</li>
      ))}
    </ul>
  );
}

const SAMPLE_NEWS: string[] = [
  '国家发布新一轮稳增长举措，强化对实体经济支持',
  '多地出台消费券政策，文旅市场迎来暑期高峰',
  '国产大模型加速落地，行业应用场景持续扩展',
  '高校科研团队发布新成果，推动关键技术突破',
  '气候变化影响加剧，城市韧性建设成为重点',
  '企业数字化转型提速，协同办公与数据治理升温',
  '交通运输优化升级，智慧出行体验不断提升'
];

