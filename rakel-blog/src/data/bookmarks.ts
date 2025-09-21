import { Bookmark } from '../types';

export const bookmarks: Bookmark[] = [
  {
    id: '1',
    title: 'React 官方文档',
    url: 'https://react.dev',
    description: 'React 最新版本的官方文档',
    category: '开发文档',
    tags: ['React', '前端'],
  },
  {
    id: '2',
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Web 开发技术的权威文档',
    category: '开发文档',
    tags: ['Web', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    id: '3',
    title: 'GitHub',
    url: 'https://github.com',
    description: '全球最大的代码托管平台',
    category: '开发工具',
    tags: ['Git', '版本控制'],
  },
  {
    id: '4',
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: '开发者问答社区',
    category: '社区',
    tags: ['编程', 'Q&A'],
  },
  {
    id: '5',
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    description: '技术新闻和讨论社区',
    category: '资讯',
    tags: ['新闻', '技术'],
  },
  {
    id: '6',
    title: 'Dev.to',
    url: 'https://dev.to',
    description: '开发者写作和分享平台',
    category: '博客',
    tags: ['博客', '教程'],
  },
];