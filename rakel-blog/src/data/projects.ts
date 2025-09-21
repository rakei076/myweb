import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: '个人博客系统',
    description: '基于React和TypeScript构建的现代化个人博客，具有响应式设计和3D动画效果。',
    technologies: ['React', 'TypeScript', 'Three.js', 'Styled Components'],
    github: 'https://github.com/username/blog',
    demo: 'https://blog.example.com',
  },
  {
    id: '2',
    title: '任务管理应用',
    description: '全栈任务管理应用，支持团队协作、实时同步和数据分析。',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/username/task-manager',
  },
  {
    id: '3',
    title: '数据可视化平台',
    description: '企业级数据可视化解决方案，支持多种图表类型和实时数据更新。',
    technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    demo: 'https://dataviz.example.com',
  },
  {
    id: '4',
    title: '电商平台',
    description: '完整的电商解决方案，包括商品管理、订单处理和支付集成。',
    technologies: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com/username/ecommerce',
  },
];