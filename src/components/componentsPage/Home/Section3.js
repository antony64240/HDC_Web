import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import Bg_SECTION1 from '../../../image/i3.jpg';
import Bg_Overlord from '../../../image/cov.jpg';
import './section.css';
import { Button } from 'primereact/button';




const Section3 = () => {

    const [show, doShow] = useState({
        translate:0,
        itemTwo: false,
        itemThree: false
      });

     const secondRef = useRef(null),
        ThreeRef = useRef(null),
        TranslateRef = useRef(null);

        useLayoutEffect(() => {
            const topPos = element => element.getBoundingClientRect().top;
             const  div2Pos = topPos(secondRef.current),
                   imgPos = topPos(TranslateRef.current),
                   div3Pos = topPos(ThreeRef.current);
        
            const onScroll = () => {
              const scrollPos = window.scrollY + window.innerHeight;
                if (div2Pos+50 < scrollPos) {
                doShow(state => ({ ...state, itemTwo: true }));
                } 
                if (div3Pos+50 < scrollPos) {
                doShow(state => ({ ...state, itemThree: true }));
              }
              doShow(state=>({...state, translate:(topPos(TranslateRef.current)/7)}))
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
                    Routage et CAO
                    A partir d’un schéma “papier” ou réalisé moyennant un logiciel CAO, EEGI vous assure 
                    le routage de vos cartes et circuits imprimés dans le but d’obtenir un produit fini correspondant à vos attentes.
                    </div>
                    <Button label="Voir" />
                  </DIV >
            </Div>
                <DIV src animate={show.itemTwo} ref={secondRef}>
               
                 
                    <Img animate={show.translate} src={Bg_Overlord} ref={TranslateRef}>
                    </Img>
                
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

const Img = styled.img`
  width:100%;
  height:700px;
  transform: translateY(${({ animate }) => (-animate)+'px'});
  transition: transform 1s;
  margin-top: -80px;
`;


const Wrapper = styled.div`
`;

export default Section3



