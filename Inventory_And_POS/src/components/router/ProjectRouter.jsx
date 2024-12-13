import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";
import Error500 from "../modules/Error500";
import Login from "../modules/auth/Login";
  // Assuming you have a Login component

const ProjectRouter = createBrowserRouter([
  {
    path: "/",
    element: <Master />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/error-500",
        element: <Error500 />,
      },
      {
        path: "/login",  // Ensure login page route is correctly mapped
        element: <Login />,
      },
    ],
  },
]);

export default ProjectRouter;
