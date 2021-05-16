import React,{useEffect, useState , useContext , useRef} from 'react';
import { CONTAINER , TextTitle , P , TEXT , TEXTAGENDA , TEXTAREA } from './style'
import Upload from '../Folder/Upload'
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker , MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TextField , Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { CONFIG }  from '../../enum-list/enum-list';
import { useTranslation } from "react-i18next";
import UserData from "../../../Context/UserData";


const NewProjects = ({ UpdateProject , setProject , opacityProject }) => {
 
    
   
    const { t } = useTranslation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [errorMessage, seterrorMessage] = useState(String);
    const [descriptif, setdescriptif] = useState(String);
    const { User , setDataProject } = useContext(UserData);
    const [submit, setSubmit] = useState(Boolean); 
    const [disabled, setDisabled] = useState(Boolean); 
    const [uploadDone, setUploadDone] = useState(Boolean); 
    const firstRender = useRef(true);
    const [FilesLength, setFilesLength] = useState(Boolean); 
    const [datecreation , setdatecreation] = useState(new Date());

    const changeDate= (e)=>{
        if(e > new Date()){
            setSelectedDate(e)
        }
    }

    const handleClick = () =>{
        const {firstname, lastname, email, compagny, city, address, areacode, phone } =  User;
        if(firstname && lastname && email && compagny &&  city &&  address && areacode && phone){
            if(descriptif.length > 20 && FilesLength > 0){
                setDisabled(true);
                setSubmit(true);
            }else{
                seterrorMessage("Tout les champs doivent êtres remplis, ainsi qu'au minimum un fichier téléchargé.");
            }
        }else{
            seterrorMessage("Vous devez renseigner toute vos données personnels avant de pouvoir faire une commande.");
        }
    }


    useEffect(()=>{
        if (!firstRender.current){
            if(uploadDone)
                Submit()
        }   
    },[uploadDone]);

    useEffect(() => {
        firstRender.current = false;
    }, []);

    const Submit = () => {
            seterrorMessage(<CircularProgress/>)
            fetch(`${CONFIG.URLAPI}newProject`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "token": localStorage.getItem('token')
                },
                body: JSON.stringify(
                    {
                        descriptif:descriptif,
                        datefin: parseInt(selectedDate.valueOf()),
                        datecreation: datecreation
                    }
                )
            })
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                if (result['status'] === "success") {
                    seterrorMessage(result.response);
                    setSubmit(false);
                    setUploadDone(false);
                    setDisabled(false);
                    setProject(!UpdateProject);
                } else {
                    seterrorMessage(result.response);
                    toast.error('Perte de connexion, vous allez être redirigés.')
                    setTimeout(()=> window.location.href = "#/Login" ,2000)
                }
            })
      }
    
    
    return(
        <div style={opacityProject ? enable : disable}>
            <CONTAINER>
                <TextTitle>{t('newproject.translated-text')}</TextTitle>
                <TEXTAGENDA>{t('descNewProject.translated-text')}</TEXTAGENDA>
                <TEXTAREA id="textarea" rows="5" cols="80" value={descriptif} onChange={(e) => setdescriptif(e.target.value)} />
                <br/>
                <div style={{display: "inline-flex"}}>  
                    <TEXTAGENDA>{t('delay.translated-text')}</TEXTAGENDA>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            value={selectedDate}
                            onChange={changeDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}/>
                    </MuiPickersUtilsProvider>
                </div>
                <p>
                {t('filesTransfer.translated-text')}
                </p>
                <p>
                {t('StudyProjectp1.translated-text')} {User.Email} <br/>{t('StudyProjectp2.translated-text')}
                </p>
                <Upload setdatecreation={setdatecreation} Visible={"none"} setUploadDone={setUploadDone} Submit={submit} currentUrl={""} setFilesLength={setFilesLength}/>
                <div style={{textAlign:"center"}}>
                    <Button disabled={disabled} onClick={() => handleClick()}  style={{width:'20vh'}} variant="contained" color="primary">{t('confirm.translated-text')}</Button>
                    {errorMessage}
                    <P>{t('TextPersonnalInfo.translated-text')}</P> 
                </div>
                </CONTAINER> 
        </div>
    )
}
export default NewProjects;

const enable = {
    opacity : "1",
    transitionDuration : "0.7s",
    position: 'absolute',
    width:'100%',
    top:'60px',
    padding: '2rem 3rem',
    borderTop: '1rem solid',
    zIndex : '1000'
};


const disable = {
    position:'fixed',
    top:'-100%',
    width:'100%,',
    opacity :  "0",
    transitionDuration : "0.7s",
    zIndex : '1000'
};