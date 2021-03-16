import React, {useState, useEffect} from 'react';
import ProductList from './ProductList';
import './files.css'
import Upload from './Upload';
import axios from 'axios';
import { HamburgerButton } from '../Hamburger/HamburgerButton';




const ListFolder = () => {

    const [isLoaded, setisLoaded] = useState(Boolean);
    const [currentUrl, setcurrentUrl] = useState("");
    const [files, setfiles] = useState([]);
    const [Counter, setCounter] = useState(Number);
    const [UploadFile, setUploadFile] = useState(Number);
    const [Clicked, setClicked] = useState(Boolean);


    const ChangeStyle = () => {
      setClicked(!Clicked)
    }

    class Files {
        constructor(name, extension) {
            this.name = name,
            this.extension = extension
        }
    }


    const SendReq = () => {
        fetch("http://localhost:3001/api/ListFichier", {
            method: "POST",
            body: JSON.stringify(
                {UrlRequest: currentUrl, username: localStorage.getItem('username'), token: localStorage.getItem('token')}
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then((result) => {

            if (result['status'] === "success") {
                localStorage.setItem('connected', true);
                files.length = 0;
                console.log(files);
                console.log(result.list);
                for (var i = 0; i < result.list.length; i++) {
                    files.push(new Files(result.list[i].name, result.list[i].extension));
                }
                setCounter(Counter + 1);
                setisLoaded(true);

            } else {
                localStorage.setItem('connected', false);
                localStorage.setItem('username', '');
                window.location.href = '/login';
            }
        });
    };


    const handleClick = (name,extension) => {
        if(extension=="dossier"){
            setcurrentUrl(currentUrl + "/" + name);
        }else{
            axios.get("http://localhost:3001/api/Download"+"?CurrentValue="+currentUrl+"&username="+localStorage.getItem('username')+"&name="+name) 
            .then((response) => {
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
        for(var i = 0; i<url.length-1; i++){
            tab[i] = url[i]
        }
        var string = tab.toString();
        string = string.replaceAll(",",'/');
        console.log(string);
        setcurrentUrl(string);
    }

    //Permet de mettre à jour ma liste à chaque changemement (Affichage, Upload)
    useEffect(() => {
        SendReq()
    }, [currentUrl,UploadFile]);


    if (!isLoaded) {
        return <button onClick={SendReq}>afficher les dossier</button>
    } else {

        var content = files.map((data) => <div className="test"
            onDoubleClick={() => handleClick(data.name,data.extension)}><ProductList data={data}/></div>);
        return (
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
