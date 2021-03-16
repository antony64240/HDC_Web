import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import { Button } from "./Button"
import './Navbar.css'

class Navbar extends Component {
    
    
    constructor(props){
        super(props);
        this.state = { clicked: false};  
      }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }


    render() {
        var  loggedIn = localStorage.getItem('connected');
        console.log(loggedIn);
        if(loggedIn=='true'){
                return( 
                <header>
                    <nav className="NavbarItems">
                        <h1 className="navbar-logo">HdiDesignConcept</h1>       
                        <div className="menu-icon" onClick={this.handleClick}>
                            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                        </div>
                        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                            {MenuItems.map((item, index) => {
                                if(item.title != "CONNEXION"){
                                    console.log("connecté : " +item.title);
                                    return (

                                        <li key={index}>
                                            <a className={item.cName} href={item.url}>
                                            {item.title}
                                            </a> 
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </nav>
                </header>
                )
                        
            }
                return(
                    <header>
                    <nav className="NavbarItems">
                        <h1 className="navbar-logo">HdiDesignConcept</h1>       
                        <div className="menu-icon" onClick={this.handleClick}>
                            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                        </div>
                        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                            {MenuItems.map((item, index) => {
                                if(item.title != "MON COMPTE"){
                                    return (
                                            <li key={index}>
                                                <a className={item.cName} href={item.url}>
                                                {item.title}
                                                </a>
                                                
                                            </li>
                                        )
                                    }
                            })}
                        </ul>
                        <Button>< a href="Signup"><span>INSCRIPTION</span> </a></Button>
                    </nav>
                    </header>
                )
            }
        
}

export default Navbar
