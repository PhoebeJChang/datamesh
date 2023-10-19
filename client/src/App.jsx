import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout, Register, Login, DashboardLayout, Landing, Error, AddMedCase, Stats, AllPatients, Profile, Admin } from './pages'
//if the export is 'default'then we don't need {}   


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
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        // add the child pages wihich connect to the dashboard pages
        path: 'dashboard',
        element: <DashboardLayout />,
        children:[
          {
            index: true,
            element:<AddMedCase />
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-patients',
            element: <AllPatients />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
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