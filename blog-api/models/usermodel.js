import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
         default:"profile/user.png"
    }
},{timestamps:true});
const userModel=mongoose.model("user",userSchema);

export default userModel;

