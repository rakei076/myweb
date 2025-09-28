import type { GuestbookMessage } from '../types';

export const guestbookMessages: GuestbookMessage[] = [
  {
    id: 'welcome-note',
    name: 'Rakel',
    message: '感谢来到我的小站！如果你有合作意向、想交流留学或设计经验，都欢迎留下足迹。',
    createdAt: '2025-01-02T10:00:00+09:00',
    location: '东京',
    mood: '温柔欢迎',
    highlight: true
  },
  {
    id: 'designer-friend',
    name: '彩子 Sayako',
    message: '喜欢你对灰白色的运用，特别是旅行与兴趣两页的视觉叙事，很期待后续的文章更新！',
    createdAt: '2024-12-18T14:20:00+09:00',
    location: '京都',
    mood: '灵感满满'
  },
  {
    id: 'dev-peer',
    name: 'Kensuke',
    message: 'React 项目的性能优化文章帮了我很多，愿意一起做一次分享会吗？',
    createdAt: '2024-11-05T17:45:00+09:00',
    location: '横滨',
    mood: '合作邀请',
    reply: '当然可以！我们可以先线上沟通一下议程。'
  }
];
