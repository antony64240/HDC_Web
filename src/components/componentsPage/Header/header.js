import React, { Component } from 'react';
import CarouselComponent from '../../Carousel/CarouselComponent';
import Headerimg from '../../Headerimg/Headerimg'
import Navbar from '../../Navbar/Navbar'
import './header.css'
import Fade from 'react-reveal/Fade';





class Header extends Component {
render() {
    return(          
        <Fade top>
            <Headerimg />
            <Navbar />
            <CarouselComponent />                
        </Fade>             
    )
    }
}

export default Header
