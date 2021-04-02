import React, { Component } from 'react';
import {MenuItems} from './MenuItems'
import './Navbar.css'
import Home from '../../image/home.png'





class Navbar extends Component {
    


    

    render() {
        
    
        
                return( 
                   <div className='top-bar'>                       
                       <div className='container'>
                           <ul className='nav-container'>
                                {MenuItems.map((item, index) => {
                                    return (
                                        <li key={index} className={item.classNameli}>
                                            <a className={item.cName} href={item.url}>
                                            {item.title}
                                            </a>    
                                        </li>
                                    )
                                })}
                                <li className="nav-li">
                                            
                                            <a className="nav-li" href="./user">
                                                <img style={{width:"50px"}} src={Home}></img>
                                            </a>    
                                        </li>
                           </ul>
                       </div>
                   </div>
                
                )
                        
            

     }
        
}

export default Navbar
