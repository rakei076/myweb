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
  heroTagline?: string;
  heroHighlight?: string;
  heroBackground?: string;
  heroBackgroundImage?: string;
}

export interface TravelLocation {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  visitDate: string;
  photos: string[];
  description: string;
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
  readingTime: string;
  coverImage?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'education' | 'project' | 'achievement' | 'milestone' | 'blog';
  icon: string;
  relatedPostId?: string;
}

export interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  location?: string;
  highlight?: boolean;
  reply?: string;
}

