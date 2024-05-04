import React, { useState } from "react";
import { categories } from "../data/categories";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
const Updateform = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [blogimage,setImage] = useState(null);

const {auth}=useAuth();

const navigate=useNavigate();

const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const formData=new FormData();
        formData.append("title",title);
        formData.append("description",description);
        formData.append("category",category);
        formData.append("blogimage",blogimage);
        const token=auth.token;
        for(const entry of formData.entries())
          {
            console.log(entry[0],entry[1]);
          }
          const  response=await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/add-blog`,formData,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        
    const result=response.data;
   if(result.success==true)
    {
     console.log(result);
      navigate("/dashboard/my-blogs")

    }
    

    } catch (error) {
        
    }
   
  };

  return (
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Category</label>
           <select className="form-control " value={category}onChange={(e)=>setCategory(e.target.value)} required >
            {
                categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))
            }
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
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="blogimage">Blog Image</label>
          <input type="file"
          className="form-control"
          id="blogimage"
          required
          onChange={(e)=>{setImage(e.target.files[0])}}
          />
        </div>
        <button type="submit" className="btn btn-primary m-2">Submit</button>
      </form>
    </div>
  );
};

export default Updateform;
