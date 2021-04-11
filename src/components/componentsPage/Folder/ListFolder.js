import React, {useState, useEffect} from 'react';
import ProductList from './ProductList';
import './files.css'
import Upload from './Upload';
import axios from 'axios';
import {HamburgerButton} from '../../Hamburger/HamburgerButton';


const ListFolder = () => {

    const [isLoaded, setisLoaded] = useState(Boolean);
    const [currentUrl, setcurrentUrl] = useState("");
    const [files, setfiles] = useState([]);
    const [UploadFile, setUploadFile] = useState(Number);
    const [Clicked, setClicked] = useState(Boolean);


    const ChangeStyle = () => {
        setClicked(!Clicked)
    }

    
    const SendReq = () => {
  
        fetch("http://localhost:3001/api/ListFichier", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "UrlRequest":currentUrl,
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
            setcurrentUrl(`${currentUrl} + "/" + ${name}`);
        } else {
            axios.get("http://localhost:3001/api/Download",{
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
        let token = localStorage.getItem('token');
        console.log("token : " + token)
        SendReq()
    }, [currentUrl, UploadFile]);


    if (!isLoaded) {
        return <button onClick={SendReq}>afficher les dossier</button>
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
                
                    <p style={{color:"black"}} id="currentUrl">Dossier courrant : {currentUrl}</p>
                    <div className='containerBoxFile'>
                        {content}
                    </div>
                </div>
            <Upload data={[UploadFile,setUploadFile]}/>
            </div>
            </div>
        );

    }
}
export default ListFolder;
