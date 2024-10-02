import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

import { useAuth } from "../context/Authcontext";
import Addcomment from "../components/Addcomment";

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [loading,setLoading]=useState(false);
  const [usercomments,setusercomments]=useState([]);
  const {auth}=useAuth();
  const navigate=useNavigate();
const handleAdd=(comment)=>{
       console.log(comment);
       setusercomments((prev)=>[...prev,comment]);
}

  const getSingleBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/get-blog/${id}`
      );
      const data = response.data;
      if (data) {
        console.log("single blog ", data);
        setBlog(data.blog);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  const getComments=async()=>{
    try {
         const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/get-comments/${id}`);
         const result=response.data;
         if(result.success)
          {
            console.log(result.comments);
            setusercomments(result.comments);
          }
          // console.log("usercomments",usercomments);
    } catch (error) {
        
    }
  }
   useEffect(()=>{
       getComments();
   },[])
  useEffect(() => {
    getSingleBlog();
  }, []);
  return (
    <Layout>
       <div className="container">
        <div className="row singleblog ">
        {loading && <Spinner/>}
          {blog && (
            <>
              <div className="col-md-6 text-center"> 
                <img src={`${process.env.REACT_APP_API_URL}/${blog.blogimage}`} alt="Blog" className="img-fluid"  style={{ width: "80%", objectFit: "cover", borderRadius:"10px", textAlign:"center" }} />
              </div>
              <div className="col-md-6">
                <div className="card singleblog">
                  <div className="card-body">
                    <h2 className="card-title">{blog.title}</h2>
                    <p className="card-text">{blog.description}
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aliquid saepe voluptas nostrum quam vero dignissimos fugiat quos modi sapiente, autem ratione repellendus vitae dolore maxime architecto quod aspernatur voluptate.
                    </p>
                    <h4><strong>Author : </strong>{blog.author.username}</h4>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
       
      </div>
      <div className="container py-2">
        {
         auth?.token ?
          <Addcomment handleAdd={handleAdd} /> :
          (
            <>
            <h4>Please login to comment</h4>
            <button className="btn btn-info" onClick={()=>navigate("/login")}>Login to  comment</button>
            </>
          )

        }
          
      </div>
      <div className="container py-2">
        {
          usercomments.length>0 && 
          usercomments.map((comment)=>{
            console.log(comment);
          return(  
              <div className="comment-box">
                <div>👤{comment.author.username}   </div>
                <p>💬 : {comment.comment}</p>
              </div>
            );

          }
          )
        }
      </div>
    </Layout>
  );
}

export default SingleBlog;
