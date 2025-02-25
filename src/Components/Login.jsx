import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

 

 

const Login = () => {

    const location = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const {googleLogin} = useContext(AuthContext);

    const handelGoogleLogin = ()=>{
        googleLogin() // call the googleLogin function from AuthProvider context
        .then(result => {
            console.log(result.user.displayName);

            const Uinfo = {name:result.user.displayName,email:result.user.email,photo:result.user.photoURL};

            axios.post(`${API_URL}/add-user`,Uinfo)
            .then(response =>{

                if(response.data.message)
                {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                    })

                    location('/dashboard');

                }
                 
            })

        })
        .catch(error=>{
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }
   
    return (

        <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-96 bg-white rounded-xl p-8 shadow-lg transform transition-all duration-500 hover:shadow-xl">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Task Manager</h2>
          <p className="text-center text-gray-500 mb-8">Sign in to access your tasks</p>
          
          {/* Google Button */}
          <div className="flex justify-center">
            <button 
              onClick={handelGoogleLogin}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-3 transition-all duration-300 ${
                isHovering ? 'bg-white text-blue-600 shadow-md' : 'bg-blue-600 text-white'
              }`}
              style={{
                transform: isHovering ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isHovering ? '0 6px 20px rgba(66, 153, 225, 0.3)' : '0 2px 10px rgba(66, 153, 225, 0.1)'
              }}
            >
              {/* Custom Google icon */}
              <svg 
                className={`w-5 h-5 transition-all duration-300 ${
                  isHovering ? 'text-red-500 scale-110' : 'text-white'
                }`} 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>
          </div>
          
          {/* Additional options */}
          <div className="mt-8 text-center">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
              Need help signing in?
            </a>
          </div>
        </div>
      </div>
      
        // <div className="flex justify-center items-center w-full h-screen bg-[#f4f4f9]">
             
        //         <div className="w-96 h-[150px] flex flex-col gap-3 justify-center items-center" 
        //         style={{'box-shadow':' 0 5px 10px rgba(0, 0, 0, 0.1)'}}>
        //         <h2 className="text-3xl font-bold">Login to Task Manager</h2>
        //             <button onClick={handelGoogleLogin} className="px-5 py-3 bg-blue-500 rounded cursor-pointer text-white flex gap-2
        //             justify-center items-center">
        //             <FaGoogle className="text-yellow-500" />
        //                 Sign in with Google
        //                 </button>
        //         </div>
        // </div>
    );
};

export default Login;