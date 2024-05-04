import { createContext, useContext, useState } from "react";

const searchcontext=createContext();
export const SearchProvider=({children})=>{
const [searchBlogs,setSearch]=useState([]);

 return <searchcontext.Provider value={{searchBlogs,setSearch}}>
{children}
 </searchcontext.Provider>

}

export const useSearch=()=>useContext(searchcontext);


