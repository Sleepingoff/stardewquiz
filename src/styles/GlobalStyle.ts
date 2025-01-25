import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    color: inherit;
    background-color: inherit;
    font-family: inherit;
    font-weight: inherit;
    box-sizing: border-box;
  }
  body {
    max-width: 412px;
    margin: auto;
    padding: 1rem;
    height: 100vh; //padding 제외
    background: center / cover no-repeat url("/stardewPanorama.png");

    color: #5B2B2A;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  a{
    color: inherit;
    text-decoration: none;
  }
  li {
   list-style: none;
   margin: 0.25rem;
  }
`;

export default GlobalStyle;
