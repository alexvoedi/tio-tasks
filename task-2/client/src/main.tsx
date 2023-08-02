import "./reset.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { RouterProvider } from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routes.tsx";
import NavBar from "./components/nav-bar.tsx";
import { Container } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NavBar></NavBar>
    <Container>
      <RouterProvider router={router}></RouterProvider>
    </Container>
  </React.StrictMode>
);
