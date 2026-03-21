import { useState } from "react"

const Search = ()=>{
   
   const [searchtext,setsearchtext]= useState("");
    return(
        <div className="search-container">
        <input type="text" className="searchbar" value={searchtext} onChange={(e)=>{
            setsearchtext(e.target.value)
        }}/>
        <button className="searchbutton" onClick={()=>{
            console.log(searchtext)
        }}>
            search
        </button>
        
        </div>
    )     
}

export default Search;  