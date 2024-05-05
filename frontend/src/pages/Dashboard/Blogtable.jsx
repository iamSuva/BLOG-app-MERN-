import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Authcontext";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Blogtable = () => {
  const { auth } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const handleDelete = async (id) => {
    console.log("deleted blog ", id);
    try {
      if (window.confirm("DO u want to delete")) {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/blog/delete-blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const result = response.data;
        console.log(result);
        if (result.success) {
          console.log("deleted");
          toast.warning(result.message);
          setBlogs((prevblogs) => prevblogs.filter((blog) => blog._id !== id));
          // console.log("")
        }
      }
    } catch (error) {}
  };
  const getMyblogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/get-my-blogs`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const result = response.data;
      if (result.success) {
        console.log(result);
        setBlogs(result.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyblogs();
  }, []);

  return (
    <>
    {
      blogs.length==0 ? <h1>No blogs found</h1> :
      <div className="blog-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="">
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>{blog.category}</td>
                <td>
                  <Link to={`/blog/${blog._id}`}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${blog.blogimage}`}
                      className="blogimage"
                      style={{ maxWidth: "100px" }}
                      alt="..."
                      />
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(blog._id)}
                    >
                    Delete
                  </button>
                  <button className="btn btn-info">
                    <Link to={`/dashboard/update-blog/${blog._id}`}>
                      Update
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  }
    </>
  );
};

export default Blogtable;
