import blogModel from "../models/blogmodel.js";
import commentModel from "../models/commentmodel.js";
//add comment
export const addCommentController = async (req, res) => {
    try {
        const { comment } = req.body;
        const blogid = req.params.id;
        console.log("comment",comment,blogid);
    //  const blog = await blogModel.findById(blogid);
      const blog=await blogModel.findById(blogid);
      if(!blog)
        {
            return res.status(201).send({ success: false, message: "Blog not found." });
        }
        // console.log(blog);
      if (!comment) {
        return res
          .status(201)
          .send({ success: false, message: "Comment is required." });
      }
      console.log("heelo")
      const newComment = new commentModel({
        comment: comment,
        blogid: blogid,
        author: req.user._id,
      });
      console.log(req.user._id);
       await newComment.save();
    console.log("new comme",newComment);
      return res.status(200).send({ success: true, message: "you commented" ,comment:newComment});
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong." });
    }
  };

  export const getAllcommentsOfBlog=async(req,res)=>{
    try {
        const {id}=req.params;
        const comments=await commentModel.find({blogid:id}).populate("author");
        if(comments)
            {
                return res.status(200).send({success:true,comments:comments,message:"comments found"})
            } 
       else
        {
            return res.status(200).send({success:false,message:"comments not found"})
        }

    } catch (error) {
        return res
        .status(500)
        .send({ success: false, message: "Something went wrong." });
    }
  }