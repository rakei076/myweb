import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'rakel-blog',
    title: '🪄 Rakel 个人博客',
    description: '基于 React + TypeScript 打造的活页夹风格博客，集成 Three.js 地球与多页面内容管理。',
    image: '',
    technologies: ['React', 'TypeScript', 'Styled Components', 'Framer Motion'],
    icon: '🪄',
    githubUrl: 'https://github.com/rakei076/rakel-blog',
    liveUrl: 'https://rakel-blog.vercel.app',
    featured: true
  },
  {
    id: 'zmail-temp-mail',
    title: '📬 ZMail 临时邮箱',
    description: 'Cloudflare Pages 上的 24 小时临时邮箱复刻项目，自动生成一次性邮箱并支持在线收信。',
    image: '',
    technologies: ['Cloudflare Pages', 'Astro', 'Tailwind CSS'],
    icon: '📬',
    githubUrl: 'https://github.com/rakei076/zmail',
    liveUrl: 'https://f10afdee.zmail-bf3.pages.dev/',
    featured: false
  },
  {
    id: 'chinese-japan-translate',
    title: '🌐 中日互译助手',
    description: '提供中文与日文互译的轻量化网页工具，基于 Cloudflare Pages 部署，界面简洁易用。',
    image: '',
    technologies: ['Cloudflare Pages', 'TypeScript', '翻译 API'],
    icon: '🌐',
    githubUrl: 'https://github.com/rakei076/chinese_japan_translate',
    liveUrl: 'https://ccb78d29.chinese-japan-translate.pages.dev/',
    featured: false
  }
];

