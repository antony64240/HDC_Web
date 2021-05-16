import React, {useState, useEffect , useContext , useDidMountEffect , useRef} from 'react';
import EmailValidator from 'email-validator';
import { TextField , Button } from '@material-ui/core';
import {TABLE, CONTAINER , ROW , COLUMN , TextTitle , P  } from './style'
import { useTranslation } from "react-i18next";
import { CONFIG }  from '../../enum-list/enum-list';
import { CircularProgress } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import UserData from "../../../Context/UserData";


const regNumber=/^[0-9]{1,5}$/;
const regAreacode=/^[0-9]{5}$/;
const url=`https://geo.api.gouv.fr/communes?nom=`;

const ProfilUsers = (props) => {
    const { t } = useTranslation();
    const { User , setUser } = useContext(UserData);
    const [disabled, setdisabled] = useState(Boolean); 
    const [count, setCount] = useState(0);
    const [AreaCode, setAreaCode] = useState(User.areacode)
    const [submit , setSubmit] = useState(Number);
    const [errorMessage, seterrorMessage] = useState(""); 
    const firstRender = useRef(true);

  
    const Submit = () => {  
        setUser({ ...User , areacode : AreaCode})
        seterrorMessage(<CircularProgress/>)
        setSubmit(submit+1)
    }

    const fetchData = () => {
        if(count !== 0){
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
                console.log(result)
                if (result['status'] === "success") {
                    seterrorMessage(result.response);
                    localStorage.setItem('token', result.token);
                } else {
                    seterrorMessage(result.response);
                    toast.error('Perte de connexion, vous allez être redirigés.');
                    setTimeout(()=> window.location.href = "#/Login" ,2000);
                }
            })
        }else{
            seterrorMessage(t('Datainchange.translated-text'));
        }
    }


    useEffect(()=>{
        if(!firstRender.current){
            fetchData()
        }
    },[submit])

    useEffect(() => {
        firstRender.current = false;
    },[]);

    const Changeform = (e) =>{
        const { name , value }  = e.target;
        setUser({...User  , [name] : value});
        setCount(count+1);
    }

    const setZIPCODE = () =>{
        if(count !== 0){
            fetch(url+User.city, {
                headers: {Accept: 'application/json'}
            })
            .then(res => res.json())
            .then(
                (result) => {
                    var tab = []
                    result.map((item,i) => tab.push(item))
                    if(tab.length > 0 && tab.length<100){
                        if(tab[0].codesPostaux){
                            let i = 0;
                            for(let data of tab){
                                if(data.nom === User.city){
                                    setAreaCode(tab[i].codesPostaux[0])
                                }
                                i++;
                            }
                           
                        }
                    }else{
                        setAreaCode('')
                    } 
                }
            )
        }
    }

    useEffect(async()=>{
        setZIPCODE()
    },[User.city]);


    useEffect(()=>{
        if(AreaCode){
            if(AreaCode.match(regNumber)===null)
                {
                    setAreaCode(AreaCode.substr(AreaCode.length))
               }
                else{
                    if(AreaCode.match(regNumber)===null){
                        setAreaCode(AreaCode.substr(0,AreaCode.length-1))
                    }}   
        }
        },[AreaCode]);

    return(
        <div style={props.opacityProfil ? enable : disable}>
            <CONTAINER>
            <ToastContainer />
            <TextTitle>{t('PersonnalInfo.translated-text')}</TextTitle>
            <TABLE align="center">
                <COLUMN><TextField style={input} name="firstname" label={t('firstname.translated-text')} type="text" value={User.firstname} onChange={(e) => Changeform(e)} /></COLUMN>
                <COLUMN><TextField style={input} name="lastname" label={t('lastname.translated-text')} type="text" value={User.lastname} onChange={(e) => Changeform(e)} /></COLUMN>
                <COLUMN><TextField style={input} name="email" label="Email" disabled type="text" value={User.email} onChange={(e) => Changeform(e)}/></COLUMN>
                <COLUMN><TextField style={input} name="compagny" label={t('compagny.translated-text')} type="text" value={User.compagny}  onChange={(e) => Changeform(e)} /></COLUMN>
                <COLUMN><TextField style={input} name="city" label={t('city.translated-text')} type="text" value={User.city} onChange={(e) => Changeform(e)} /></COLUMN>
                <COLUMN><TextField style={input} name="address" label={t('address.translated-text')} type="text" value={User.address} onChange={(e) => Changeform(e)} /></COLUMN>
                <COLUMN><TextField style={input} name="areacode" label={t('CityAreaCode.translated-text')} value={AreaCode} onChange={(e) => setAreaCode(e.target.value)} /></COLUMN>
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
    position: 'absolute',
    width:'100%',
    top:'60px',
    padding: '2rem 3rem',
    borderTop: '1rem solid'
};


const disable = {
    position: "absolute",
    top:'-100%',
    width:'100%,',
    opacity :  "0",
    transitionDuration : "0.7s",
};

const input = {
    margin:"20px",
    width:"30vh",
    marginBottom:"20px"
};

