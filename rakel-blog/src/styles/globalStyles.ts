import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${theme.spacing.md};
  }

  h1 { font-size: ${theme.fontSizes['4xl']}; }
  h2 { font-size: ${theme.fontSizes['3xl']}; }
  h3 { font-size: ${theme.fontSizes['2xl']}; }
  h4 { font-size: ${theme.fontSizes.xl}; }
  h5 { font-size: ${theme.fontSizes.lg}; }
  h6 { font-size: ${theme.fontSizes.md}; }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    border: none;
    background: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  code {
    font-family: ${theme.fonts.mono};
    background-color: ${theme.colors.surface};
    padding: 0.125em 0.25em;
    border-radius: ${theme.borderRadius.sm};
    font-size: 0.9em;
  }

  pre {
    font-family: ${theme.fonts.mono};
    background-color: ${theme.colors.surface};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${theme.spacing.md};
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.textLight};
    border-radius: ${theme.borderRadius.full};

    &:hover {
      background: ${theme.colors.text};
    }
  }
`;