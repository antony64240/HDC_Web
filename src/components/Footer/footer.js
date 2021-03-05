import React from 'react';
import LogoTel from '../../image/LogoTel.PNG';
import LogoWhatApp from '../../image/LogoWhatsapp.png';
import LogoSite from '../../image/logo512.png'

import './footer.css'

const bar_footer = () => {

  
        return (
            <footer className= 'footer'>
                <div className='block'>
                   <table align="center" border ="0" cellPadding="Z" cellSpacing="0">
                        
                        <tr>
                            <td className='tdImage'>
                                <img src={LogoTel} alt="Logotel"/>
                            </td>
                            <td width = "5px;"> &nbsp;</td>
                            <td className ='TdContact'>
                                <div text-align ='left'>
                                    "06 60 60 60 60"
                                    <br />
                                    Du lundi au vendredi de 9h à 20h       
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='tdImage'>
                                <img src={LogoWhatApp} alt="LogoWA"/>
                            </td>
                            <td width = "5px;"> &nbsp;</td>
                            <td className ='TdContact'>
                                <div text-align ='left'>
                                    "06 60 60 60 60"
                                    <br />
                                    Du lundi au vendredi de 9h à 20h       
                                </div>
                            </td>
                        </tr>
                    </table>
                    </div>
                    <div className='block'>
                        <p>
                            La conception sur mesure de vos projets. <br/>Nous maîtrisons l’ensemble du cycle de développement, de la conception à la mise sur le marché, de la carte au produit, selon votre besoin.
                        </p>
                    </div>
                    <div className ='block'>
                        <div className='IconeSite'>
                            <img src={LogoSite} alt="LogoWA"/>   
                        </div>
                    </div>
                
            </footer>
            
        )
     
}

export default bar_footer;

