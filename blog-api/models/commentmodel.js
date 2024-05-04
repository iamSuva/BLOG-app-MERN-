import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    blogid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog',
        required:true,
    }
},{timestamps:true
});
const commentModel=mongoose.model("comment",commentSchema);

export default commentModel;