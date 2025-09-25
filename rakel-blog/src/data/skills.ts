import type { Skill } from '../types';

export const skillsData: Skill[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    level: 8,
    icon: 'Component',
    projects: ['rakel-blog', 'ai-chat-assistant', 'e-commerce-platform']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    level: 7,
    icon: 'FileCode',
    projects: ['rakel-blog', 'ai-chat-assistant', 'task-management']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    level: 9,
    icon: 'Code',
    projects: ['rakel-blog', 'weather-app', 'code-snippet-manager']
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    level: 6,
    icon: 'Layers',
    projects: ['task-management']
  },
  {
    id: 'html-css',
    name: 'HTML/CSS',
    category: 'frontend',
    level: 9,
    icon: 'Layout',
    projects: ['rakel-blog', 'ai-chat-assistant', 'weather-app']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 7,
    icon: 'Palette',
    projects: ['ai-chat-assistant']
  },
  
  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    level: 7,
    icon: 'Server',
    projects: ['ai-chat-assistant', 'e-commerce-platform', 'task-management']
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    level: 6,
    icon: 'Zap',
    projects: ['e-commerce-platform']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'backend',
    level: 6,
    icon: 'Database',
    projects: ['e-commerce-platform']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    level: 5,
    icon: 'Database',
    projects: ['ai-chat-assistant']
  },
  {
    id: 'prisma',
    name: 'Prisma',
    category: 'backend',
    level: 6,
    icon: 'Link',
    projects: ['ai-chat-assistant']
  },
  
  // Tools
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    level: 8,
    icon: 'GitBranch',
    projects: ['rakel-blog', 'ai-chat-assistant', 'task-management', 'weather-app', 'e-commerce-platform', 'code-snippet-manager']
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    level: 9,
    icon: 'Code2',
    projects: ['rakel-blog', 'ai-chat-assistant', 'task-management', 'weather-app', 'e-commerce-platform', 'code-snippet-manager']
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'tools',
    level: 9,
    icon: 'MousePointer',
    projects: ['rakel-blog', 'ai-chat-assistant']
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    level: 6,
    icon: 'Figma',
    projects: ['rakel-blog', 'weather-app']
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    level: 4,
    icon: 'Container',
    projects: ['e-commerce-platform']
  },
  
  // Languages
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    level: 5,
    icon: 'FileText',
    projects: []
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    level: 4,
    icon: 'Coffee',
    projects: []
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'languages',
    level: 3,
    icon: 'Terminal',
    projects: []
  }
];

