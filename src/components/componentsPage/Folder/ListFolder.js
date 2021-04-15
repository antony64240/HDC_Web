import React, {useState, useEffect} from 'react';
import ProductList from './ProductList';
import './files.css';
import Upload from './Upload';
import axios from 'axios';
import {HamburgerButton} from '../../Hamburger/HamburgerButton';
import { CONFIG }  from '../../enum-list/enum-list';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';


const ListFolder = () => {

    const [isLoaded, setisLoaded] = useState(Boolean);
    const [currentUrl, setcurrentUrl] = useState(String);
    const [files, setfiles] = useState();
    const [UploadFile, setUploadFile] = useState(Number);
    const [Clicked, setClicked] = useState(Boolean);

    const DIV = styled.div`
        position : fixed;
        right : 30px;
        text-align: center;
        top:7rem;
    `;

    const ChangeStyle = () => {
        setClicked(!Clicked)
    }

    
    const SendReq = async () => {
        fetch(`${CONFIG.URLAPI}ListFichier`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "UrlRequest": currentUrl,
                "Email": localStorage.getItem('Email'),
                "token":localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status !== 201) {
            } else 
                return response.json();
            
        }).then((result) => {
            setfiles(result.list)
            setisLoaded(true);
        })
    };


    const handleClick = (name, extension) => {
        if (extension === "dossier") {
            setcurrentUrl(`${currentUrl}/${name}`);
        } else {
            axios.get(`${CONFIG.URLAPI}Download`,{
                headers: {
                    email:localStorage.getItem('Email'),
                    currentUrl: currentUrl,
                    token:localStorage.getItem('token')
                }
            }
            ).then((response) => {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
            });
        }
    }

    const handleRetour = () => {
        var url = currentUrl;
        url = url.split("/");
        var tab = [];
        for (var i = 0; i < url.length - 1; i++) {
            tab[i] = url[i]
        }
        var string = tab.toString();
        string = string.replaceAll(",", '/');
        setcurrentUrl(string);
    }

    useEffect(() => {
        SendReq()
    }, [currentUrl, UploadFile]);


    if (!isLoaded) {
        return  <DIV><CircularProgress/></DIV>
    } else {

        var content = files.map((data,index) => <div key={index} className="test"
            onDoubleClick={
                () => handleClick(data.name, data.extension)
        }><ProductList data={data}/></div>);
        return(
            <div>
                <HamburgerButton 
                    open={Clicked}
                    onClick={()=> ChangeStyle()}
                    width={30}
                    height={15}
                    strokeWidth={1}
                    color='black'
                    animationDuration={0.5}
                />
            <div className={Clicked ? 'SectionFiles-active' : 'SectionFiles'} >
      
            <button  className='BtnRetour' onClick={ () => handleRetour()}><span>Retour</span></button>      
                <div >
                    <div className='containerBoxFile'>
                        {content}
                    </div>
                </div>
            <Upload currentUrl={currentUrl} Data={setUploadFile} DataLenght={UploadFile}/>
            </div>
            </div>
        );

    }
}
export default ListFolder;
