import { useState } from "react";

const User =({name})=>{
    const[counterr]= useState(0)
    return (

        <div className="user-container">
            <h1>Counter : {counterr}</h1>
       <h1>  Name :{name}   </h1>
       <h2>  Topic: class bases component </h2>
        </div>
    )
}
export default User;