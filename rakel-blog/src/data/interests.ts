import { Interest } from '../types';

export const interestsData: Interest[] = [
  // 游戏类
  {
    id: 'honor-of-kings',
    category: 'game',
    name: '王者荣耀',
    icon: 'Gamepad2',
    level: 4,
    description: '热爱MOBA游戏，主玩射手和法师位置',
    achievements: ['钻石段位', '多次MVP', '团队配合达人']
  },
  {
    id: 'arknights',
    category: 'game',
    name: '明日方舟',
    icon: 'Shield',
    level: 5,
    description: '塔防策略游戏爱好者，喜欢研究关卡攻略',
    achievements: ['全三星通关', '收集控', '剧情党']
  },
  {
    id: 'age-of-empires',
    category: 'game',
    name: '帝国时代',
    icon: 'Castle',
    level: 3,
    description: '经典RTS游戏，享受建设和战略的乐趣',
    achievements: ['历史爱好者', '建设狂魔']
  },
  {
    id: 'red-alert',
    category: 'game',
    name: '红色警戒',
    icon: 'Zap',
    level: 4,
    description: '童年回忆，至今仍然热爱的经典RTS',
    achievements: ['怀旧玩家', '多人对战高手']
  },

  // 技术类
  {
    id: 'cursor',
    category: 'tech',
    name: 'Cursor',
    icon: 'Code',
    level: 5,
    description: 'AI辅助编程工具的重度使用者',
    achievements: ['效率提升专家', '早期用户', '社区贡献者']
  },
  {
    id: 'ai-tools',
    category: 'tech',
    name: 'AI工具',
    icon: 'Brain',
    level: 4,
    description: '热衷于探索各种AI工具和应用',
    achievements: ['工具收集者', '效率优化', '创新应用']
  },
  {
    id: 'web-dev',
    category: 'tech',
    name: '前端开发',
    icon: 'Monitor',
    level: 4,
    description: '专注于现代前端技术栈的学习和实践',
    achievements: ['React专家', 'TypeScript爱好者', '响应式设计']
  },

  // 生活类
  {
    id: 'apple-products',
    category: 'life',
    name: '苹果产品',
    icon: 'Smartphone',
    level: 5,
    description: '苹果生态系统的忠实用户',
    achievements: ['全家桶用户', '生产力优化', '设计美学追求者']
  },
  {
    id: 'travel',
    category: 'life',
    name: '旅游',
    icon: 'MapPin',
    level: 4,
    description: '热爱探索不同的地方和文化',
    achievements: ['多国旅行', '文化体验者', '摄影爱好']
  },
  {
    id: 'movies',
    category: 'life',
    name: '电影',
    icon: 'Film',
    level: 3,
    description: '喜欢观看各种类型的电影',
    achievements: ['影评写手', '类型片爱好者', '经典收藏']
  }
];

