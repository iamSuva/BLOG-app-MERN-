import express from 'express';
import { addBlogController, deleteBlogController, getBlogController, getBlogWithCategory, getBlogsOfUser, getBlogsperPage, getMyBlogController, getSingleBlogController, getTotalblogslength, searchBlogController, updateBlogController } from '../controller/blogcontroller.js';
import { requireSignIn } from '../middleware/auth.js';
import multer from 'multer';
const router=express.Router();
//multer for file upload
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/uploads/blog");
    },
    filename:(req,file,cb)=>{
        const imagepath=`${Date.now()}-${file.originalname}`;
        cb(null,imagepath);
    }
})

const upload=multer({storage:storage});

router.post("/add-blog",upload.single("blogimage"),requireSignIn,addBlogController);

router.put("/update-blog/:id",requireSignIn,upload.single("blogimage"),updateBlogController);
router.delete("/delete-blog/:id",requireSignIn,deleteBlogController);
router.get("/get-blogs",getBlogController);
router.get("/get-blog/:id",getSingleBlogController);
router.get("/get-blogs/:userid",getBlogsOfUser);
router.get("/get-my-blogs",requireSignIn,getMyBlogController);
router.get("/get-category-blogs/:category",getBlogWithCategory);

router.post("/get-search",searchBlogController);

router.get("/total-blogs",getTotalblogslength);
router.get("/blogs-perpage/:page",getBlogsperPage);
router.get("/test",requireSignIn,(req,res)=>{
    res.send("test");
})

export default router;
