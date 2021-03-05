import React from 'react';

import './RandomRoute.css'
import './RandomCircle.css'

const RandomRoute = () => {

 var x = (Math.random()*300)+15;
 var y = (Math.random()*400)+98;
 
 var y2 = (Math.random()*400)+98;
 var x2 = ((Math.random()*300)+15)+1340;

    return ( 
        <div className = 'RandomRoute-box' >


            <div className='box-loader'>
                <svg style = {{top:y+2 , left : x-15}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>
            
            <a style={{top : y , height:'100px', left: x }}>
            <span style={{animationDelay : "0s"}}></span>
            <span style={{animationDelay : "0.5s"}}></span>
            </a>
            <a style={{top : y + 98 , height:'100px', left: x+100 }}>
            <span style={{animationDelay : "1s"}}></span>
            <span style={{animationDelay : "1.5s"}}></span>
            </a>

            <div className='box-loader'>
                <svg style = {{top: y + 205 , left:x+190}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>
             


            <div className='box-loader'>
                <svg style = {{top:y+22 , left : x-15}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>
            
            <a style={{top : y+20 , width: '90px', height:'100px', left: x }}>
            <span style={{animationDelay : "0s"}}></span>
            <span style={{animationDelay : "0.5s"}}></span>
            </a>
            <a style={{top : y + 118 , width: '90px' , height:'80px', left: x+90 }}>
            <span style={{animationDelay : "1s"}}></span>
            <span style={{animationDelay : "1.5s"}}></span>
            </a>

            <div className='box-loader'>
                <svg style = {{top: y + 205 , left:x+170}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>

            <div className='box-loader'>
                <svg style = {{top:y+42 , left : x-15}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>
            
            <a style={{top : y+40 , width: '80px', height:'100px', left: x }}>
            <span style={{animationDelay : "0s"}}></span>
            <span style={{animationDelay : "0.5s"}}></span>
            </a>
            <a style={{top : y + 138 , width: '80px' , height:'60px', left: x+80 }}>
            <span style={{animationDelay : "1s"}}></span>
            <span style={{animationDelay : "1.5s"}}></span>
            </a>

            <div className='box-loader'>
                <svg style = {{top: y + 205 , left:x+150}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>

            <div className= 'Separation'/>
            
            <div className='box-loader'>
                <svg style = {{top:y2+2 , left : x2-15}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>
            
            <a style={{top : y2 , height:'100px', left: x2 }}>
            <span style={{animationDelay : "0s"}}></span>
            <span style={{animationDelay : "0.5s"}}></span>
            </a>
            <a style={{top : y2 + 98 , height:'100px', left: x2+100 }}>
            <span style={{animationDelay : "1s"}}></span>
            <span style={{animationDelay : "1.5s"}}></span>
            </a>

            <div className='box-loader'>
                <svg style = {{top: y2 + 205 , left:x2+190}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>
             


            <div className='box-loader'>
                <svg style = {{top:y2+22 , left : x2-15}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>
            
            <a style={{top : y2+20 , width: '90px', height:'100px', left: x2 }}>
            <span style={{animationDelay : "0s"}}></span>
            <span style={{animationDelay : "0.5s"}}></span>
            </a>
            <a style={{top : y2 + 118 , width: '90px' , height:'80px', left: x2+90 }}>
            <span style={{animationDelay : "1s"}}></span>
            <span style={{animationDelay : "1.5s"}}></span>
            </a>

            <div className='box-loader'>
                <svg style = {{top: y2 + 205 , left:x2+170}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>

            <div className='box-loader'>
                <svg style = {{top:y2+42 , left : x2-15}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>
            
            <a style={{top : y2+40 , width: '80px', height:'100px', left: x2 }}>
            <span style={{animationDelay : "0s"}}></span>
            <span style={{animationDelay : "0.5s"}}></span>
            </a>
            <a style={{top : y2 + 138 , width: '80px' , height:'60px', left: x2+80 }}>
            <span style={{animationDelay : "1s"}}></span>
            <span style={{animationDelay : "1.5s"}}></span>
            </a>

            <div className='box-loader'>
                <svg style = {{top: y2 + 205 , left:x2+150}} class="loader"  viewBox="0 0 360 360">
                <circle cx="170" cy="170" r="160" stroke="#a4508b"/>
                </svg>
            </div>


        </div>
        
    )


}

export default RandomRoute;