import React, { useEffect, useState } from 'react';
import { CONFIG } from '../../components/enum-list/enum-list'
import loginImg from "../../image/login.svg";
import { CircularProgress } from '@material-ui/core';
import PasswordRecovery from '../../components/componentsPage/login/style/index_style';


var regularExpressionStrong = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/;
var regularExpressionMiddle = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;


 const RecoveryPassword = () =>  {


    const getQueryStringValue =  (key) => {  
        return decodeURIComponent(window.location.hash.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*+\#]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }  

    const [form, setform] = useState({password1 : "" , password2 : ""});
    const [errorMessage, seterrorMessage] = useState(String);

    const Changeform = async (e) =>{
        const {name , value }  = e.target;
        setform({...form  , [name] : value});
    }

    const handleCheck = () => {
      let token = getQueryStringValue('token');
      if(token !== ''){
        seterrorMessage(<CircularProgress/>)
        fetch(`${CONFIG.URLAPI}ForgotPassword`, {
            method: "POST",
            body: JSON.stringify(
              {
                password : form.password1, 
                token : token
              }
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then((result) => {
            if (result['status'] === "success") {
              seterrorMessage("Done, You will be redirected.");
              setTimeout(() => { window.location.href ='#/Login'} , 1500);
              
            } else { 
              seterrorMessage(result.response);
            }
        })
      }
    }

    useEffect(()=>{
      let a = document.getElementById('StrengthPassword')
      let b = document.getElementById('checkequals')
      if (form.password1.match(regularExpressionStrong) != null) {
        a.style.width = `100%`;
        a.style.backgroundColor = `green`
      }
      else if (form.password1.match(regularExpressionMiddle) != null){
        a.style.width = `66%`;
        a.style.backgroundColor = `orange`
      }
      else if(form.password1.length>7) {
       a.style.width = `33%`;
       a.style.backgroundColor = `red`
      }
      else{
        a.style.width = `3px`;
        a.style.backgroundColor = `red`
      }
      if(form.password1 === form.password2 && form.password1.length>7){
        b.style.width = `100%`;
        b.style.backgroundColor = `green`;
      }else{
        b.style.backgroundColor = ``;
      }
    },[form])




    return (
        <PasswordRecovery style={{marginTop:'10vh'}}>
        <PasswordRecovery.Content>
          <PasswordRecovery.IMGContainer>
            <PasswordRecovery.ImgLogin alt ="ImgLogin" src={loginImg} />
          </PasswordRecovery.IMGContainer>
          <PasswordRecovery.Form>
            <PasswordRecovery.FormGroup>
              <PasswordRecovery.Label htmlFor="email">Password1 :</PasswordRecovery.Label>
              <PasswordRecovery.Input style={{marginBottom: '1px'}} type="password" name="password1" onChange={(e) => Changeform(e)} placeholder="password1"  />
              <span id='StrengthPassword'  style={{ transitionDuration: '330ms', marginBottom: '30px', height : '10px' ,     borderRadius: '10px'}} ></span>
            </PasswordRecovery.FormGroup>
            <PasswordRecovery.FormGroup>
              <PasswordRecovery.Label htmlFor="password">Password2 :</PasswordRecovery.Label>
              <PasswordRecovery.Input style={{marginBottom: '1px'}} type="password" name="password2" onChange={(e) => Changeform(e)} placeholder="password2" />
              <span id='checkequals'  style={{ transitionDuration: '330ms', marginBottom: '30px', height : '10px' , borderRadius: '10px'}} ></span>
            </PasswordRecovery.FormGroup>
          </PasswordRecovery.Form>
          <PasswordRecovery.Error style ={{margin : '0 auto'}}>{errorMessage}</PasswordRecovery.Error>
        </PasswordRecovery.Content>
        <PasswordRecovery.Footer>
          <PasswordRecovery.Btn style={{width:'10em'}} onClick= {() => handleCheck()} className="btn" >
            Valid
          </PasswordRecovery.Btn>
        </PasswordRecovery.Footer>          
      </PasswordRecovery>
    )
}

export default RecoveryPassword;