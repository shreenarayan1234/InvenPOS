import React, { useEffect, useState } from "react";
import "./assets/css/styles.css";
import { RouterProvider } from "react-router-dom";
import ProjectRouter from "./components/router/ProjectRouter";
import PublicRouter from "./components/router/PublicRouter";

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Auth Status:", token ? "Authenticated" : "Guest");
    setAuth(!!token);
  }, []);

  return auth ? (
    <RouterProvider router={ProjectRouter} />
  ) : (
    <RouterProvider router={PublicRouter} />
  );
};

export default App;
