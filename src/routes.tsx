import Auth from "./pages/Auth";
import Board from "./pages/Board";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/main";
import NewFridge from "./pages/NewFridge";
import RequireAuth from "./utils/requireAuth";
import { RouteObject } from "react-router";
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
            path: "board/:id",
            element: <Board />,
          },
          {
            path: "new",
            element: <NewFridge />,
          },
        ],
      },
      { path: "login", element: <Auth /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
];

export default routes;
