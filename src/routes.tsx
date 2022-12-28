import Auth from "./pages/Auth";
import Board from "./pages/Board";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./utils/requireAuth";
import { RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "board/:id",
        element: <Board />,
      },
    ],
  },
  { path: "login", element: <Auth /> },
];

export default routes;
