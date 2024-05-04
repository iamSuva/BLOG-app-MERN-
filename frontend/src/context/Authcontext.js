import { createContext, useContext, useEffect, useState } from "react";


const Authcontext=createContext();

export const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        token:"",
        user:null,
    });

    useEffect(()=>{
        const loginuser=JSON.parse(localStorage.getItem("loginuser"));
        console.log("login user : ",loginuser);
        // console.log(auth);
        if(loginuser){
            setAuth((prev)=>({
                ...prev,
                user:loginuser.user,
                token:loginuser.token,
            }))
        }
       
    },[]);

    return <Authcontext.Provider value={{auth,setAuth}}>
        {children}
    </Authcontext.Provider>
}

export const useAuth=()=>useContext(Authcontext); //use context hooks
