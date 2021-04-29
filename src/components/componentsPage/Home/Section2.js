import React, {useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import Span_circuit from '../../../image/ico-know-how.png';
import Bg_SECTION1 from '../../../image/experience.png';
import {useTranslation } from "react-i18next";




const Section1 = () => {
    const { t } = useTranslation();
    const [show, doShow] = useState({
        itemTwo: false,
        itemThree: false
      });

     const secondRef = useRef(null),
        ThreeRef = useRef(null);


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
            <DIV animate={show.itemThree} ref={ThreeRef}>
                <div className="containerSection2">
                  <div className="titleSection2">
                    <p>{t('section2_title.translated-text')}</p>
                  </div>
                  <div className="divider-center"> 
                    <div className="divider-text-container">
                      <div className="divider-text-wrap"> 
                      <span className="divider-border-left">
                        <span className="divider-border"></span>
                      </span>
                      <span className="divider-border-content">
                        <img src={Span_circuit} alt="COAImg"></img>
                      </span>
                      <span className="divider-border-right">
                        <span className="divider-border"></span>
                      </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="textSection2">
                      <div className="elementor-row">
                        <div className="text-row">
                        {t('section2_text1.translated-text')}
                        </div>
                        <div className="text-row">
                        {t('section2_text2.translated-text')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </DIV>
            <Div animate={true}>
            <TEXT animate={show.itemTwo} ref={secondRef}>
                    <div className="text-intro">
                    {t('section2_text3.translated-text')}
                    </div>
                  </TEXT >
                  
                  <div className="section-container">
                    <IMG style={{width:'390px'}} src={Bg_SECTION1} animate={show.itemTwo} ref={secondRef} />
                  </div>
                
            </Div>
        </Wrapper>
    )

}

const IMG = styled.img`
  height: 450px;
  width: 100%;
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
  transition: transform 4s;
  z-index : 1;
`;

const Div = styled.div`
  height: 450px;
  width: 80%;
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
  transition: transform 1s;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom:30px;
`;

const TEXT = styled.div`
  height: 450px;
  width: 100%;
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
  transition: transform 2s;
`;




const DIV = styled.div`
  height: 450px;
  width: 100%;
  background-color: #015090;
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
  transition: transform 2s;

`;






const Wrapper = styled.div`
`;

export default Section1



