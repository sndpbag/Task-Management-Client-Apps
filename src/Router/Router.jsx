import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";
 

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>
    }
  ]);

export default Router;