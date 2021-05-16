import React from 'react';
import LogoZip from '../../../image/zip.png';
import LogoDossier from '../../../image/dossier.png';
import LogoPdf from '../../../image/Logopdf.png';
import LogoJpg from '../../../image/LogoJpg.png';
import './files.css'

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
    }
];


function ProductIcon({data, onClick}) {

    return(images.map((item) => {
        const name = data.name.substring(0, 15);
        if (item.value === data.extension.toLowerCase()) {
            return <div onClick={(e) => onClick(e)}
                className='boxfile'
                key={data._id}>
                <img alt="LogoFiles" className='logoFiles'
                    src={item.url}
                    style={{width: '4rem'}
                }></img>
                <p style={
                    {
                        color: 'black',
                        fontSize: '0.7em',
                        paddingTop: "0px"
                    }
                }>
                    {name}</p>
                <div style={{display:"none"}}>
                    {data.name+data.extension}
                </div>
            </div>
            
        }
    }))
}


export default ProductIcon
