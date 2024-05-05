import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from "axios"; 
import { Link } from 'react-router-dom';
import { useSearch } from '../context/Searchcontext';
import Spinner from '../components/Spinner';
function Searchpage() {
   const [blogs,setBlogs]=useState([]);
  const {searchBlogs}=useSearch();
 const {loading}=useSearch();
 console.log("loafing",loading);
  return (
    <Layout>
       <div className='container'>
         {
          loading && <Spinner/>
         }
        <h1 className='text-center text-dark'>
           Searching....found : 
           {
             searchBlogs && searchBlogs.length===0?
             "No blogs" :
             searchBlogs.length
           }
        </h1>

           <div className='row'> 
            {
            searchBlogs && searchBlogs.map((blog)=>{
              return (
                <div className='col-md-3 my-2' key={blog._id}>
                  <div className='card h-100 blogcard'>
                    <img src={`${process.env.REACT_APP_API_URL}/${blog.blogimage}`} className='card-img-top blogimage' alt='...' />
                    <div className='card-body'>
                      <h5 className='card-title'>{blog.title}</h5>
                      <p className='card-text'>{blog.description}</p>
                      <Link to={`/blog/${blog._id}`} className='btn btn-primary'>Read More</Link>
                    </div>
                  </div>
                </div>
              )
             }) 
            }
           </div>
       </div>
    </Layout>
  )
}

export default Searchpage;