import React ,{useEffect, useState}from 'react'
import { useNavigate,Link, json } from 'react-router-dom'
import Layout from '../components/Layout'
import axios from "axios";
import { useAuth } from '../context/Authcontext';
function Login() {
  const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const navigate=useNavigate();
const {auth,setAuth}=useAuth();
//
useEffect(()=>{

  if(auth.token)
    {
      console.log("auth ----------")
      navigate("/");
    }
    
  },[auth.token])


const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const data={
      email,
      password
    }
    const  response=await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,data);
    const result=response.data;
   if(result.success==true)
    {
     console.log(result);
     
     setAuth((prev)=>({
      ...prev,
      user:result.user,
      token:result.token
     }))
     localStorage.setItem("loginuser",JSON.stringify(result));
     navigate("/dashboard")

    }
    else{
      console.log(result.message);
    }
    
  } catch (error) {
     console.log(error);
  }
}
  return (
    <Layout>
      <div className="login-register">
        <h2 >Login </h2>
        
        <form onSubmit={handleSubmit} className="form">
         
          <div className="mb-3">
          
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required

            />
           </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
           <div className="mb-3">

          <button type="submit" className="btn btn-primary">
           Login
          </button>
           </div>
         
          
        </form>
      </div>
    </Layout>
  )
}

export default Login