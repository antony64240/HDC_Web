import React from "react";
import loginImg from "../../../image/login.svg";
import RegisterStyle from './style/index_style';
import { CONFIG }  from '../../enum-list/enum-list';
import { CircularProgress } from '@material-ui/core';

var regularExpressionStrong = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/;
var regularExpressionMiddle = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;


export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginParams: {
                email: "",
                password: "",
                password1: ""
            },
            errorMessage:"",
            eventListener: "",
            timer : true
        }
    }

    enterpush = (e)  => {
      if (e.key === 'Enter') {
        if(this.state.timer == true){
          console.log(this.timer);
          this.handleRegister();
          this.setState({timer:false});
          setTimeout(() => this.setState({timer:true}),1000);
        }
      }
    }

    componentDidMount =() =>{
      document.addEventListener('keypress', this.enterpush);
    }

    componentWillUnmount =() =>{
      document.removeEventListener('keypress', this.enterpush);
    }


    handleRegister = () => {
      this.setState({errorMessage:<CircularProgress/>})
      fetch(`${CONFIG.URLAPI}AddUser`, {
          method: "POST",
          body: JSON.stringify(
            {
              email: this.state.loginParams.email, 
              password: this.state.loginParams.password
            }
          ),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      }).then(response => response.json()).then((result) => {
          if (result['status'] === "success") {
            this.setState({errorMessage:result.response + " Veuillez valider votre email !"});
            setInterval(() => { window.location.href = '#/Login'},2000);
          } else { 
            this.setState({errorMessage:result.response});
          }
      })
    }

    passwordStrenght = () =>{
      const { password , password1 } = this.state.loginParams;
      let a = document.getElementById('StrengthPassword');
      let b = document.getElementById('checkequals');
      if (password.match(regularExpressionStrong) != null) {
        a.style.width = `100%`;
        a.style.backgroundColor = `green`;
      }
      else if (password.match(regularExpressionMiddle) != null){
        a.style.width = `66%`;
        a.style.backgroundColor = `orange`;
      }
      else if(password.length>7) {
       a.style.width = `33%`;
       a.style.backgroundColor = `red`;
      }
      else{
        a.style.width = `3px`;
        a.style.backgroundColor = `red`;
      }

      if(password === password1 && password.length>7){
        b.style.width = `100%`;
        b.style.backgroundColor = `green`;
      }else{
        b.style.backgroundColor = ``;
      }
      
    }
    
    setStateSync(state){
        return new Promise(resolve=>{
            this.setState(state,resolve)
        })
    }

    handleFormChange = async event => {
      let loginParamsNew = {
          ...this.state.loginParams
      };
      let val = event.target.value;
      loginParamsNew[event.target.name] = val;
      this.setStateSync({loginParams: loginParamsNew}).then((e) => this.passwordStrenght());
    };


    render() {
        return(
          <RegisterStyle>
          <RegisterStyle.Header>Register</RegisterStyle.Header>
          <RegisterStyle.Content>
          <RegisterStyle.IMGContainer>
              <RegisterStyle.ImgLogin alt ="ImgLogin" src={loginImg} />
          </RegisterStyle.IMGContainer>
            <RegisterStyle.Form onSubmit = {this.handleRegister}>
            <RegisterStyle.FormGroup>
                <RegisterStyle.Label htmlFor="email">Email</RegisterStyle.Label>
                <RegisterStyle.Input type="text" name="email" onChange={this.handleFormChange} placeholder="email" />
              </RegisterStyle.FormGroup>
              <RegisterStyle.FormGroup>
                <RegisterStyle.Label htmlFor="password">Password</RegisterStyle.Label>
                <RegisterStyle.Input  style={{marginBottom: '1px'}} type="password" name="password" onChange={this.handleFormChange} placeholder="password" />
                <span id='StrengthPassword'  style={{ transitionDuration: '330ms', marginBottom: '30px', height : '10px' ,     borderRadius: '10px'}} ></span>
              </RegisterStyle.FormGroup>
              <RegisterStyle.FormGroup>
                <RegisterStyle.Label htmlFor="password"> Verify password :</RegisterStyle.Label>
                <RegisterStyle.Input  style={{marginBottom: '1px'}} type="password" name="password1" onChange={this.handleFormChange} placeholder="password" />
                <span id='checkequals'  style={{ transitionDuration: '330ms', marginBottom: '30px', height : '10px' , borderRadius: '10px'}} ></span>
              </RegisterStyle.FormGroup>
            </RegisterStyle.Form>
            <RegisterStyle.Error>{this.state.errorMessage}</RegisterStyle.Error>
          </RegisterStyle.Content>
          <RegisterStyle.Footer className="footer">
            <RegisterStyle.Btn  className="btn" onClick={this.handleRegister}>
            Sign Up !
            </RegisterStyle.Btn>
          </RegisterStyle.Footer>
        </RegisterStyle>
        );
    }
}
