import { useState } from "react";
import { logo } from "../utils/constants";

const Header =()=>{

    const [btnName,setbtnName]= useState("Login");

   return <div className='header'>
        <div className='logo-container'>
            <img className='logo' src={logo}/>
    
        </div>
        <div className='navItem'>
            <ul>
                <li>about</li>
                <li>contact</li>
                <li>cart</li>
                <li>Home</li>
                <button className="login-btn" onClick={()=>{
                    btnName==="Login" ? setbtnName("Logout"): setbtnName("Login")}}>{btnName}</button>
            </ul>
    
    
        </div>
    </div>
    
}

export default Header;
