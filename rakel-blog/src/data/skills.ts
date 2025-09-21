import { Skill } from '../types';

export const skills: Skill[] = [
  // 前端技能
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'Vue.js', level: 80, category: 'Frontend' },
  { name: 'HTML/CSS', level: 95, category: 'Frontend' },
  { name: 'JavaScript', level: 90, category: 'Frontend' },
  
  // 后端技能
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Python', level: 80, category: 'Backend' },
  { name: 'Java', level: 75, category: 'Backend' },
  { name: 'Express.js', level: 85, category: 'Backend' },
  
  // 数据库
  { name: 'MongoDB', level: 80, category: 'Database' },
  { name: 'MySQL', level: 75, category: 'Database' },
  { name: 'PostgreSQL', level: 70, category: 'Database' },
  
  // DevOps
  { name: 'Docker', level: 75, category: 'DevOps' },
  { name: 'Git', level: 90, category: 'DevOps' },
  { name: 'CI/CD', level: 70, category: 'DevOps' },
];