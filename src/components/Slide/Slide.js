import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel'
import styled from "styled-components";
import airbus from '../../image/Airbus.png'
import safran from '../../image/safran.jpg'

export default class CustomSlider extends Component {
  render() {

    return (
    <Carousel itemsToShow={3} transitionMs={200} showEmptySlots={false}>
     <ICON><IMG src={airbus}/></ICON>
     <ICON><IMG src={safran}/></ICON>
     <ICON><IMG src={airbus}/></ICON>
     <ICON><IMG src={safran}/></ICON>
     <ICON><IMG src={airbus}/></ICON>
    </Carousel>
    );
  }
}


const ICON = styled.div`
  height: 150px;
  width:150px
`
const IMG = styled.img`
height: 150px;
width:150px;
border-style: none;
list-style: none;
`