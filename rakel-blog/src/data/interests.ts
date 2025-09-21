/**
 * 兴趣爱好数据
 */

import { Interest } from '../types';

export const interests: Interest[] = [
  // 游戏类
  {
    id: 'honor-of-kings',
    category: 'game',
    name: '王者荣耀',
    icon: '👑',
    level: 4,
    description: '最喜欢的MOBA游戏，享受团队合作的乐趣',
    achievements: [
      '最高段位：王者20星',
      '擅长位置：中单/射手',
      '本命英雄：貂蝉、公孙离',
    ],
    recent: '刚刚拿了个五杀！',
  },
  {
    id: 'arknights',
    category: 'game',
    name: '明日方舟',
    icon: '🛡️',
    level: 5,
    description: '策略塔防游戏，喜欢收集干员和研究阵容搭配',
    achievements: [
      '全干员收集率90%+',
      '危机合约18等级通关',
      '肉鸽全结局达成',
    ],
    recent: '新活动剧情好感人QAQ',
  },
  {
    id: 'age-of-empires',
    category: 'game',
    name: '帝国时代',
    icon: '🏰',
    level: 3,
    description: '经典RTS游戏，喜欢历史题材和策略对战',
    achievements: [
      '完成所有战役',
      '多人对战胜率60%+',
      '最爱文明：中国、拜占庭',
    ],
    recent: '正在学习新的快攻战术',
  },
  {
    id: 'red-alert',
    category: 'game',
    name: '红色警戒',
    icon: '🎖️',
    level: 3,
    description: '童年回忆，经典即时战略游戏',
    achievements: [
      '全关卡通关',
      '精通苏联和盟军',
      '会各种奇葩战术',
    ],
    recent: '和朋友联机对战超开心',
  },

  // 技术类
  {
    id: 'cursor',
    category: 'tech',
    name: 'Cursor',
    icon: '💻',
    level: 4,
    description: 'AI辅助编程神器，大大提升了编码效率',
    achievements: [
      '日常开发主力工具',
      '熟练使用AI对话功能',
      '自定义了很多快捷键',
    ],
    recent: '用Cursor完成了这个网站！',
  },
  {
    id: 'ai-tools',
    category: 'tech',
    name: 'AI工具',
    icon: '🤖',
    level: 4,
    description: '探索和使用各种AI工具提升效率',
    achievements: [
      'ChatGPT重度用户',
      '熟悉Midjourney、Stable Diffusion',
      '会训练简单的模型',
    ],
    recent: '在研究最新的AI Agent',
  },
  {
    id: 'web-dev',
    category: 'tech',
    name: 'Web开发',
    icon: '🌐',
    level: 3,
    description: 'React生态系统爱好者',
    achievements: [
      '掌握React + TypeScript',
      '熟悉Next.js、Vite',
      '正在学习Three.js',
    ],
    recent: '完成了一个全栈项目',
  },
  {
    id: 'open-source',
    category: 'tech',
    name: '开源贡献',
    icon: '🐙',
    level: 2,
    description: '积极参与开源社区',
    achievements: [
      '给多个项目提交过PR',
      '维护自己的开源项目',
      '活跃在GitHub社区',
    ],
    recent: '第一个PR被合并了！',
  },

  // 生活类
  {
    id: 'apple-products',
    category: 'life',
    name: '苹果产品',
    icon: '🍎',
    level: 5,
    description: '苹果生态忠实用户',
    achievements: [
      'iPhone + iPad + Mac用户',
      '熟悉iOS快捷指令',
      '会简单的Swift开发',
    ],
    recent: '新iPhone真香！',
  },
  {
    id: 'travel',
    category: 'life',
    name: '旅游',
    icon: '✈️',
    level: 3,
    description: '喜欢探索新的地方，体验不同文化',
    achievements: [
      '去过5个国家',
      '日本深度游',
      '计划环游世界',
    ],
    recent: '准备去北海道看雪',
  },
  {
    id: 'movies',
    category: 'life',
    name: '电影',
    icon: '🎬',
    level: 4,
    description: '电影爱好者，各种类型都看',
    achievements: [
      '年观影量100+',
      '豆瓣标记1000+',
      '最爱科幻和悬疑',
    ],
    recent: '诺兰新片必看！',
  },
  {
    id: 'photography',
    category: 'life',
    name: '摄影',
    icon: '📷',
    level: 2,
    description: '记录生活的美好瞬间',
    achievements: [
      '手机摄影爱好者',
      '正在学习后期处理',
      'ins粉丝500+',
    ],
    recent: '拍到了超美的夕阳',
  },
  {
    id: 'reading',
    category: 'life',
    name: '阅读',
    icon: '📚',
    level: 3,
    description: '喜欢看技术书和小说',
    achievements: [
      '年阅读量30本+',
      '技术书和文学各半',
      '有自己的读书笔记',
    ],
    recent: '在读《三体》系列',
  },
  {
    id: 'music',
    category: 'life',
    name: '音乐',
    icon: '🎵',
    level: 3,
    description: '音乐是生活的调味剂',
    achievements: [
      '网易云音乐Lv.9',
      '年度听歌3000+首',
      '喜欢日语歌和纯音乐',
    ],
    recent: 'YOASOBI新歌循环中',
  },
];