import mongoose from "mongoose";

const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
       type:String,
       required:true
    },
    categorySlug:{
        type:String,
        required:true
    },
    blogimage:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }
},{timestamps:true});

const blogModel=mongoose.model('blog',blogSchema);
export default blogModel;