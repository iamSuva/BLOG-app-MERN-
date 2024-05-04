import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'

function Userroutes() {

  const {auth}=useAuth();
  const navigate=useNavigate();
  useEffect(()=>{
     if(!auth.token)
      {
         navigate("/login");
      }

  },[auth.token])
  return (
    <>
    
    {
     auth.token && <Outlet/> 
    }
    </>
  )
}

export default Userroutes