/**
 * 主题配置文件
 * 采用微信风格的设计语言
 */

export const theme = {
  // 颜色配置
  colors: {
    // 主色调
    primary: '#07C160', // 微信绿
    primaryLight: '#95EC69',
    primaryDark: '#06AE56',
    
    // 背景色
    background: '#FFFFFF',
    backgroundSecondary: '#F5F7FA',
    backgroundGrey: '#EDEDED',
    
    // 文本色
    text: '#000000',
    textSecondary: '#666666',
    textLight: '#999999',
    textWhite: '#FFFFFF',
    
    // 边框色
    border: '#E5E5E5',
    borderLight: '#F0F0F0',
    
    // 功能色
    success: '#07C160',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#3B82F6',
    
    // 标签色
    tag: {
      blue: '#E8F3FF',
      green: '#E8F5E8',
      yellow: '#FFF8E1',
      red: '#FFEBEE',
      purple: '#F3E8FF',
    },
    
    // 活页夹设计色
    binder: {
      cover: '#F8F9FA',
      ring: '#C0C0C0',
      paper: '#FFFFFF',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
  },
  
  // 字体配置
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif',
    code: '"JetBrains Mono", "Cascadia Code", "Source Code Pro", Consolas, Monaco, monospace',
  },
  
  // 字体大小
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
    huge: '48px',
  },
  
  // 字重
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // 行高
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  
  // 间距
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  
  // 圆角
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '24px',
    full: '50%',
    binder: '20px', // 活页夹特有圆角
  },
  
  // 阴影
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.18)',
    binder: '0 4px 12px rgba(0, 0, 0, 0.08)', // 活页夹阴影
    paper: '0 2px 8px rgba(0, 0, 0, 0.06)', // 纸张阴影
  },
  
  // 过渡动画
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
    page: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // 页面切换
  },
  
  // 媒体查询断点
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  
  // z-index 层级
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
  },
} as const;

export type Theme = typeof theme;