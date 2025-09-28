import type { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 'crafting-portfolio-2024',
    title: '打造具有故事感的作品集：2024 年设计回顾',
    summary: '记录我在过去一年中对作品集结构、叙事和视觉语言的升级思路，分享三条实战心得。',
    content: `过去一年里，我从“展示作品”转向“讲述作品诞生的故事”。我梳理了项目背景、目标、约束与成果，把真实的思考过程以更友好、易读的方式呈现……`,
    publishDate: '2024-12-12',
    tags: ['作品集', '设计思维', '职业成长'],
    featured: true,
    readingTime: '8 min'
  },
  {
    id: 'react-performance-journey',
    title: '一次 React 项目性能优化的旅程',
    summary: '从分析 bundle 到懒加载、骨架屏的逐步实践，整理出可复用的性能优化清单。',
    content: '在这个项目里，我从 webpack-bundle-analyzer 入手，定位首屏加载的瓶颈……',
    publishDate: '2024-09-03',
    tags: ['前端', '性能优化', 'React'],
    featured: false,
    readingTime: '10 min'
  },
  {
    id: 'designing-calming-ui',
    title: '如何设计一个“安静”的界面',
    summary: '结合留白、灰白色调和低饱和度插画，打造让人想停留的 UI 氛围。',
    content: '为了让界面更“安静”，我从排版密度、配色、动效三个方面入手……',
    publishDate: '2024-06-21',
    tags: ['UI 设计', '配色', '体验'],
    featured: false,
    readingTime: '6 min'
  },
  {
    id: 'studying-in-japan',
    title: '在日本求学的第一年：适应、挑战与灵感',
    summary: '从语言学校到研究生活，记录个人成长与文化观察的碎片。',
    content: '初到东京，我面对的是陌生的生活节奏与学习方式……',
    publishDate: '2023-11-08',
    tags: ['生活志', '留学', '成长'],
    featured: false,
    readingTime: '7 min'
  }
];
