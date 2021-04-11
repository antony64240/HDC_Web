import React, {useEffect, useLayoutEffect, useRef, useState } from "react";
import './Navbar.css'
import Home from '../../image/home.png'
import { useTranslation } from "react-i18next";



const Navbar = () => {
    const { t } = useTranslation();
    const [show, doShow] = useState(false);

    useLayoutEffect(() => {
    window.addEventListener("scroll", () =>{
       let a =  document.getElementById('Homecontainer')
       let posNavbY = a.getBoundingClientRect().top;
       if(posNavbY>58){
        doShow(false)
       }else{
        doShow(true)
       }
    });
    },[1]);

    useLayoutEffect(()=>{
        let a = document.getElementById('navbar')
        let c = document.getElementById('icon')
        let b = document.getElementsByClassName('nav-links')
        if(show){
            a.classList.add("slide")
            for(let i = 0; i < b.length; i++) {
                let bc = b[i];
                bc.style.paddingTop = 40+'px'
                bc.style.transition = 'all 0.5s ease'
            }
            c.style.paddingTop = 20+'px'
            c.style.transition = 'all 0.5s ease'
        }else{
            a.classList.remove("slide")
            for(let i = 0; i < b.length; i++) {
                let bc = b[i];
                bc.style.paddingTop = 17+'px'
                bc.style.transition = 'all 0.5s ease'
            }
            c.style.paddingTop = 0+'px'
            c.style.transition = 'all 0.5s ease'
        }
    },[show]);

    const MenuItems = [
        {
            title: t('header_navbar1.translated-text'),
            url: "/Accueil",
            cName: 'nav-links',
            classNameli : 'nav-li'
        },
        {
            title: t('header_navbar2.translated-text'),
            url: "/Service",
            cName: 'nav-links',
            classNameli : 'nav-li'
        },
        {
            title: t('header_navbar3.translated-text'),
            url: "/SecteurActivite",
            cName: 'nav-links',
            classNameli : 'nav-li'
        }
    ]        
    return( 
        <div className='top-bar'>                       
            <div className='container' id = 'navbar'>
                <ul className='nav-container'>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index} className={item.classNameli}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>    
                            </li>
                        )
                    })}
                    <li className="nav-li" id = 'icon'>
                        <a href="./user">
                            <img alt="Imgheader" style={{width:"50px"}} src={Home}></img>
                        </a>    
                    </li>
                </ul>
            </div>
        </div>
    )
}  

export default Navbar
