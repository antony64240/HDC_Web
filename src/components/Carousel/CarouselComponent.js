import React, {useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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



const  CarouselComponent = () => {
  const [show, doShow] = useState(Boolean)
  const [show2, doShow2] = useState(Boolean)


  useLayoutEffect(() => {
    window.addEventListener("scroll", () =>{
       let a =  document.getElementById('container')
       let posNavbY = a.getBoundingClientRect().top;
       console.log(posNavbY)
      if(posNavbY<-33){
        doShow(true)
      }else{
        doShow(false)
      }
      if(posNavbY<-200){
        doShow2(true)
      }else{
        doShow2(false)
      }
    });
    },[1]);

    useLayoutEffect(()=>{
      let a = document.getElementById('carousel')
      if(show){
        a.style.position = "fixed"
        a.style.top = -40 + "px"
        
      }else{
       a.style.position = "relative"
       a.style.top = 0 + "px"
      }
    },[show]);



      const { t } = useTranslation();
      return(  
        <div id= "container" className='container-title'>    
          <h1  id='carousel' style={{left:'10px'}}><SplitText copy="HDI Design Concept" role="heading" className="TextTitle" /></h1>
          <Carousel  defaultWait={5000} /*wait for 1000 milliseconds*/ >  
              <Reveal effect="fadeInUp">
                  <p  className="UnderTitle">{t('header_carousel1.translated-text')}</p>
              </Reveal>
              <Reveal effect="fadeInUp">
                  <p className="UnderTitle">{t('header_carousel2.translated-text')}</p>
              </Reveal>
          </Carousel>
        </div>   
      )
}

export default CarouselComponent
