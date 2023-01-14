import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";
import { TitleContextProvider } from "./contexts/titleContext";
import routes from "./routes";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TitleContextProvider>
    <RouterProvider router={router} />
  </TitleContextProvider>
);
