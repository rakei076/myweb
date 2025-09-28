export const theme = {
  colors: {
    primary: '#f7f7f7', // 主体灰白
    secondary: '#ededed', // 次级灰白
    accent: '#cccccc', // 强调色灰
    accentGreen: '#e0e0e0', // 绿色强调改为浅灰
    border: '#d1d1d1', // 边框灰
    text: {
      primary: '#232323', // 主文本深灰
      secondary: '#6b6b6b', // 次文本中灰
      muted: '#a0a0a0' // 弱化文本浅灰
    }
  },
  fonts: {
    chinese: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
    english: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    code: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    round: '50%'
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.05)'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  }
};

export type Theme = typeof theme;
