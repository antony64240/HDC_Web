import React, {useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import Bg_SECTION1 from '../../../image/i3.jpg';
import './section.css';
import { Button } from 'primereact/button';
import CustomSlider from "../../Slide/Slide";
import {useTranslation } from "react-i18next";




const Section3 = () => {
    const { t } = useTranslation();
    const [show, doShow] = useState({
        itemTwo: false,
        itemThree: false
      });

     const secondRef = useRef(null),
        ThreeRef = useRef(null)

        useLayoutEffect(() => {
            const topPos = element => element.getBoundingClientRect().top;
             const  div2Pos = topPos(secondRef.current),
                   div3Pos = topPos(ThreeRef.current);
        
            const onScroll = () => {
              const scrollPos = window.scrollY + window.innerHeight;
                if (div2Pos+50 < scrollPos) {
                doShow(state => ({ ...state, itemTwo: true }));
                } 
                if (div3Pos+50 < scrollPos) {
                doShow(state => ({ ...state, itemThree: true }));
              }
            };
           

                if(topPos(secondRef.current)<window.innerHeight){
                doShow(state => ({ ...state, itemTwo: true }));
                }
                if(topPos(ThreeRef.current)<window.innerHeight){
                doShow(state => ({ ...state, itemThree: true }));
                }
            
            window.addEventListener("scroll", onScroll);
        
            return () => window.removeEventListener("scroll", onScroll);
          },[]);

    return (
        <Wrapper>
            <Div animate={true}>
                  <div className="section-container">
                    <IMG src={Bg_SECTION1} animate={show.itemThree} ref={ThreeRef} />
                  </div>
                  <DIV animate={show.itemThree} ref={ThreeRef}>
                    <div className="text-intro">
                        {t('section3_text1.translated-text')}
                    </div>
                    <Button label="Voir" />
                  </DIV >
            </Div>
                <DIV style={{height:'150px'}} animate={show.itemTwo} ref={secondRef}>
                  <CustomSlider />
                </DIV >
        </Wrapper>
    )

}





const Div = styled.div`
  height: 450px;
  width: 80%;
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
  transition: transform 1s;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom:30px;
`;

const DIV = styled.div`
  height: 450px;
  width: 100%;
  overflow: hidden;
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
  transition: transform 2s;
`;

const IMG = styled.img`
  height: 450px;
  width: 100%;
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
  transition: transform 4s;
  z-index : 1;
`;




const Wrapper = styled.div`
`;

export default Section3



