import React, {useLayoutEffect, useRef, useState } from "react";
import Section1 from '../../components/componentsPage/Home/Section1';
import Section2 from '../../components/componentsPage/Home/Section2';
import styled from "styled-components";
import './Accueil.css';
import Bg_circuit from '../../image/bg_circuit.png';
import Section3 from "../../components/componentsPage/Home/Section3";
import Header from '../../components/componentsPage/Header/header';
import {FooterContainer} from "../../components/componentsPage/Footer/Footer";
import Lang from "../../language/Lang";


const Accueil = () => {
  const [show, doShow] = useState({
    itemOne: false,
    itemTwo: false,
    itemThree: false
  });
  const firstRef = useRef(null),
    secondRef = useRef(null),
    ThreeRef = useRef(null);



  useLayoutEffect(() => {
    const topPos = element => element.getBoundingClientRect().top;
    const div1Pos = topPos(firstRef.current),
      div2Pos = topPos(secondRef.current),
      div3Pos = topPos(ThreeRef.current);

    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      if (div1Pos+50 < scrollPos) {
        doShow(state => ({ ...state, itemOne: true }));
      } else if (div2Pos+50 < scrollPos) {
        doShow(state => ({ ...state, itemTwo: true }));
      } else if (div3Pos+50 < scrollPos) {
        doShow(state => ({ ...state, itemThree: true }));
      }
    };
    
  
      if(topPos(firstRef.current)<window.innerHeight){
            doShow(state => ({ ...state, itemOne: true }));
          }
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
    <div>
      
      <Header/>
      <div className="Homecontainer" id="Homecontainer">
        <Lang />
        <Wrapper>
        <img src={Bg_circuit}
                    style={imgEnable}
                    alt="RouterImg"
                    importances="hight"/>
        <Div animate={show.itemThree} ref={ThreeRef}>
          <Section1/>
        </Div>
        <Div animate={show.itemTwo} ref={secondRef}>
          <Section2/>      
        </Div>
        <Div animate={show.itemOne} ref={firstRef} >
          <Section3 />
        </Div>
        </Wrapper>
        
      </div>
      <FooterContainer />
      </div>
  );
};

const Div = styled.div`
  height: auto;
  width: 100%;
  transform: translateX(${({ animate }) => (animate ? "0" : "-100vw")});
  transition: transform 1s;
  text-align: -moz-center;
  text-align: -webkit-center;
`;

const Wrapper = styled.div`


`;



const imgEnable = {
  width: '100px',
  height: '140px',
  position:'absolute'
}

export default Accueil