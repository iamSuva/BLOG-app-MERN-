import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import axios from "axios";
import Spinner from "./Spinner";

 const UserRoutes=() =>{
   const [ok, setOk] = useState(false);
   const { auth, setAuth } = useAuth();
   
   console.log("private routes ",auth);
   useEffect(() => {
     const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/verify`,
           { headers: { Authorization: `Bearer ${auth?.token}` } }
        );
        console.log("authentication .....", response);
        if (response.data.success) {
          setOk(true);
        }else{
          setOk(false);
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token){
      checkAuth();
    }
  }, [auth?.token]);
  return ok ? <Outlet/> : <Spinner />
};
export default UserRoutes;