import { Navigate, RouteObject } from "react-router";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import EditFridge from "./pages/EditFridge";
import Fridge from "./pages/Fridge";
import MainLayout from "./layouts/main";
import NewFridge from "./pages/NewFridge";
import RequireAuth from "./utils/requireAuth";
import SignUp from "./pages/SignUp";

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "fridge/:id",
            element: <Fridge />,
          },
          {
            path: "new",
            element: <NewFridge />,
          },
          {
            path: "edit/:id",
            element: <EditFridge />,
          },
        ],
      },
      { path: "login", element: <Auth /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];

export default routes;
