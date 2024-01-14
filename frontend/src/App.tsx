import './App.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import LoginRoute from './routes/LoginRoute';
import RegisterRoute from './routes/RegisterRoute';
import RootLayout from './layouts/RootLayout';
import HomeRoute from './routes/HomeRoute';
import LatestRoute from './routes/LatestRoute';
import { UserContext } from './context/user';
import { IUserContext } from './interfaces';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { Client } from './util/client';
import { retreiveTokens } from './util';
import RequireAuth from './components/Guard/RequireAuth';
import RequireGuest from './components/Guard/RequireGuest';
import NotesRoute from './routes/NotesRoute';
import StudySetRoute from './routes/StudySetRoute';
import AddFolderRoute from './routes/AddFolderRoute';
import ProfileRoute from './routes/ProfileRoute';
import SettingsRoute from './routes/SettingsRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomeRoute />} />
      <Route
        path="/login"
        element={
          <RequireGuest>
            <LoginRoute />
          </RequireGuest>
        }
      />
      <Route
        path="/register"
        element={
          <RequireGuest>
            <RegisterRoute />
          </RequireGuest>
        }
      />
      <Route
        path="/:name/latest"
        element={
          <RequireAuth>
            <LatestRoute />
          </RequireAuth>
        }
      />
      <Route
        path="/notes"
        element={
          <RequireAuth>
            <NotesRoute />
          </RequireAuth>
        }
      />
      <Route
        path="/study-set"
        element={
          <RequireAuth>
            <StudySetRoute />
          </RequireAuth>
        }
      />
      <Route
        path="/add-folder"
        element={
          <RequireAuth>
            <AddFolderRoute />
          </RequireAuth>
        }
      />
      <Route
        path="/:name/profile"
        element={
          <RequireAuth>
            <ProfileRoute />
          </RequireAuth>
        }
      />
      <Route
        path="/:name/settings"
        element={
          <RequireAuth>
            <SettingsRoute />
          </RequireAuth>
        }
      />
    </Route>
  )
);

function App() {
  const { updateUser, stowTokens } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const storeUser = useCallback(async () => {
    Client.syncUser(retreiveTokens()?.token)
      .then((res) => {
        updateUser(res.data);
        stowTokens(retreiveTokens());
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (shouldRun.current && retreiveTokens()?.token) {
      shouldRun.current = false;
      storeUser();
    }
  }, [shouldRun.current, storeUser]);

  return <RouterProvider router={router} />;
}
export default App;