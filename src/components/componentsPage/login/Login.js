import React from "react";
import loginImg from "../../../image/login.svg";
import LoginStyle from './style/index_style';
import { CONFIG }  from '../../enum-list/enum-list';
import { CircularProgress } from '@material-ui/core';

export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        loginParams: {
            email: "",
            password: ""
        },
        errorMessage:"",
        eventListener: "",
        timer : true
    } 
  }

    enterpush = (e)  => {
      if (e.key === 'Enter') {
        if(this.state.timer == true){
          console.log(this.timer)
          this.handleLogin()
          this.setState({timer:false})
          setTimeout(() => this.setState({timer:true}),1000)
        }
      }
    }

    componentDidMount(){
      document.addEventListener('keypress', this.enterpush);
    }

    componentWillUnmount(){
      document.removeEventListener('keypress', this.enterpush);
    }

    handleLogin = () => {  
      this.setState({errorMessage:<CircularProgress/>})
        fetch(`${CONFIG.URLAPI}LoginUser`, {
            method: "POST",
            body: JSON.stringify(
                {
                  email:  this.state.loginParams.email, 
                  password: this.state.loginParams.password
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
                window.location.href ='#/User';
            } else {
                localStorage.setItem('connected', false);
                localStorage.setItem('token', '')
                localStorage.setItem('Email', '');
                this.setState({errorMessage:result.response});
            }
        })
        

    }

    handleFormChange = event => {
      
      let loginParamsNew = {
          ...this.state.loginParams
      };
      console.log(loginParamsNew)
      let val = event.target.value;
      loginParamsNew[event.target.name] = val;
      this.setState({loginParams: loginParamsNew});
    };

    forgetMdp = () =>{
      this.props.ismdpForget.setState({ismdpForget:true})
    }


    render() {
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
                <LoginStyle.Input type="text" name="email" onChange={this.handleFormChange} placeholder="email"  />
              </LoginStyle.FormGroup>
              <LoginStyle.FormGroup>
                <LoginStyle.Label htmlFor="password">Mot de passe :</LoginStyle.Label>
                <LoginStyle.Input type="password" name="password" onChange={this.handleFormChange} placeholder="password" />
              </LoginStyle.FormGroup>
            </LoginStyle.Form>
            <LoginStyle.Error>{this.state.errorMessage}</LoginStyle.Error>
          </LoginStyle.Content>
          <LoginStyle.Footer>
            <LoginStyle.Btn  className="btn" onClick={this.handleLogin.bind(this)}>
              Connexion
            </LoginStyle.Btn>
          </LoginStyle.Footer>
            <LoginStyle.Href onClick={this.forgetMdp}> Mdp oublié?</LoginStyle.Href> 
            
        </LoginStyle>
        );
    }
}
