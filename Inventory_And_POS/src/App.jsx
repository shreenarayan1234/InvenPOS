import React, { useEffect, useState, startTransition } from "react";
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./assets/css/styles.css";
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
