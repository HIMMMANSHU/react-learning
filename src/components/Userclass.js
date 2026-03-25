
import React from "react"
class Userclass extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="user-card" >
                <h1>Name: {this.props.name}</h1>
                <h2> Location: Noida </h2>
                <h3> topic: iam from class</h3>
            </div>
        )
    }

}
export default Userclass;
   