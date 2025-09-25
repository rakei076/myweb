import type { TimelineEvent } from '../types';

export const timelineData: TimelineEvent[] = [
  {
    id: 'high-school-graduation',
    date: '2022-06-01',
    title: '高中毕业',
    description: '完成高中学业，开始为日本留学做准备。在这段时间里，我开始接触编程，对计算机科学产生了浓厚的兴趣。',
    type: 'education',
    icon: 'GraduationCap'
  },
  {
    id: 'first-web-project',
    date: '2022-08-15',
    title: '第一个网页项目',
    description: '使用HTML、CSS和JavaScript创建了我的第一个个人网页。虽然很简单，但这是我编程之路的起点。',
    type: 'project',
    icon: 'Code'
  },
  {
    id: 'japan-departure',
    date: '2023-09-01',
    title: '赴日留学',
    description: '踏上了前往日本的求学之路，开始了大学生活。这是人生中的一个重要转折点，充满了挑战和机遇。',
    type: 'milestone',
    icon: 'Plane'
  },
  {
    id: 'react-learning',
    date: '2023-10-20',
    title: '学习React框架',
    description: '开始深入学习React框架，这极大地提升了我的前端开发能力。从此我对现代前端开发有了更深入的理解。',
    type: 'achievement',
    icon: 'Code'
  },
  {
    id: 'first-react-app',
    date: '2023-12-10',
    title: '完成第一个React应用',
    description: '成功开发并部署了我的第一个React应用 - 一个简单的任务管理工具。这让我对全栈开发有了初步的认识。',
    type: 'project',
    icon: 'Rocket'
  },
  {
    id: 'typescript-adoption',
    date: '2024-01-15',
    title: '掌握TypeScript',
    description: '开始在项目中使用TypeScript，大大提高了代码的可维护性和开发效率。类型安全的编程方式让我受益匪浅。',
    type: 'achievement',
    icon: 'Shield'
  },
  {
    id: 'hackathon-participation',
    date: '2024-03-20',
    title: '参加编程比赛',
    description: '参加了学校组织的编程比赛，与同学们组队开发了一个AI聊天助手应用，获得了不错的成绩。',
    type: 'achievement',
    icon: 'Trophy'
  },
  {
    id: 'internship-start',
    date: '2024-06-01',
    title: '开始实习',
    description: '在一家本地科技公司开始了我的第一份实习工作，主要负责前端开发。这让我有机会在真实的商业环境中应用所学知识。',
    type: 'milestone',
    icon: 'Briefcase'
  },
  {
    id: 'open-source-contribution',
    date: '2024-08-10',
    title: '开源贡献',
    description: '开始为开源项目做贡献，提交了我的第一个Pull Request。这让我更深入地了解了开源社区的协作方式。',
    type: 'achievement',
    icon: 'GitBranch'
  },
  {
    id: 'blog-creation',
    date: '2024-12-01',
    title: '创建个人博客',
    description: '设计并开发了这个个人博客网站，采用了现代化的技术栈和活页夹设计理念。这是我技能综合运用的体现。',
    type: 'project',
    icon: 'BookOpen'
  }
];

