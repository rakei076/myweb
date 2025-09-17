import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '智能打字训练平台 | 在线中文打字练习与速度测试',
    template: '%s | 智能打字训练平台'
  },
  description:
    '在线中文打字练习与速度测试平台。AI平衡难度语料、新闻练习、实时统计与结果评级，SEO友好、支持移动端。',
  keywords: [
    '在线打字练习',
    '中文打字测试',
    '打字速度测试',
    'AI打字训练',
    '新闻打字练习',
    '打字考试平台'
  ],
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: '智能打字训练平台 | 在线中文打字练习与速度测试',
    description:
      'AI平衡难度语料与新闻练习，支持实时统计、评级与历史记录。',
    siteName: 'SmartType Training'
  },
  twitter: {
    card: 'summary_large_image',
    title: '智能打字训练平台',
    description: '在线中文打字练习与速度测试，AI语料 + 新闻练习'
  },
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/',
      'en-US': '/'
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between py-6">
            <a href="/" className="flex items-center gap-2 text-xl font-semibold text-primary-700">
              <span>🧠</span>
              <span>智能打字训练平台</span>
            </a>
            <nav className="hidden gap-6 text-sm md:flex">
              <a className="hover:text-primary-600" href="/exam">考试模式</a>
              <a className="hover:text-primary-600" href="/practice">练习模式</a>
              <a className="hover:text-primary-600" href="/tutorials/typing-tips">打字技巧</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="py-10 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} SmartType Training. 保留所有权利。</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

