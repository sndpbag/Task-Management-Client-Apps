import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";
import ErrorPage from "../Components/ErrorPage";
import PrivateRoute from "./PrivateRoute";
 
 

  const Router = createBrowserRouter([
    {
      path:"*",
      element:<ErrorPage></ErrorPage>
    },
    {
      path: "/",
      element: <Login></Login>,
       
    },
    {
        path: "dashboard",
        element: <PrivateRoute> <Dashboard></Dashboard></PrivateRoute>
    },
  
  ]);

export default Router;