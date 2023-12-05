import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Landing,
  Error,
  AddMedCase,
  AddBasicInfo,
  Stats,
  AllBasicInfos,
  Profile,
  Admin,
  DbsState,
  EditBasic
} from './pages'
//if the export is 'default'then we don't need {}   

import Modal from 'react-modal';
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addBasicInfoAction } from "./pages/AddBasicInfo";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allBasicInfosLoader } from "./pages/AllBasicInfos";
import { loader as editBasicLoader } from "./pages/EditBasic";
import { action as editBasicAction } from "./pages/EditBasic";

export const checkDefaultTheme = () => {
  //store the local value (string) to check if its 'true'
  const isDarkTheme =
    localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();




// router is for diff pages paths
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        // index is going to display when we go to the parent route
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction
      },
      {
        // add the child pages wihich connect to the dashboard pages
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddBasicInfo />,
            action: addBasicInfoAction
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-basicinfos',
            element: <AllBasicInfos />,
            loader: allBasicInfosLoader
          },
          {
            path: 'dbs-state',
            element: <DbsState />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'edit-basic/:id',
            element: <EditBasic />,
            loader: editBasicLoader,
            action: editBasicAction,
          },
        ]
      },
    ],
  },


]);

const App = () => {
  return <RouterProvider router={router} />;

};

export default App;