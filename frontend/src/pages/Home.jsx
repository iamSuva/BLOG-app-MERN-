import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Slidershow from "../components/Slidershow";
function Home() {
  const [blogs, setBlogs] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalblogs, settotalBlogs] = useState(0);
  const gettotalBlogslenght = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/total-blogs`
      );
      const result = response.data;
      if (result.success) {
        console.log(result);
        settotalBlogs(result.len);
      }
    } catch (error) {}
  };

  const loadmore = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/blogs-perpage/${page}`
      );
      const result = response.data;
      if (result.success) {
        console.log("perpage", result.blogs);
        setBlogs([...blogs, ...result.blogs]);
      }
      setLoading(false);
    } catch (error) {}
  };

  const getAllblogs = async () => {
    try {
      setLoading(true);

      console.log("url ", process.env.REACT_APP_API_URL);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/get-blogs`
      );
      const data = response.data;
      if (data.success) {
        console.log(data);
        setBlogs(data.blog);
        console.log("blogs", blogs);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(page>1)
   loadmore();
  }, [page]);
  useEffect(() => {
     getAllblogs();
    gettotalBlogslenght();
  }, []);
  return (
    <Layout>
      
      <div className="container">
        <h1 className="text-center text-dark">Welcome to BlogDunia</h1>
        {Loading ? (
          <Spinner />
        ) : (
          <div className="row">
            {blogs &&
              blogs.map((blog) => {
                return (
                  <div className="col-md-3 my-2" key={blog._id}>
                    <div className="card h-100 blogcard">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${blog.blogimage}`}
                        className="card-img-top blogimage"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">{blog.description}</p>
                        <Link
                          to={`/blog/${blog._id}`}
                          className="btn btn-primary"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        <div className="d-flex justify-content-center mt-2 p-2">
          {blogs && blogs.length < totalblogs && (
            <button className="btn btn-info" onClick={() => setPage(page + 1)}>
              {Loading ? "loading..." : "Loadmore"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
