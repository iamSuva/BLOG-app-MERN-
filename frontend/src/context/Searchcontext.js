import { createContext, useContext, useState } from "react";

const searchcontext=createContext();
export const SearchProvider=({children})=>{
const [searchBlogs,setSearch]=useState([]);
const [loading,setLoading]=useState(false);
 return <searchcontext.Provider value={{searchBlogs,setSearch,loading,setLoading}}>
{children}
 </searchcontext.Provider>

}

export const useSearch=()=>useContext(searchcontext);


