import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { useAuth } from '../context/Authcontext';
import {useSearch} from '../context/Searchcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
function Header() {
     const {auth,setAuth}=useAuth();
     const {searchBlogs,setSearch}=useSearch();
     const [searchinput,setsearchinput]=useState("");
     const {loading,setLoading}=useSearch();
    const navigate= useNavigate();
    const handleLogout=()=>{
         setAuth((prev)=>({
          ...prev,
          user:null,
          token:null
         }))
      localStorage.clear();
      toast.info("Log out.....")
    }
  const handleSearch=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      if(!searchinput) 
        {
          return;
        } 
        const data={
          searchinput
        }
        console.log(data);
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/get-search`,data);
        const result=response.data;
        if(result.success)
          {
            console.log(result);
            setSearch(result.blogs);
            navigate("/search")
            setLoading(false);
          }

         
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Category
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {
                categories.map((categories)=>
                <>
                <li key={categories}><Link className="dropdown-item" to={`/blog/category/${categories}`}>{categories}</Link></li>
          
                </>
              )
                }
               
              </ul>
            </li>
          </ul>
          <form className="d-flex mx-3" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchinput} onChange={(e)=>setsearchinput(e.target.value)} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <ul className="navbar-nav ml-auto mx-3"> 
          {!auth.token  ?( 
          <>
          <li className="nav-item">
              <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link active" aria-current="page">Signup</Link>
            </li>
          </>):(
          <>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {auth.user.username}
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li >
                <NavLink to="/dashboard">
                  Dashboard
                </NavLink>
                  </li>
                <li>
                  <NavLink to="/login" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
               
              </ul>
            </li>
          </>
          )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
