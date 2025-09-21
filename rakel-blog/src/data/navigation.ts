/**
 * 导航数据配置
 */

import { NavigationItem } from '../types';

export const navigationItems: NavigationItem[] = [
  {
    id: 'intro',
    label: '自我介绍',
    icon: '👋',
    path: '/intro',
    color: '#07C160',
  },
  {
    id: 'interests',
    label: '兴趣爱好',
    icon: '🎮',
    path: '/interests',
    color: '#FF9500',
  },
  {
    id: 'projects',
    label: '作品展示',
    icon: '💼',
    path: '/projects',
    color: '#3B82F6',
  },
  {
    id: 'travel',
    label: '旅游经历',
    icon: '🌍',
    path: '/travel',
    color: '#10B981',
  },
  {
    id: 'articles',
    label: '文章分享',
    icon: '📝',
    path: '/articles',
    color: '#8B5CF6',
  },
  {
    id: 'skills',
    label: '技术栈',
    icon: '🛠️',
    path: '/skills',
    color: '#EC4899',
  },
  {
    id: 'timeline',
    label: '成长轨迹',
    icon: '📅',
    path: '/timeline',
    color: '#F59E0B',
  },
  {
    id: 'bookmarks',
    label: '友链书签',
    icon: '🔖',
    path: '/bookmarks',
    color: '#06B6D4',
  },
  {
    id: 'guestbook',
    label: '留言板',
    icon: '💬',
    path: '/guestbook',
    color: '#EF4444',
  },
];