import React, {useState, useEffect} from 'react';
import EmailValidator from 'email-validator';
import { TextField , Button } from '@material-ui/core';
import {TABLE, CONTAINER , ROW , COLUMN , TextTitle , P  } from './style'
import { useTranslation } from "react-i18next";
import { CONFIG }  from '../../enum-list/enum-list';
import { CircularProgress } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';



const regNumber=/^[0-9]{1,5}$/;
const regAreacode=/^[0-9]{5}$/;
const url=`https://geo.api.gouv.fr/communes?nom=`;

const ProfilUsers = (props) => {
    const { t } = useTranslation();
    
    const [User, setUser] = useState({
        email : "",
        firstname : "",
        compagny : "",
        address : "",
        city : "",
        phone : "",
        areacode : "",
        lastname : ""
    });
    const [disabled, setdisabled] = useState(Boolean)


    const [errorMessage, seterrorMessage] = useState(""); 

    const Submit = () => {  
        seterrorMessage(<CircularProgress/>)
          fetch(`${CONFIG.URLAPI}UpdateUser`, {
              method: "POST",
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "token": localStorage.getItem('token')
              },
              body: JSON.stringify(
                {
                  User : User
                }
            )
          })
          .then(response => response.json())
          .then((result) => {
              if (result['status'] === "success") {
                localStorage.setItem('User', JSON.stringify(User));
                seterrorMessage(result.response);
              } else {
                seterrorMessage(result.response);
                toast.error('Perte de connexion, vous allez être redirigés.')
                setTimeout(()=> window.location.href = "#/Login" ,2000)
              }
          })
      }

    const setData = () =>{
        let user = JSON.parse(localStorage.getItem('User'));
        setUser( user );
    }


    useEffect(()=>{
       setData()
    },[1])

    const Changeform = (e) =>{
        console.log(e)
        const { name , value }  = e.target;
        setUser({...User  , [name] : value});
    }

    useEffect(()=>{
        console.log(User)
    },[User])

    // sendrea<(()=>{
    //     fetch(url+city,{
    //             headers: {Accept: 'application/json'}
    //         })
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 var tab = []
    //                 result.map((item,i) => tab.push(item))
    //                 if(tab.length > 0 && tab.length<100){
    //                     if(typeof tab[0].codesPostaux !== 'undefined'){
    //                         setAreacode(tab[0].codesPostaux[0])
    //                     }
    //                 }else{
    //                     setAreacode('')
    //                 }
    //             }
    //         )
    // },[city])



    // useEffect(()=>{
    //     if(areacode.length===1){if(areacode.match(regNumber)===null){setAreacode(areacode.substr(areacode.length))}}else{if(areacode.match(regNumber)===null){setAreacode(areacode.substr(0,areacode.length-1))}}   
    // },[areacode]);

    return(
        <div style={props.opacityProfil ? enable : disable}>
            <CONTAINER>
            <ToastContainer />
            <TextTitle>{t('PersonnalInfo.translated-text')}</TextTitle>
            <TABLE align="center">
                <COLUMN><TextField style={input} name="firstname" label={t('firstname.translated-text')} type="text" value={User.firstname} onChange={(e) => Changeform(e)} /></COLUMN>
                <COLUMN><TextField style={input} name="lastname" label={t('lastname.translated-text')} type="text" value={User.lastname} onChange={(e) => Changeform(e)} /></COLUMN>
                <COLUMN><TextField style={input} name="email" disabled label="Email" type="text" value={User.email} onChange={(e) => Changeform(e)}/></COLUMN>
                <COLUMN><TextField style={input} name="compagny" label={t('compagny.translated-text')} type="text" value={User.compagny}  onChange={(e) => Changeform(e)} /></COLUMN>
                <COLUMN><TextField style={input} name="city" label={t('city.translated-text')} type="text" value={User.city} onChange={(e) => Changeform(e)} /></COLUMN>
                <COLUMN><TextField style={input} name="address" label={t('address.translated-text')} type="text" value={User.address} onChange={(e) => Changeform(e)} /></COLUMN>
                <COLUMN><TextField style={input} name="areacode" label={t('CityAreaCode.translated-text')} value={User.areacode} onChange={(e) => Changeform(e)}/></COLUMN>
                <COLUMN><TextField style={input} name="phone" label={t('phone.translated-text')} value={User.phone} type="text" onChange={(e) => Changeform(e)}/></COLUMN>
            </TABLE>
            <div>{errorMessage}</div>
            <Button onClick={() => Submit()} disabled={disabled} style={{width:'20vh'}} variant="contained" color="primary">Enregister</Button>
            <P>{t('TextPersonnalInfo.translated-text')}</P>
            </CONTAINER>
            
        </div>
    )
}
export default ProfilUsers;


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
    right:'-100rem',
    opacity :  "0",
    transitionDuration : "0.7s",
    height : '0'
};

const input = {
    margin:"20px",
    width:"30vh",
    marginBottom:"20px"
};

