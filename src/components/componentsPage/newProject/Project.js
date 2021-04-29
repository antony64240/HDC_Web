import React,{useEffect, useState} from 'react';
import { CONTAINER , TextTitle , P , TEXT , TEXTAGENDA , TEXTAREA } from './style'
import Upload from '../Folder/Upload'
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker , MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TextField , Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { CONFIG }  from '../../enum-list/enum-list';

const NewProjects = (props) => {
 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [errorMessage, seterrorMessage] = useState(String);
    const [descriptif, setdescriptif] = useState(String);
    const [nom, setnom] = useState(String);

    const changeDate= (e)=>{
        if(e> new Date()){
            setSelectedDate(e)
        }
    }

    const checkData = () =>{
        let User = JSON.parse(localStorage.getItem('User'));
        if(User.firtname === 'undefined'){
            return false;
        }
        if(User.lastname === 'undefined'){
            return false;
        }
        if(User.areacode === 'undefined'){
            return false;
        }
        if(User.phone === 'undefined'){
            return false;
        }
        if(User.city === 'undefined'){
            return false;
        }
        if(User.compagny === 'undefined'){
            return false;
        }
        if(User.address === 'undefined'){
            return false;
        }
        return true
    }


    const Submit = () => {  
        if(checkData()){
            let User = JSON.parse(localStorage.getItem('User'));
            seterrorMessage(<CircularProgress/>)
            fetch(`${CONFIG.URLAPI}newProject`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "token": localStorage.getItem('token')
                },
                body: JSON.stringify(
                    {
                    email: User.email,
                    descriptif:descriptif,
                    nom:nom,
                    datefin:selectedDate.valueOf(),
                    }
                )
            })
            .then(response => response.json())
            .then((result) => {
                if (result['status'] === "success") {
                    console.log(result)
                    seterrorMessage(result.response);
                } else {
                    seterrorMessage(result.response);
                    toast.error('Perte de connexion, vous allez être redirigés.')
                    setTimeout(()=> window.location.href = "#/Login" ,2000)
                }
            })
        }else{
            seterrorMessage("Toutes les informations personnelles doivent être renseignées pour faire une demande de projet.")
        }
      }
    
    
    return(
        <div style={props.opacityProject ? enable : disable}>
            <CONTAINER>
                <TextTitle>Nouveau Projet :</TextTitle>
                <input value={nom} name="nom" onChange={(e) => setnom(e.target.value)}/>
                <TEXTAGENDA>Descriptif du projet à réaliser :</TEXTAGENDA>
                <TEXTAREA id="textarea" rows="5" cols="80" value={descriptif} onChange={(e) => setdescriptif(e.target.value)} />
                <div>
                <div style={{display: "inline-flex"}}>  
                    <TEXTAGENDA >Délais de livraison :   </TEXTAGENDA>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            value={selectedDate}
                            onChange={changeDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}/>
                    </MuiPickersUtilsProvider>
                </div>
                </div>
                <p >
                Merci de bien importer un fichier .Zip contenant les élèments nécessaires à l'études de votre projet.</p>
                <p >
                Votre projet sera étudié dans un délai de 48 heures après dépôts de celui-ci. Un devis vous sera envoyé à l'adresse suivante : "" 
                après études de projet et capacité de livraison. Vous pourrez retrouver dans votre espace client vos fichiers déposer ainsi que le devis.
                Dans le cas d'un possible accord, vous allez aussi pouvoir suivre l'état d'avancement sur ce même dépôt en ligne.
                </p>
                <Upload/>
                </CONTAINER>
                <Button onClick={() => Submit()}  style={{width:'20vh'}} variant="contained" color="primary">Valider</Button>
                {errorMessage}
                <P>Vos données personnelles seront traitées de façon strictement confidentielle et ne seront en aucun cas transmises à des tiers.</P>  
        </div>
    )
}
export default NewProjects;





const enable = {
    opacity : "1",
    transitionDuration : "0.7s",
    position: 'relative',
    width:'100%',
    height:'400%',
    padding: '2rem 3rem',
    borderTop: '1rem solid'
};
const disable = {
    position:'fixed',
    top:'-100rem',
    opacity :  "0",
    transitionDuration : "0.7s",
    height : '0'
};