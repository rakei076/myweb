export const theme = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#F5F7FA',
    accent: '#E3F2FD',
    accentGreen: '#E8F5E8',
    text: {
      primary: '#2C2C2C',
      secondary: '#666666',
      muted: '#999999'
    },
    border: '#E0E0E0',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  fonts: {
    chinese: '"Source Han Sans", "PingFang SC", "Microsoft YaHei", sans-serif',
    english: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    code: '"JetBrains Mono", "Fira Code", Consolas, monospace'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%'
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.1)'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  }
};

export type Theme = typeof theme;