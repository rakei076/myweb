import type { BlogPost } from '../types';

interface PatternConfig {
  background: string;
  size: string;
  opacity: number;
}

const PATTERN_CONFIG: Record<BlogPost['heroPattern'], PatternConfig> = {
  dots: {
    background: 'radial-gradient(circle at 15px 15px, rgba(255,255,255,0.45) 2px, transparent 2px)',
    size: '40px 40px',
    opacity: 0.35
  },
  waves: {
    background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 12px, transparent 12px, transparent 24px)',
    size: '220px 220px',
    opacity: 0.35
  },
  grid: {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.25) 1px, transparent 1px)',
    size: '48px 48px',
    opacity: 0.28
  },
  mesh: {
    background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4), transparent 60%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.3), transparent 50%)',
    size: '200px 200px',
    opacity: 0.55
  }
};

export const getPatternConfig = (pattern: BlogPost['heroPattern']): PatternConfig => PATTERN_CONFIG[pattern];
