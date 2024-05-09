import bcrypt from 'bcrypt'; //this is from encryption
import jwt from "jsonwebtoken";
export const generateHashPassword =async (password)=>{
    try {
        const salt=await bcrypt.genSalt(10);
        
        const hash=await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        console.log(error);
    }
}

export const compareHashepassword=async(password,hashepassword)=>{
    return await bcrypt.compare(password,hashepassword);
}

export const generateToken=async(user)=>{
    const payload={
        _id:user._id,
        name:user.name,
        email:user.email,
      
    }
    const secret=process.env.JWT_SECRET;
    const options={
        expiresIn:"120s"
    }
    const token=jwt.sign(payload,secret,options);
    return token;
}
//***********************require sign in middleware************************************************


export const requireSignIn=(req,res,next)=>{
    const authorization=req.headers.authorization;
    if(!authorization || !authorization.startsWith("Bearer")){
     return res.status(401).send({message:"Invalid authorization"});
    }
     try {
        const token=authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded)
        {
            return res.status(401).send({message:"Invalid token"});
        }
        req.user=decoded;
        next();

     } catch (error) {
        return res.status(500).send({message:"Error verifying token" });
     }

}    