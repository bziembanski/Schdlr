import "./index.css";
import "regenerator-runtime/runtime";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";
import { TitleContextProvider } from "./contexts/TitleContext";
import routes from "./routes";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TitleContextProvider>
    <RouterProvider router={router} />
  </TitleContextProvider>
);
