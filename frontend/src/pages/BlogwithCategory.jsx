import axios from "axios";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";

function BlogwithCategory() {
  const [blogs, setBlogs] = React.useState([]);
  const { category } = useParams();
  const getCategoryBlogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/get-category-blogs/${category}`
      );
      const data = response.data;
      console.log("category blogs ", data);
      if (data.success) {
        setBlogs(data.blog);
      }else{
        setBlogs([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategoryBlogs();
  }, [category]);

  return (

      <Layout> 
        <div className='container'>
          <h3 className="text-center text-dark">Blogs related to : {category}</h3>
          <h4 className="text-dark">Total blogs : {blogs.length}</h4>
           <div className='row'> 
            {
             blogs.length>=1 ?
           (  blogs.map((blog) => (
              
               <div className='col-md-4 my-3' key={blog._id}>
                  <div className='card h-100 blogcard'>
                    <img src={`${process.env.REACT_APP_API_URL}/${blog.blogimage}`} className='card-img-top blogimage' alt='...' />
                    <div className='card-body'>
                      <h5 className='card-title'>{blog.title}</h5>
                      <p className='card-text'>{blog.description}</p>
                      <Link to={`/blog/${blog._id}`} className='btn btn-primary'>Read More</Link>
                    </div>
                  </div>
                </div>
                
             
             ))):(
              <h1 className="text-center text-dark">No related blog found</h1>
             )
            
            
              
            }
              
         
    
           </div>
       </div>
      </Layout>
    
  );
}

export default BlogwithCategory;
