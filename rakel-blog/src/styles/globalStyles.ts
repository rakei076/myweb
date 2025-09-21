/**
 * 全局样式配置
 */

import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 根元素设置 */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Body 设置 */
  body {
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSize.base};
    line-height: ${theme.lineHeight.normal};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    overflow-x: hidden;
  }

  /* 链接样式 */
  a {
    color: inherit;
    text-decoration: none;
    transition: ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }

  /* 按钮重置 */
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: none;
    background: none;
    cursor: pointer;
    transition: ${theme.transitions.fast};
  }

  /* 输入框重置 */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    transition: ${theme.transitions.fast};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(7, 193, 96, 0.1);
    }
  }

  /* 列表样式 */
  ul, ol {
    list-style: none;
  }

  /* 图片样式 */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* 标题样式 */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.fontWeight.semibold};
    line-height: ${theme.lineHeight.tight};
    color: ${theme.colors.text};
  }

  h1 {
    font-size: ${theme.fontSize.xxxl};
    margin-bottom: ${theme.spacing.xl};
  }

  h2 {
    font-size: ${theme.fontSize.xxl};
    margin-bottom: ${theme.spacing.lg};
  }

  h3 {
    font-size: ${theme.fontSize.xl};
    margin-bottom: ${theme.spacing.md};
  }

  h4 {
    font-size: ${theme.fontSize.lg};
    margin-bottom: ${theme.spacing.md};
  }

  h5 {
    font-size: ${theme.fontSize.base};
    margin-bottom: ${theme.spacing.sm};
  }

  h6 {
    font-size: ${theme.fontSize.sm};
    margin-bottom: ${theme.spacing.sm};
  }

  /* 段落样式 */
  p {
    margin-bottom: ${theme.spacing.md};
    line-height: ${theme.lineHeight.relaxed};
  }

  /* 代码样式 */
  code {
    font-family: ${theme.fonts.code};
    font-size: ${theme.fontSize.sm};
    background-color: ${theme.colors.backgroundGrey};
    padding: 2px 6px;
    border-radius: ${theme.borderRadius.sm};
  }

  pre {
    font-family: ${theme.fonts.code};
    font-size: ${theme.fontSize.sm};
    background-color: ${theme.colors.backgroundGrey};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    overflow-x: auto;
    
    code {
      background: none;
      padding: 0;
    }
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundSecondary};
    border-radius: ${theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
    
    &:hover {
      background: ${theme.colors.textLight};
    }
  }

  /* 选中文本样式 */
  ::selection {
    background-color: rgba(7, 193, 96, 0.2);
    color: ${theme.colors.text};
  }

  /* 焦点样式 */
  :focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  /* 禁用状态 */
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* 加载动画 */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  /* 活页夹特有动画 */
  @keyframes pageFlip {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(-180deg);
    }
  }

  @keyframes ringShine {
    0%, 100% {
      box-shadow: 0 0 5px rgba(192, 192, 192, 0.5);
    }
    50% {
      box-shadow: 0 0 15px rgba(192, 192, 192, 0.8);
    }
  }
`;