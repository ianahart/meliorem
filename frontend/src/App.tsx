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
      <Route path="/:name/latest" element={
                <RequireAuth>
                <LatestRoute />

                </RequireAuth>

            } />
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
