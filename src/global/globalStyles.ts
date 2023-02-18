import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}
  body {
    font-family: 'Roboto', sans-serif;
    width: 500px;
    margin: auto;
    background-color: #eee;
  }
  #root {
    width: 100%;
    height: 100vh;
    background-color: #fff;
  }
`;

export default GlobalStyles;
