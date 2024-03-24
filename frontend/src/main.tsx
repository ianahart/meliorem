import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme.ts';
import UserContextProvider from './context/user.tsx';
import StudySetContextProvider from './context/studyset.tsx';
import ProfileContextProvider from './context/profile.tsx';
import GoalContextProvider from './context/goal.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <UserContextProvider>
      <StudySetContextProvider>
        <ProfileContextProvider>
          <GoalContextProvider>
            <App />
          </GoalContextProvider>
        </ProfileContextProvider>
      </StudySetContextProvider>
    </UserContextProvider>
  </ChakraProvider>
);
