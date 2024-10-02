import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import SingleBlog from "./pages/SingleBlog";
import BlogwithCategory from "./pages/BlogwithCategory";
import Userroutes from "./routes/Userroutes";
import Addblog from "./pages/Dashboard/Addblog";
import Myblogs from "./pages/Dashboard/Myblogs";
import Updateblog from "./pages/Dashboard/Updateblog";
import { useAuth } from "./context/Authcontext";
import Searchpage from "./pages/Searchpage";

function App() {
  const { auth } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/blog/category/:category" element={<BlogwithCategory />} />
        <Route path="/search" element={<Searchpage />} />
        <Route path="/dashboard" element={<Userroutes />}>
          <Route index element={<Dashboard />} />
          <Route path="add-blog" element={<Addblog />} />
          <Route path="my-blogs" element={<Myblogs />} />
          <Route path="update-blog/:id" element={<Updateblog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
