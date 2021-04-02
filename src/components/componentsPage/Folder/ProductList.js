import React from 'react';
import LogoZip from '../../../image/zip.png';
import LogoDossier from '../../../image/dossier.png';
import LogoPdf from '../../../image/Logopdf.png';
import LogoJpg from '../../../image/LogoJpg.png';
import './files.css'
import { array } from 'prop-types';

const images = [
    {
        url: LogoZip,
        value: ".zip"
    }, {
        url: LogoPdf,
        value: ".pdf"
    }, {
        url: LogoJpg,
        value: ".jpg"
    },
    {
        url: LogoDossier,
        value: "dossier"
    }
];




function ProductList(props) {
    images.sort();

    return (
        <div>
            {
            images.map((item) => {
                if (item.value == props.data.extension) {
                    return <div className ='boxfile'> <img classnName='logoFiles' src={item.url} style={{width:'4rem'}} ></img><p style={{color:'black',fontSize:'0.7rem',paddingTop:"0px"}}>{props.data.name}</p></div>
                }
        })
        }
        </div>
    )
}

const textError ={

}



export default ProductList
