import React, { Component } from 'react';
import CarouselComponent from '../../Carousel/CarouselComponent';
import Headerimg from '../../Headerimg/Headerimg'
import Navbar from '../../Navbar/Navbar'
import './header.css'
import Fade from 'react-reveal/Fade';





class Header extends Component {
    
    



    constructor(props){
        super(props);
        this.state = { clicked: false };  
      }


    render() {
       const { clicked } = this.state
        return(      
                            
            <div>
            <Fade top>
                <Headerimg />
                <Navbar />
                <CarouselComponent />                
            </Fade>
            </div>
                            
                        
        )
     }
        
}

export default Header
