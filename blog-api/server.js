import express from 'express';
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./db/connect.js"
import userRoute from "./routes/userRoutes.js";
import blogRoute from "./routes/blogRoutes.js";
dotenv.config();
const app=express();
const PORT=process.env.PORT;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("./public"));


//connect to database
connectDB();

app.use(cors());
app.listen(PORT,(err)=>{
    console.log(`lsiting on port ${PORT}`);
    if(err)
    {
        console.log(err);
    }
});


app.use("/api/auth",userRoute);
app.use("/api/blog",blogRoute);