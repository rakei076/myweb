import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.chinese};
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text.primary};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  code {
    font-family: ${theme.fonts.code};
    background-color: ${theme.colors.secondary};
    padding: 2px 6px;
    border-radius: ${theme.borderRadius.sm};
    font-size: 0.9em;
  }

  pre {
    font-family: ${theme.fonts.code};
    background-color: ${theme.colors.secondary};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    overflow-x: auto;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.text.muted};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.text.secondary};
  }
`;

