import { useContext, createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail

  
} from 'firebase/auth'

import  {auth} from '../components/RegistrationAndLogin/FirebaseConfig'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
      }
    
      function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email,password)
    }

    async function passwordreset(email){

    try {
            await sendPasswordResetEmail(auth, email);
            console.log("Password Reset Email sent");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
        }
    }

    const googleSignIn =()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
    }

    const logOut=()=>{
        signOut(auth)
    }

    useEffect(()=>{
            const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
                setUser(currentUser)
                console.log(currentUser)
                console.log('User email is:', currentUser ? currentUser.email : 'No user logged in')
            })
            return ()=>{unsubscribe()}
    },[])

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user, login, signup,passwordreset}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}