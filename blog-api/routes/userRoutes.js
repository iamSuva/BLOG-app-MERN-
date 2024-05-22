import express from 'express';
import { loginController, registerController } from '../controller/usercontroller.js';
import { requireSignIn } from '../middleware/auth.js';

const router=express.Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.get("/verify",requireSignIn,(req,res)=>{
    console.log("verified  calleddd");
    return res.status(200).send({
        success:true,
        message:"verified token"
    })
})
 export  default router;