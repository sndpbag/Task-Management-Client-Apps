import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";
import ErrorPage from "../Components/ErrorPage";
 
 

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
        element: <Dashboard></Dashboard>
    },
  
  ]);

export default Router;