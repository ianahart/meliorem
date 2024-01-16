import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme.ts';
import UserContextProvider from './context/user.tsx';
import StudySetContextProvider from './context/studyset.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <UserContextProvider>
      <StudySetContextProvider>
        <App />
      </StudySetContextProvider>
    </UserContextProvider>
  </ChakraProvider>
);
