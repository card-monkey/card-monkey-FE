import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import App from "./App";
import GlobalStyles from "./global/globalStyles";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>,
);
