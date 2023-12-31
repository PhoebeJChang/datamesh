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
  AllUsers,
  AllUsersMySQL,
  AllUsersAzure,
  Profile,
  Admin,
  EditBasic,
  EditUserMongo
} from './pages'
//if the export is 'default'then we don't need {}   

import Modal from 'react-modal';
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addBasicInfoAction } from "./pages/AddBasicInfo";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allBasicInfosLoader } from "./pages/AllBasicInfos";
import { loader as allUsersLoader } from "./pages/AllUsers";
import { loader as allUsersAzureLoader } from "./pages/AllUsersAzure";
import { loader as allUsersMySQLLoader } from "./pages/AllUsersMySQL";
import { loader as editBasicLoader } from "./pages/EditBasic";
import { loader as editUserMongoLoader } from "./pages/EditUserMongo";
import EditUserMySQL, { loader as editUserMySQLLoader } from "./pages/EditUserMySQL";
import EditUserAzure, { loader as editUserAzureLoader } from "./pages/EditUserAzure";
import { action as editBasicAction } from "./pages/EditBasic";
import { action as editUserMongoAction } from "./pages/EditUserMongo";
import { action as editUserAzureAction } from "./pages/EditUserAzure";
import { action as editUserMySQLAction } from "./pages/EditUserMySQL";
import { action as deleteBasicAction } from "./pages/DeleteBasic";

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
            path: 'all-users-mongo',
            element: <AllUsers />,
            loader: allUsersLoader
          },
          {
            path: 'all-users-mysql',
            element: <AllUsersMySQL />,
            loader: allUsersMySQLLoader
          },
          {
            path: 'all-users-azure',
            element: <AllUsersAzure />,
            loader: allUsersAzureLoader
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
          {
            path: 'edit-user-mongo/:id',
            element: <EditUserMongo />,
            loader: editUserMongoLoader,
            action: editUserMongoAction,
          },
          {
            path: 'edit-user-mysql/:id',
            element: <EditUserMySQL />,
            loader: editUserMySQLLoader,
            action: editUserMySQLAction,
          },
          {
            path: 'edit-user-azure/:id',
            element: <EditUserAzure />,
            loader: editUserAzureLoader,
            action: editUserAzureAction,
          },
          {
            path: 'delete-basic/:id',
            action: deleteBasicAction,
          }
        ]
      },
    ],
  },


]);

const App = () => {
  return <RouterProvider router={router} />;

};

export default App;