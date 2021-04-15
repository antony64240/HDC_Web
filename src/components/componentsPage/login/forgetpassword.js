import React,{useEffect, useState} from "react";
import loginImg from "../../../image/login.svg";
import LoginStyle from './style/index_style';
import EmailValidator from 'email-validator';
import {CircularProgress} from '@material-ui/core';
import { CONFIG }  from '../../enum-list/enum-list';


export const ForgetPassword = (props) => {


    const [Email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = () => {     
      if(EmailValidator.validate(Email)){
      setMessage(<CircularProgress />) 
        fetch(`${CONFIG.URLAPI}ForgotPassword`, {
            method: "POST",
            body: JSON.stringify(
                {
                  email: Email,
                }
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then((result) => {
          setMessage(result.response)
        })
      }else{
        setMessage("Veuillez entrer une adresse valide.")
      }
    }

    const forgetMdp = () => {
      props.mdpForget.setState({ismdpForget:false})
    }

        return(
          <LoginStyle>
          <LoginStyle.Header>Mot de passe oublié?</LoginStyle.Header>
          <LoginStyle.Content>
            <LoginStyle.IMGContainer>
              <LoginStyle.ImgLogin alt ="ImgLogin" src={loginImg} />
            </LoginStyle.IMGContainer>
            <LoginStyle.Form action={() => handleLogin()}>
              <LoginStyle.FormGroup>
                <LoginStyle.Label htmlFor="email">Entrer votre email :</LoginStyle.Label>
                <LoginStyle.Input type="text" name="email" value={Email} onChange={(event) => {setEmail(event.target.value)}} placeholder="Email" />
              </LoginStyle.FormGroup>
            </LoginStyle.Form>
          </LoginStyle.Content>
          <LoginStyle.Footer>
            <LoginStyle.Btn type="submit" onClick={() => handleLogin()} type="submit">
              Récuperer
            </LoginStyle.Btn>
          </LoginStyle.Footer>
            <LoginStyle.Btn type="button" onClick={() => forgetMdp()}>
              Retour
            </LoginStyle.Btn>
            <LoginStyle.Label><br/>{message}</LoginStyle.Label>
        </LoginStyle>
        );
}
