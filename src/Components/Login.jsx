import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

 

const Login = () => {

    const {googleLogin} = useContext(AuthContext);

    const handelGoogleLogin = ()=>{
        googleLogin() // call the googleLogin function from AuthProvider context
        .then(result => {
            console.log(result);
        })
        .catch(error=>{
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }
   
    return (
      
        <div className="flex justify-center items-center w-full h-screen bg-[#f4f4f9]">
             
                <div className="w-96 h-[150px] flex flex-col gap-3 justify-center items-center" 
                style={{'box-shadow':' 0 5px 10px rgba(0, 0, 0, 0.1)'}}>
                <h2 className="text-3xl font-bold">Login to Task Manager</h2>
                    <button onClick={handelGoogleLogin} className="px-5 py-3 bg-blue-500 rounded cursor-pointer text-white flex gap-2
                    justify-center items-center">
                    <FaGoogle className="text-yellow-500" />
                        Sign in with Google
                        </button>
                </div>
        </div>
    );
};

export default Login;