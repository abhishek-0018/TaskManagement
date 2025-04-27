import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css'
import ReactDOM from 'react-dom/client';
import LandingPage from './LandingPage';
import Login from './Login';
import SignUp from './Signup';
import User from './User';
import AddNewTask from './AddNewTask';
const AppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: [<AppLayout />],
    children: [
      {
        path: "/",
        element: (
          <>
          <LandingPage/>
          </>
        ),
      },
      {
        path: "/Login",
        element: (
          <>
          <Login/>
          </>
        ),
      },
      {
        path: "/SignUp",
        element: (
          <>
          <SignUp/>
          </>
        ),
      },
      {
        path: "/User",
        element: (
          <>
          <User/>
          </>
        ),
      },
      {
        path: "/AddNewTask",
        element: (
          <>
          <AddNewTask/>
          </>
        ),
      },
    ],
  },
]);

const r = ReactDOM.createRoot(document.getElementById("root"));
r.render(<RouterProvider router={appRouter} />);
