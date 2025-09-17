import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'rakel-blog',
    title: 'Rakel 个人博客',
    description: '基于React + TypeScript构建的现代化个人博客网站，采用活页夹设计风格，具有响应式布局和丰富的交互动画。',
    image: '/images/projects/rakel-blog.jpg',
    technologies: ['React', 'TypeScript', 'Styled Components', 'Framer Motion', 'Three.js'],
    githubUrl: 'https://github.com/rakei076/rakel-blog',
    liveUrl: 'https://rakel-blog.vercel.app',
    featured: true
  },
  {
    id: 'ai-chat-assistant',
    title: 'AI 聊天助手',
    description: '集成多种AI模型的智能聊天助手，支持上下文记忆、文件上传和多模态交互，提供流畅的对话体验。',
    image: '/images/projects/ai-chat.jpg',
    technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/rakei076/ai-chat-assistant',
    liveUrl: 'https://ai-chat-demo.vercel.app',
    featured: true
  },
  {
    id: 'task-management',
    title: '任务管理系统',
    description: '现代化的任务管理工具，支持团队协作、项目看板、时间追踪和进度分析，提高工作效率。',
    image: '/images/projects/task-manager.jpg',
    technologies: ['Vue 3', 'Composition API', 'Pinia', 'Element Plus', 'Node.js'],
    githubUrl: 'https://github.com/rakei076/task-management',
    featured: false
  },
  {
    id: 'weather-app',
    title: '天气预报应用',
    description: '精美的天气预报应用，提供实时天气、未来预报、天气地图和个性化提醒功能。',
    image: '/images/projects/weather-app.jpg',
    technologies: ['React Native', 'Expo', 'Weather API', 'Async Storage', 'React Navigation'],
    githubUrl: 'https://github.com/rakei076/weather-app',
    liveUrl: 'https://expo.dev/@rakei076/weather-app',
    featured: false
  },
  {
    id: 'e-commerce-platform',
    title: '电商平台',
    description: '全栈电商平台，包含商品管理、购物车、支付系统、用户管理和订单追踪等完整功能。',
    image: '/images/projects/ecommerce.jpg',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT'],
    githubUrl: 'https://github.com/rakei076/ecommerce-platform',
    featured: true
  },
  {
    id: 'code-snippet-manager',
    title: '代码片段管理器',
    description: '开发者工具，用于管理和分享代码片段，支持语法高亮、标签分类和快速搜索。',
    image: '/images/projects/code-snippets.jpg',
    technologies: ['Electron', 'React', 'Monaco Editor', 'SQLite', 'Fuse.js'],
    githubUrl: 'https://github.com/rakei076/code-snippet-manager',
    featured: false
  }
];