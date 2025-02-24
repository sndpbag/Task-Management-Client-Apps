import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";

 

const PrivateRoute = ({children}) => {

    const {user,loading} = useContext(AuthContext);
    
    if(loading)
    {
        return ( 
        <div className=" w-full h-screen flex justify-center items-center">
        <h1 className="text-2xl">Loading...</h1>
        </div>
        )
       
    }



    if(user)
    {
        return  children;
    }


    return  <Navigate to='/'></Navigate>;
};

export default PrivateRoute;