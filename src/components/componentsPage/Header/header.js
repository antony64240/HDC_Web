import React, { Component } from 'react';
import CarouselComponent from '../../Carousel/CarouselComponent';
import Headerimg from '../../Headerimg/Headerimg'
import Navbar from '../../Navbar/Navbar'
import FadeIn from './fadein';
import styled from "styled-components";


const HeaderContent = styled.div`
  height:300px;
`;

class Header extends Component {
render() {
    return(   
        <HeaderContent>
            <FadeIn >
            <Navbar />
            <Headerimg />
            <CarouselComponent />   
            </FadeIn>                 
        </HeaderContent>           
        )
    }
}

export default Header


