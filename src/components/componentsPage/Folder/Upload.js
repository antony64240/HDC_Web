import React, { useState, useEffect , useContext , useRef } from 'react';
import axios from 'axios';
import { CONFIG }  from '../../enum-list/enum-list';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Upload.css';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import UserData from "../../../Context/UserData";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useTranslation } from "react-i18next";
import { checkMimeType , checkFileSize , maxSelectFile } from "../../../services/files";


const  Upload  = ({ setdatecreation , setUploadDone , Visible , Submit , currentUrl , setFilesLength }) => {

    const { User , setUser } = useContext(UserData);
    const [selectedFile, setselectedFile] = useState();
    const [loaded, setloaded] = useState(Number);
    const [Display, setDisplay] = useState("none");
    const { t } = useTranslation();
    const firstRender = useRef(true);


    useEffect(()=>{
        if (!firstRender.current){
            if(Submit)
            document.getElementById("buttonUpload").click();
        }
    },[Submit])

    useEffect(() => {
        firstRender.current = false;
    }, []);


    const onChangeHandler = event => {
        var files = event.target.files
        if (maxSelectFile(event) && checkMimeType(event) && checkFileSize(event)) { // if return true allow to setState
            setselectedFile(files)
            setFilesLength(files.length)
        }
        event.target.files = null;
    }


    const onClickHandler = () => {
        const data = new FormData();
        currentUrl = new Date().valueOf();
        console.log(currentUrl)
        setdatecreation(currentUrl);
        if(selectedFile==null){
            const msg = 'Aucun fichier sélectionné.'
            toast.warn(msg)
        }else{
            setDisplay("")
            for (var x = 0; x < selectedFile.length; x++) {
                data.append('file', selectedFile[x]);
            }
            axios.post(`${CONFIG.URLAPI}UploadFile?url=Currenturl=${currentUrl}?token=${localStorage.getItem("token")}`,
            data
            ,{
                onUploadProgress: ProgressEvent => {
                    setloaded(ProgressEvent.loaded / ProgressEvent.total * 100)                
                }
            })
            .then(res => {
                toast.success('upload success');
                setTimeout(() => setDisplay("none"),1000);
                setUploadDone(true);
            }).catch(err => {
                console.log(err)
            })
        }
    }

        return( 
        <div className='containerUpload'>
            <label>{t('Uploadlabel.translated-text')}</label>
            <input type="file" multiple onChange={onChangeHandler}/>
              <ToastContainer />
              <Button
                id="buttonUpload"
                style={{display:Visible}}
                variant="contained"
                color="default"
                onClick={onClickHandler}
                startIcon={<CloudUploadIcon />}
                >
                {t('Upload.translated-text')}
            </Button>
            <Progress
                    style={{display:Display}}
                    width={50}
                    type="circle"
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={loaded.toFixed(2)}
                />
        
        
        </div>
      );
}

export default Upload;
