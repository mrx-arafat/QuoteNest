import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: ${(props) => props.theme.transition};
  }

  a {
    color: ${(props) => props.theme.primary};
    text-decoration: none;
    transition: ${(props) => props.theme.transition};
    
    &:hover {
      color: ${(props) => props.theme.secondary};
    }
  }

  button, input, textarea, select {
    font-family: inherit;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.textSecondary};
  }

  /* Disable text selection on buttons */
  button {
    user-select: none;
  }

  /* Custom selection color */
  ::selection {
    background-color: ${(props) =>
      props.theme.primary}40; /* 40 = 25% opacity */
    color: ${(props) => props.theme.text};
  }
`;

export default GlobalStyles;
