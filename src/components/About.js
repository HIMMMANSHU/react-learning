import React from "react";
import Userclass from "./Userclass";
import User from "./User";

const About = () => {
    return (
        <div>
            <h1>About</h1>
            <User name={ "functional himashu"}/>
            <Userclass name={"class Himanshu"}/>
        </div>
        
    );
    
};

export default About;
