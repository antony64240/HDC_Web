import React from "react";
import loginImg from "../../../image/login.svg";
import RegisterStyle from './style/index_style';
import { CONFIG }  from '../../enum-list/enum-list';
import { CircularProgress } from '@material-ui/core';

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
          console.log(this.timer)
          this.handleRegister()
          this.setState({timer:false})
          setTimeout(() => this.setState({timer:true}),1000)
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
            this.setState({errorMessage:result.response + " Veuillez valider votre email !"})
            setInterval(() => { window.location.href = '#/Login'},2000);
          } else { 
            this.setState({errorMessage:result.response})
          }
      })
    }

    

    handleFormChange = event => {
      let loginParamsNew = {
          ...this.state.loginParams
      };
      let val = event.target.value;
      loginParamsNew[event.target.name] = val;
      this.setState({loginParams: loginParamsNew});
    };


    render() {
        return(
          <RegisterStyle>
          <RegisterStyle.Header>Inscription</RegisterStyle.Header>
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
                <RegisterStyle.Label htmlFor="password">Mot de Passe</RegisterStyle.Label>
                <RegisterStyle.Input type="password" name="password" onChange={this.handleFormChange} placeholder="password" />
              </RegisterStyle.FormGroup>
              <RegisterStyle.FormGroup>
                <RegisterStyle.Label htmlFor="password">Mot de Passe</RegisterStyle.Label>
                <RegisterStyle.Input type="password" name="password1" onChange={this.handleFormChange} placeholder="password" />
              </RegisterStyle.FormGroup>
            </RegisterStyle.Form>
            <RegisterStyle.Error>{this.state.errorMessage}</RegisterStyle.Error>
          </RegisterStyle.Content>
          <RegisterStyle.Footer className="footer">
            <RegisterStyle.Btn  className="btn" onClick={this.handleRegister}>
            Inscription
            </RegisterStyle.Btn>
          </RegisterStyle.Footer>
        </RegisterStyle>
        );
    }
}
