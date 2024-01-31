import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import LoginRoute from './routes/LoginRoute';
import RegisterRoute from './routes/RegisterRoute';
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
import WithAxios from './util/WithAxios';
import Footer from './components/Shared/Footer';
import Navigation from './components/Shared/Navigation';
import ForgotPasswordRoute from './routes/ForgotPasswordRoute';
import ResetPasswordRoute from './routes/ResetPasswordRoute';
import SingleStudySetRoute from './routes/SingleStudySetRoute';
import NotFoundRoute from './routes/NotFoundRoute';
import EditStudySetRoute from './routes/EditStudySetRoute';

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

  return (
    <>
      <Router>
        <Box as="header">
          <Navigation />
        </Box>
        <Box className="content" as="main">
          <WithAxios>
            <Routes>
              <Route
                index
                element={
                  <RequireGuest>
                    <HomeRoute />
                  </RequireGuest>
                }
              />
              <Route
                path="/login"
                element={
                  <RequireGuest>
                    <LoginRoute />
                  </RequireGuest>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <RequireGuest>
                    <ForgotPasswordRoute />
                  </RequireGuest>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <RequireGuest>
                    <ResetPasswordRoute />
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
              <Route
                path="/studysets/:studySetId"
                element={
                  <RequireAuth>
                    <SingleStudySetRoute />
                  </RequireAuth>
                }
              />
              <Route
                path="/studysets/:studySetId/edit"
                element={
                  <RequireAuth>
                    <EditStudySetRoute />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFoundRoute />} />
            </Routes>
          </WithAxios>
        </Box>
        <Footer />
      </Router>
    </>
  );
}
export default App;
