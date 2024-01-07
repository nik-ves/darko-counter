import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Courier New', Courier, monospace;
  }

  html {
    font-size: 62.5%; 

    @media only screen and (max-width: 1300px) {
      font-size: 50%;
    }
  }
`;

export default GlobalStyles;
