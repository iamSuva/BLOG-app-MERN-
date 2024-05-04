import blogModel from "../models/blogmodel.js";
import slugify from "slugify";
import commentModel from "../models/commentmodel.js";
export const addBlogController = async (req, res) => {
  try {
    console.log("add req   ....", req.body);
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res.status(400).send({
        success: false,
        message: "Title and description and category are required.",
      });
    }
    let blogimage;
    console.log("blog ->", req.file);

    if (req.file) {
      blogimage = "uploads/blog/" + req.file.filename;
    } else {
      return res.status(404).send({ message: "Please select a blogimage" });
    }
    const slug = slugify(category);
    const newBlog = new blogModel({
      title,
      description,
      category,
      categorySlug: slug,
      blogimage,
      author: req.user._id,
    });
    await newBlog.save();
    return res
      .status(200)
      .send({ success: true, message: "added new blog", blog: newBlog });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (blogs) {
      return res.status(200).send({ success: true, blog: blogs });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "No blogs found." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};

export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const updateData = {};
    updateData.author = req.user._id;
    if (title) {
      updateData.title = title;
    }
    if (description) {
      updateData.description = description;
    }
    if (category) {
      updateData.category = category;
      updateData.categorySlug = slugify(category);
    }
    if (req.file) {
      updateData.blogimage = "uploads/blog/" + req.file.filename;
    }
    const updateblog = await blogModel.findByIdAndUpdate(id, updateData);
    if (updateblog) {
      return res.status(200).send({
        success: true,
        message: "Blog updated successfully.",
        blog: updateblog,
      });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Blog not found." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};

export const deleteBlogController = async (req, res) => {
  try {
    const blogid = req.params.id;
    const blog = await blogModel.findByIdAndDelete(blogid);
    console.log(blog);
    if (blog) {
      return res
        .status(200)
        .send({ success: true, message: "Blog deleted successfully." });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Blog not found." });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};
export const getSingleBlogController = async (req, res) => {
  try {
    const blogid = req.params.id;
    const blog = await blogModel.findById(blogid).populate("author");
    console.log("single blog found", blog);
    if (blog) {
      return res.status(200).send({ success: true, blog: blog });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};

export const getBlogsOfUser = async (req, res) => {
  try {
    const author = req.params.userid;
    const blogs = await blogModel.find({ author });
    if (blogs) {
      return res.status(200).send({ success: true, blog: blogs });
    }
    return res.status(404).send({ success: false, message: "No blogs found." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};

export const getMyBlogController = async (req, res) => {
  try {
    console.log("author ->", req.user);
    const author = req.user._id;
    const myblogs = await blogModel.find({ author: author });
    if (myblogs) {
      return res.status(200).send({ success: true, blog: myblogs });
    }
    return res.status(200).send({ success: false, message: "No blogs found." });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};

//fetch blog with category
export const getBlogWithCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log("category", category);
    const blogs = await blogModel.find({ categorySlug: category });
    console.log("cat blogs", blogs);
    if (blogs.length > 0) {
      return res.status(200).send({ success: true, blog: blogs });
    } else {
      return res.status(200).send({
        success: false,
        message: "No blogs found with this category",
        blog: blogs,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};

// add comment

export const addCommentController = async (req, res) => {
  try {
    const { comment } = req.body;
    const blogid = req.params.id;
    const blog = await blogModel.findById(blogid);

    if (!comment) {
      return res
        .status(400)
        .send({ success: false, message: "Comment is required." });
    }
    const newComment = new commentModel({
      comment,
      author: req.user._id,
      blog: blogid,
    });
    await newComment.save();
    return res.status(200).send({ success: true, message: "you commented" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};

export const searchBlogController = async (req,res) => {
  try {
    const {searchinput} = req.body;
    console.log(req.body);
    if (!searchinput) {
      return res
        .status(400)
        .send({ success: false, message: "search is missing" });
    }

    const blogs = await blogModel.find({
      $or: [
        { title: { $regex: searchinput, $options: "i" } },
        { category: { $regex: searchinput, $options: "i" } },
      ],
    });

    if (blogs) {
      return res
        .status(200)
        .send({ success: true, blogs: blogs, message: "Search blogs is find" });
    } else {
      return res
        .status(200)
        .send({ success: false, message: "No Search blogs is find" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};
