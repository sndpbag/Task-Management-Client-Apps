import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../Auth/Firebase.config";

 
 export const AuthContext = createContext();

const AuthProvider = ({children }) => {

    const [user,setUser] = useState({
        name : 'sndpbag',
    })

    



 






    const authInfo = {
        user,
      
    }


    return (
         <AuthContext.Provider value={authInfo}>
             {children}
         </AuthContext.Provider>
    );
};

export default AuthProvider;