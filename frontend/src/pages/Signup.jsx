import React, { useState ,useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(()=>{

    if(auth.token)
      {
        console.log("auth ----------")
        navigate("/");
      }
      
    },[auth.token])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username,
        email,
        password,
      };
      console.log(data);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        data
      );
      const result = response.data;
      if (result.success == true) {

        console.log("singup result:",result);
        toast.success(result.message)
        navigate("/login");
       }
       else{
        toast.error(result.message);
       }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="login-register">
        <h2>Signup </h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Signup;
