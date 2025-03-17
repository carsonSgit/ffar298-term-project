"use client"

import Header from "./Header";
import Content from "./Content";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.desktopBackground};
    font-family: 'MS Sans Serif', sans-serif;
  }
`;

export default function Home() {
  return (
    <div>      
      <ThemeProvider theme={original}>
        <GlobalStyle />
        <Header />
        <Content />
      </ThemeProvider>
      
    </div>
  );
}
