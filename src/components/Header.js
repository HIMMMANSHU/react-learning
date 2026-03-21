import { logo } from "../utils/constants";

const Header =()=> (
    <div className='header'>
        <div className='logo-container'>
            <img className='logo' src={logo}/>
    
        </div>
        <div className='navItem'>
            <ul>
                <li>about</li>
                <li>contact</li>
                <li>cart</li>
                <li>Home</li>
            </ul>
    
    
        </div>
    </div>
    
    )

export default Header;
