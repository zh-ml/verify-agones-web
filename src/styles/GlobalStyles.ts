import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    line-height: 1.5;
    font-size: 16px;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.fast} ease;
    
    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${theme.space.md};
  }

  h1 {
    font-size: ${theme.fontSizes['4xl']};
  }

  h2 {
    font-size: ${theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
  }

  h4 {
    font-size: ${theme.fontSizes.xl};
  }

  h5 {
    font-size: ${theme.fontSizes.lg};
  }

  h6 {
    font-size: ${theme.fontSizes.md};
  }

  p {
    margin-bottom: ${theme.space.md};
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.space.md};
  }

  .section {
    padding: ${theme.space['2xl']} 0;
  }

  .card {
    background-color: ${theme.colors.card};
    border-radius: ${theme.radii.lg};
    box-shadow: ${theme.shadows.md};
    padding: ${theme.space.lg};
    transition: transform ${theme.transitions.normal} ease, box-shadow ${theme.transitions.normal} ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${theme.shadows.lg};
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.space.sm} ${theme.space.lg};
    border-radius: ${theme.radii.md};
    font-weight: 500;
    transition: all ${theme.transitions.fast} ease;
    border: none;
    
    &-primary {
      background-color: ${theme.colors.primary};
      color: white;
      
      &:hover {
        background-color: darken(${theme.colors.primary}, 10%);
      }
    }
    
    &-secondary {
      background-color: ${theme.colors.secondary};
      color: white;
      
      &:hover {
        background-color: darken(${theme.colors.secondary}, 10%);
      }
    }
    
    &-outline {
      background-color: transparent;
      border: 1px solid ${theme.colors.border};
      color: ${theme.colors.text.primary};
      
      &:hover {
        background-color: ${theme.colors.background};
      }
    }
  }

  .text-center {
    text-align: center;
  }

  .mt-1 { margin-top: ${theme.space.xs}; }
  .mt-2 { margin-top: ${theme.space.sm}; }
  .mt-3 { margin-top: ${theme.space.md}; }
  .mt-4 { margin-top: ${theme.space.lg}; }
  .mt-5 { margin-top: ${theme.space.xl}; }

  .mb-1 { margin-bottom: ${theme.space.xs}; }
  .mb-2 { margin-bottom: ${theme.space.sm}; }
  .mb-3 { margin-bottom: ${theme.space.md}; }
  .mb-4 { margin-bottom: ${theme.space.lg}; }
  .mb-5 { margin-bottom: ${theme.space.xl}; }

  .ml-1 { margin-left: ${theme.space.xs}; }
  .ml-2 { margin-left: ${theme.space.sm}; }
  .ml-3 { margin-left: ${theme.space.md}; }
  .ml-4 { margin-left: ${theme.space.lg}; }
  .ml-5 { margin-left: ${theme.space.xl}; }

  .mr-1 { margin-right: ${theme.space.xs}; }
  .mr-2 { margin-right: ${theme.space.sm}; }
  .mr-3 { margin-right: ${theme.space.md}; }
  .mr-4 { margin-right: ${theme.space.lg}; }
  .mr-5 { margin-right: ${theme.space.xl}; }

  .p-1 { padding: ${theme.space.xs}; }
  .p-2 { padding: ${theme.space.sm}; }
  .p-3 { padding: ${theme.space.md}; }
  .p-4 { padding: ${theme.space.lg}; }
  .p-5 { padding: ${theme.space.xl}; }
`;

export default GlobalStyles;