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
import FolderRoute from './routes/FolderRoute';
import GroupRoute from './routes/GroupRoute';
import CreateQuizRoute from './routes/CreateQuizRoute';
import QuizRoute from './routes/QuizRoute';
import CreateStudyPlanRoute from './routes/CreateStudyPlanRoute';
import TermsOfServiceRoute from './routes/TermsOfServiceRoute';
import PrivacyPolicyRoute from './routes/PrivacyPolicyRoute';
import AdminDashboardRoute from './routes/AdminDashboardRoute';
import RequireAdmin from './components/Guard/RequireAdmin';
import AdminCreateBookRoute from './routes/AdminCreateBookRoute';
import AdminListBooksRoute from './routes/AdminListBooksRoute';
import AdminBookDetailsRoute from './routes/AdminBookDetailsRoute';
import BookDetailsRoute from './routes/BookDetailsRoute';
import GoalsRoute from './routes/GoalsRoute';
import GoalDetails from './components/Goals/GoalDetails';

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
              <Route path="/terms-of-service" element={<TermsOfServiceRoute />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyRoute />} />
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
                path="/:name/goals"
                element={
                  <RequireAuth>
                    <GoalsRoute />
                  </RequireAuth>
                }
              >
                <Route
                  path=":id"
                  element={
                    <RequireAuth>
                      <GoalDetails />
                    </RequireAuth>
                  }
                />
              </Route>
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
              <Route
                path="/folders/:folder"
                element={
                  <RequireAuth>
                    <FolderRoute />
                  </RequireAuth>
                }
              />
              <Route
                path="/groups/:groupName"
                element={
                  <RequireAuth>
                    <GroupRoute />
                  </RequireAuth>
                }
              />
              <Route
                path="/create-quiz"
                element={
                  <RequireAuth>
                    <CreateQuizRoute />
                  </RequireAuth>
                }
              />
              <Route
                path="/quiz/:id"
                element={
                  <RequireAuth>
                    <QuizRoute />
                  </RequireAuth>
                }
              />
              <Route
                path="/create-study-plan"
                element={
                  <RequireAuth>
                    <CreateStudyPlanRoute />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <RequireAdmin>
                    <AdminDashboardRoute />
                  </RequireAdmin>
                }
              >
                <Route
                  path="books/create"
                  element={
                    <RequireAdmin>
                      <AdminCreateBookRoute />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="books"
                  element={
                    <RequireAdmin>
                      <AdminListBooksRoute />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="books/:id"
                  element={
                    <RequireAdmin>
                      <AdminBookDetailsRoute />
                    </RequireAdmin>
                  }
                />
              </Route>

              <Route
                path="/books/:id"
                element={
                  <RequireAuth>
                    <BookDetailsRoute />
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
