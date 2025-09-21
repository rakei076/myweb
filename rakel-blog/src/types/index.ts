/**
 * 全局类型定义
 */

// 导航项类型
export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  path: string;
  color?: string;
}

// 个人信息类型
export interface PersonalInfo {
  name: string;
  nickname: string;
  status: string;
  location: string;
  education: {
    level: string;
    school: string;
    major: string;
    year: number;
  };
  contacts: {
    email?: string;
    wechat?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
  bio: string;
}

// 兴趣爱好类型
export interface Interest {
  id: string;
  category: 'game' | 'tech' | 'life' | 'other';
  name: string;
  icon?: string;
  level?: number; // 1-5 熟练度
  description?: string;
  achievements?: string[];
  recent?: string;
}

// 项目类型
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  status: 'completed' | 'in-progress' | 'planned';
  date: string;
  featured?: boolean;
}

// 旅游地点类型
export interface TravelLocation {
  id: string;
  name: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  date: string;
  photos?: string[];
  description?: string;
  mood?: string;
  tags?: string[];
}

// 文章类型
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime?: number;
  views?: number;
  likes?: number;
}

// 技能类型
export interface Skill {
  id: string;
  category: 'language' | 'framework' | 'tool' | 'other';
  name: string;
  level: number; // 1-100 精通度
  icon?: string;
  color?: string;
  projects?: string[]; // 关联项目ID
}

// 时间轴事件类型
export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'education' | 'project' | 'achievement' | 'life' | 'other';
  icon?: string;
  color?: string;
  link?: string;
}

// 书签类型
export interface Bookmark {
  id: string;
  category: 'tech' | 'tool' | 'learning' | 'entertainment' | 'other';
  title: string;
  url: string;
  description?: string;
  favicon?: string;
  tags?: string[];
}

// 留言类型
export interface Message {
  id: string;
  author: string;
  email?: string;
  content: string;
  date: string;
  avatar?: string;
  reply?: string;
  replyDate?: string;
}

// 页面元数据类型
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
}

// 主题类型
export interface ThemeMode {
  mode: 'light' | 'dark';
}

// 活页夹页面类型
export interface BinderPage {
  id: string;
  index: number;
  component: React.ComponentType;
  title: string;
  tabColor?: string;
}