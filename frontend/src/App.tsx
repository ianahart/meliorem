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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomeRoute />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/register" element={<RegisterRoute />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
