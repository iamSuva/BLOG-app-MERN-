import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

function Addcomment({handleAdd}) {
const [comment,setComment]=useState("");

//   console.log("comment is",comment);
const {id}=useParams();
//  console.log("id is",id);
const {auth}=useAuth();
const token=auth.token;
  const handleSubmit=async(e)=>{
 
        e.preventDefault();
        if(!comment)
            {
                alert("please type ");
                return;
            }
            try {
        const commentData={
            comment:comment
        }
         console.log(commentData);
          const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/add-comment/${id}`,commentData,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
          const result=response.data;
          if(result.success)
            {
                setComment("");
                console.log("cleared ....")
                console.log(result);
                handleAdd(result.comment);
                
            }
       } catch (error) {
           console.log(error);
  
       }

  }
 
  return (
    <div className='comment-div'>
        <form className='py-2' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                />
                  
            </div>
            <button type="submit" className="btn btn-primary">comment</button>
        </form>
         
    </div>
  )
}

export default Addcomment