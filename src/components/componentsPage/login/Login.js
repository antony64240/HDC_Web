import React,{useEffect, useState} from "react";
import loginImg from "../../../image/login.svg";
import LoginStyle from './style/index_style';



export const Login = (props) => {


    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Message, setMessage] = useState("");

    const handleLogin = () => {       
        fetch("http://localhost:3001/api/LoginUser", {
            method: "POST",
            body: JSON.stringify(
                {
                  email: Email,
                  password: Password
                }
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then((result) => {
            if (result['status'] === "success") {
                localStorage.setItem('Email',  result.user.email);
                localStorage.setItem('Phone', result.user.phone);
                localStorage.setItem('Areacide', result.user.Areacode);
                localStorage.setItem('City', result.user.city);
                localStorage.setItem('Compagny', result.user.compagny);
                localStorage.setItem('Compagny', result.user.compagny);
                localStorage.setItem('token', result.token);
                window.location.href ='/User';
            } else {
                localStorage.setItem('connected', false);
                localStorage.setItem('token', '')
                localStorage.setItem('Email', '');
                setMessage(result.response)
            }
        })
    }

    const forgetMdp = () => {
      props.mdpForget.setState({ismdpForget:true})
    }

        return(
          <LoginStyle>
          <LoginStyle.Header>Connexion</LoginStyle.Header>
          <LoginStyle.Content>
            <LoginStyle.IMGContainer>
              <LoginStyle.ImgLogin alt ="ImgLogin" src={loginImg} />
            </LoginStyle.IMGContainer>
            <LoginStyle.Form>
              <LoginStyle.FormGroup>
                <LoginStyle.Label htmlFor="email">Email :</LoginStyle.Label>
                <LoginStyle.Input type="text" name="email" value={Email} onChange={(event) => {setEmail(event.target.value)}} placeholder="Email" />
              </LoginStyle.FormGroup>
              <LoginStyle.FormGroup>
                <LoginStyle.Label htmlFor="password">Mot de passe :</LoginStyle.Label>
                <LoginStyle.Input type="password" name="password" value={Password} onChange={(event) => {setPassword(event.target.value)}} placeholder="Mot de passe" />
              </LoginStyle.FormGroup>
            </LoginStyle.Form>
            <LoginStyle.Error>{Message}</LoginStyle.Error>
          </LoginStyle.Content>
          <LoginStyle.Footer>
            <LoginStyle.Btn type="button" onClick={() => handleLogin()}>
              Connexion
            </LoginStyle.Btn>
          </LoginStyle.Footer>
            <LoginStyle.Href onClick={() => forgetMdp()}> Mdp oublié?</LoginStyle.Href>
            
        </LoginStyle>
        );
}
