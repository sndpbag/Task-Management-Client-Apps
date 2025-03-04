import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../Auth/Firebase.config";

 
 export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user,setUser] = useState({
        name : 'sndpbag',
    })
    const [loading,setLoading] = useState(true);

    
//  google login
const googleLogin = ()=>
{
 const provider = new GoogleAuthProvider();
 return signInWithPopup(auth,provider);
}


//  google logout
const logOutbyGoogle = ()=>{
    return signOut(auth);
    
}


//  user store
useEffect(()=>{
 const unsubscribe = onAuthStateChanged(auth,(currentUser) =>{
    setUser(currentUser);
    console.log(currentUser);
    setLoading(false);
 });
 
 return ()=> unsubscribe();
    
 

},[]);

 






    const authInfo = {
        user,
      googleLogin,
      loading,
      logOutbyGoogle
    }


    return (
         <AuthContext.Provider value={authInfo}>
             {children}
         </AuthContext.Provider>
    );
};

export default AuthProvider;