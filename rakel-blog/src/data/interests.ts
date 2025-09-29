import type { Interest } from '../types';

export const interestsData: Interest[] = [
  // 游戏类
  {
    id: 'honor-of-kings',
    category: 'game',
    name: '王者荣耀',
    icon: 'Gamepad2',
    level: 4,
    description: '热爱MOBA游戏，主玩射手和法师位置',
    heroTagline: '峡谷团战都是提前设计好的奇袭秀',
    heroHighlight: '主玩射手 & 法师｜节奏掌控者',
    heroBackground: 'linear-gradient(135deg, #0b1f4b 0%, #243b73 45%, #b52dff 100%)',
    heroBackgroundImage: 'honor-of-kings.jpg',
    achievements: ['钻石段位', '多次MVP', '团队配合达人']
  },
  {
    id: 'arknights',
    category: 'game',
    name: '明日方舟',
    icon: 'Shield',
    level: 5,
    description: '塔防策略游戏爱好者，喜欢研究关卡攻略',
    heroTagline: '每一次调遣都是艺术与策略的交织',
    heroHighlight: '全三星博士｜活动全勤党',
    heroBackground: 'linear-gradient(135deg, #09131f 0%, #13294b 45%, #3f82ff 100%)',
    heroBackgroundImage: 'arknights.jpg',
    achievements: ['全三星通关', '收集控', '剧情党']
  },
  {
    id: 'age-of-empires',
    category: 'game',
    name: '帝国时代',
    icon: 'Castle',
    level: 3,
    description: '经典RTS游戏，享受建设和战略的乐趣',
    heroTagline: '从石器到帝国，每一步都是文明的诗篇',
    heroHighlight: '宏观运营派｜历史细节控',
    heroBackground: 'linear-gradient(135deg, #2c190f 0%, #59341d 45%, #c26b3f 100%)',
    heroBackgroundImage: 'age-of-empires.jpg',
    achievements: ['历史爱好者', '建设狂魔']
  },
  {
    id: 'red-alert',
    category: 'game',
    name: '红色警戒',
    icon: 'Zap',
    level: 4,
    description: '童年回忆，至今仍然热爱的经典RTS',
    heroTagline: '战术脑回路因警报声瞬间被点燃',
    heroHighlight: '经典联机｜即时反应高手',
    heroBackground: 'linear-gradient(135deg, #2b0005 0%, #6a0f1a 45%, #ff4d4d 100%)',
    heroBackgroundImage: 'red-alert.jpg',
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
    heroTagline: 'AI 让编码像开挂一样顺滑',
    heroHighlight: 'Prompt 工程 & 自动化流程达人',
    heroBackground: 'linear-gradient(135deg, #081221 0%, #102a43 45%, #3f8efc 100%)',
    heroBackgroundImage: 'cursor.jpg',
    achievements: ['效率提升专家', '早期用户', '社区贡献者']
  },
  {
    id: 'ai-tools',
    category: 'tech',
    name: 'AI工具',
    icon: 'Brain',
    level: 4,
    description: '热衷于探索各种AI工具和应用',
    heroTagline: '尝试每一种把灵感落地的可能性',
    heroHighlight: '效率实验室 · 持续迭代',
    heroBackground: 'linear-gradient(135deg, #061b29 0%, #10354f 45%, #2fc6ff 100%)',
    heroBackgroundImage: 'ai-tools.jpg',
    achievements: ['工具收集者', '效率优化', '创新应用']
  },
  {
    id: 'web-dev',
    category: 'tech',
    name: '前端开发',
    icon: 'Monitor',
    level: 4,
    description: '专注于现代前端技术栈的学习和实践',
    heroTagline: '把灵感敲进浏览器的那份成就感',
    heroHighlight: 'React · Three.js · 动效控',
    heroBackground: 'linear-gradient(135deg, #1b0f2e 0%, #352168 45%, #8f6bff 100%)',
    heroBackgroundImage: 'web-dev.jpg',
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
    heroTagline: '设计与效率并行的日常装备',
    heroHighlight: '跨设备无缝协作 · 体验控',
    heroBackground: 'linear-gradient(135deg, #161616 0%, #2d2d2d 45%, #9a9a9a 100%)',
    heroBackgroundImage: 'apple-products.jpg',
    achievements: ['全家桶用户', '生产力优化', '设计美学追求者']
  },
  {
    id: 'travel',
    category: 'life',
    name: '旅游',
    icon: 'MapPin',
    level: 4,
    description: '热爱探索不同的地方和文化',
    heroTagline: '用脚步丈量世界，用镜头收集故事',
    heroHighlight: '随手纪录 · 收藏地图针',
    heroBackground: 'linear-gradient(135deg, #0a2a3a 0%, #114b5f 45%, #88d498 100%)',
    heroBackgroundImage: 'travel.JPG',
    achievements: ['多国旅行', '文化体验者', '摄影爱好']
  },
  {
    id: 'movies',
    category: 'life',
    name: '电影',
    icon: 'Film',
    level: 3,
    description: '喜欢观看各种类型的电影',
    heroTagline: '光影里收藏情绪与灵感的瞬间',
    heroHighlight: '类型片杂食 | 影评习作',
    heroBackground: 'linear-gradient(135deg, #1a0d1b 0%, #3a1f47 45%, #c471ed 100%)',
    heroBackgroundImage: 'movies.jpg',
    achievements: ['影评写手', '类型片爱好者', '经典收藏']
  }
];

