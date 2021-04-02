import React, { Component } from 'react';

import styled from 'styled-components';
import makeCarousel from 'react-reveal/makeCarousel';
import Reveal from 'react-reveal/Reveal';
import './CarouselComponent.css'
import SplitText from '../SpliText/SplitText';

const CarouselUI = ({ children }) => <Container>{children}</Container>;
const Carousel = makeCarousel(CarouselUI);


const Container = styled.div`
  position: relative;
  width: 500px;
  left:8vh
`;




class CarouselComponent extends Component {
  
    render() {
      return(  
        <div>    
          <h1 style={{left:'10px'}}><SplitText copy="HDI Design Concept" role="heading" className="TextTitle" /></h1>
          <Carousel defaultWait={5000} /*wait for 1000 milliseconds*/ >  
              <Reveal effect="fadeInUp">
                  <p className="UnderTitle">Ici pour vous depuis plus de 10 ans.</p>
              </Reveal>
              <Reveal effect="fadeInUp">
                  <p className="UnderTitle">Faite nous confiance sur vos projet !</p>
              </Reveal>
          </Carousel>
        </div>   
      )
     }

}

export default CarouselComponent
