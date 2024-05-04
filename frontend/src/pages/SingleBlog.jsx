import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const getSingleBlog = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/get-blog/${id}`
      );
      const data = response.data;
      if (data) {
        console.log("single blog ", data);
        setBlog(data.blog);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getSingleBlog();
  }, []);
  return (
    <Layout>
       <div className="container">
        <div className="row singleblog">
          {blog && (
            <>
              <div className="col-md-6"> 
                <img src={`${process.env.REACT_APP_API_URL}/${blog.blogimage}`} alt="Blog" className="img-fluid" />
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
    </Layout>
  );
}

export default SingleBlog;
