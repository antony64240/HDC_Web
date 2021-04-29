import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CONFIG }  from '../../enum-list/enum-list';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Upload.css';
import { Progress } from 'antd';
import 'antd/dist/antd.css';


const  Upload  = ( props ) => {

    let currentUrl = props.currentUrl;
    let setData = props.Data;
    let UploadFile = props.DataLenght;

    const [selectedFile, setselectedFile] = useState();
    const [loaded, setloaded] = useState(Number);


    const checkMimeType = (event) => { // getting file object
        let files = event.target.files;
        let err = [];
        const types = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf','application/x-zip-compressed','application/x-gzip']


        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) { 
                err[x] = files[x].type + ' Le format n\'est pas supporté.\n Format supporté: PNG,JPG,PDF,ZIP';
            }
        };
        for (var z = 0; z < err.length; z++) {
            toast.error(err[z]);
            event.target.value = null;
        }
        return true;
    }

    const maxSelectFile = (event) => {
        let files = event.target.files
            if (files.length > 5) {
                const msg = 'Juste 5 fichier peuvent être upload en même temps !'
                event.target.value = null
                toast.warn(msg)
                return false;
            }
        return true;
    }

    const checkFileSize = (event) => {
        let files = event.target.files;
        let size = 20000000;
        let err = [];

            for (var x = 0; x < files.length; x++) {
                if (files[x].size > size) {
                    err[x] = files[x].type + `Le fichier est trop large, chosissez-en un plus petit s'il vous plaît`;
                }
            };
            for (var z = 0; z < err.length; z++) {
                toast.error(err[z])
                event.target.value = null
            }
            return true;
        
    }

    const onChangeHandler = event => {
        var files = event.target.files
        if (maxSelectFile(event) && checkMimeType(event) && checkFileSize(event)) { // if return true allow to setState
            setselectedFile(files)
        }
        event.target.files = null;
    }

    useEffect(()=>{
        console.log(loaded)
    },[loaded])

    const onClickHandler = () => {
        const data = new FormData();
        let User = JSON.parse(localStorage.getItem('User'));
        currentUrl = ""
        if(selectedFile==null){
            const msg = 'Aucun fichier sélectionné.'
            toast.warn(msg)
        }else{
            for (var x = 0; x < selectedFile.length; x++) {
                data.append('file', selectedFile[x]);
            }
            axios.post(`${CONFIG.URLAPI}UploadFile?url=Currenturl=${currentUrl}?user=${User.email}?token=${localStorage.getItem("token")}`,
            data
            ,{
                onUploadProgress: ProgressEvent => {
                    setloaded(ProgressEvent.loaded / ProgressEvent.total * 100)                
                }
            })
            .then(res => {
                toast.success('upload success');
                setData(UploadFile+selectedFile.length)
                
            }).catch(err => {
                if(err){
                setTimeout(()=> window.location.href = "#/Login" ,2000)
                toast.error('Perte de connexion, vous allez être redirigés.')
                }
            })
        }
    }

        return( 
            <React.Fragment>
                <label>Upload Your File </label>
                <input type="file"  multiple onChange={onChangeHandler}/>
              <ToastContainer />
              <div style={{display:"block",width:"30px"}}>
                <Progress
                        width="60px"
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={loaded.toFixed(2)}
                    />
                </div>
              <button type="button"  onClick={onClickHandler}>Upload</button>
              </React.Fragment>
      );
}

export default Upload;
