import { NavItem } from '../types';

export const navigationItems: NavItem[] = [
  {
    id: 'intro',
    title: '自我介绍',
    path: '/',
    icon: 'User'
  },
  {
    id: 'interests',
    title: '兴趣爱好',
    path: '/interests',
    icon: 'Heart'
  },
  {
    id: 'projects',
    title: '作品展示',
    path: '/projects',
    icon: 'Code'
  },
  {
    id: 'travel',
    title: '旅游经历',
    path: '/travel',
    icon: 'MapPin'
  },
  {
    id: 'blog',
    title: '文章分享',
    path: '/blog',
    icon: 'PenTool'
  },
  {
    id: 'skills',
    title: '技术栈',
    path: '/skills',
    icon: 'Zap'
  },
  {
    id: 'timeline',
    title: '成长时间轴',
    path: '/timeline',
    icon: 'Clock'
  },
  {
    id: 'bookmarks',
    title: '友链书签',
    path: '/bookmarks',
    icon: 'Bookmark'
  },
  {
    id: 'guestbook',
    title: '留言板',
    path: '/guestbook',
    icon: 'MessageCircle'
  }
];

