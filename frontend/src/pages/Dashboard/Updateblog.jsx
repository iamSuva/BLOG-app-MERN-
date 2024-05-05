import React, { useEffect, useState } from "react";
import Usersidebar from "../../components/Usersidebar";
import Layout from "../../components/Layout";
import Addblogform from "../../components/Addblogform";
import Updateform from "../../components/Updateform";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../../data/categories";
import axios from "axios";
import { useAuth } from "../../context/Authcontext";
import { toast } from "react-toastify";

function Updateblog() {
  const {auth}=useAuth();
  const {id}=useParams();
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [category,setCategory]=useState(categories[0]);
  const [blogimage,setImage]=useState(null);

  const navigate=useNavigate();
const getBlog=async()=>{
  try {
      const resonse=await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/get-blog/${id}`);
      const data=resonse.data;
     
      console.log(data);
      setTitle(data.blog.title);
      setDescription(data.blog.description);
      setCategory(data.blog.category);
      setImage(data.blog.blogimage);
  } catch (error) {
    console.log(error);
  }
}
const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const formData=new FormData();
    formData.append("title",title);
    formData.append("description",description);
    formData.append("category",category);
    formData.append("blogimage",blogimage);
    for(const entry of formData.entries())
      {
        console.log(entry[0],entry[1]);
      }
    const resonse=await axios.put(`${process.env.REACT_APP_API_URL}/api/blog/update-blog/${id}`,formData,{
      headers:{
        Authorization:`Bearer ${auth.token}`
      }
    });
    console.log(resonse.data);
    const result=resonse.data;
    if(result.success)
      {
        //alert("Blog updated successfully");
        toast.success(result.message);
        navigate("/dashboard/my-blogs");
      }

  } catch (error) {
    console.log(error);
  }
}
useEffect(()=>{
  getBlog();
},[])
  return (
    <Layout>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <Usersidebar />
          </div>

          <div className="col-md-9 col-sm-12">
            <h1>Update blog</h1>
            <div className="w-50">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Category</label>
                  <select
                    className="form-control "
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    className="form-control"
                    id="content"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                   
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="blogimage">Blog Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="blogimage"
                
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary m-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Updateblog;
