// 导航项类型
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

// 技能类型
export interface Skill {
  name: string;
  level: number;
  category: string;
}

// 项目类型
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

// 时间线项类型
export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'achievement';
}

// 旅行地点类型
export interface TravelLocation {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number];
  description?: string;
  date?: string;
}

// 兴趣类型
export interface Interest {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

// 书签类型
export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  category: string;
  tags?: string[];
}