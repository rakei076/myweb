export interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Interest {
  id: string;
  category: 'game' | 'tech' | 'life';
  name: string;
  icon: string;
  level: number; // 1-5
  description: string;
  achievements?: string[];
}

export interface TravelLocation {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  visitDate: string;
  photos: string[];
  description: string;
  mood: string;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishDate: string;
  tags: string[];
  featured: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'education' | 'project' | 'achievement' | 'milestone';
  icon: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description: string;
  category: 'tech' | 'entertainment' | 'learning' | 'tools';
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'languages';
  level: number; // 1-10
  icon: string;
  projects: string[]; // project ids
}

