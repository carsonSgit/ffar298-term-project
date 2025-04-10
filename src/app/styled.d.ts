import 'styled-components';
import { Theme as React95Theme } from 'react95';

declare module 'styled-components' {
  export interface DefaultTheme extends React95Theme {
    desktopBackground: string;
  }
} 