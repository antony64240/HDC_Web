import React from "react";
import loginImg from "../../../image/login.svg";
import LoginStyle from './style/index_style';
import { CONFIG }  from '../../enum-list/enum-list';
import { CircularProgress } from '@material-ui/core';
import { withTranslation  } from "react-i18next";


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        loginParams: {
            email: "",
            password: ""
        },
        errorMessage:"",
        eventListener: "",
        timer : true,
        timerOut : null
    } 
  }

    enterpush = (e)  => {
      if (e.key === 'Enter') {
        if(this.state.timer == true){
          this.handleLogin()
          this.setState({timer:false})
          this.timerOut = setTimeout(() => this.setState({timer:true}),1000)
        }
      }
    }

    componentDidMount(){
      document.addEventListener('keypress', this.enterpush);
    }

    componentWillUnmount(){
      document.removeEventListener('keypress', this.enterpush);
      clearTimeout(this.timerOut);
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
                localStorage.setItem('token', result.token);
                window.location.href ='#/User';
            } else {
                localStorage.setItem('token', '')
                this.setState({errorMessage:result.response});
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

  

    forgetMdp = () =>{
      this.props.ismdpForget.setState({ismdpForget:true})
    }


    render() {
      const { t } = this.props;
        return(
          <LoginStyle>
          <LoginStyle.Header>{t('connexion.translated-text')}</LoginStyle.Header>
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
                <LoginStyle.Label htmlFor="password">{t('password.translated-text')} :</LoginStyle.Label>
                <LoginStyle.Input type="password" name="password" onChange={this.handleFormChange} placeholder="password" />
              </LoginStyle.FormGroup>
            </LoginStyle.Form>
            <LoginStyle.Error>{this.state.errorMessage}</LoginStyle.Error>
          </LoginStyle.Content>
          <LoginStyle.Footer>
            <LoginStyle.Btn  className="btn" onClick={this.handleLogin.bind(this)}>
            {t('connexion.translated-text')}
            </LoginStyle.Btn>
          </LoginStyle.Footer>
            <LoginStyle.Href onClick={this.forgetMdp}> {t('forgetMdpText.translated-text')} ?</LoginStyle.Href> 
        </LoginStyle>
        );
    }
}

export default withTranslation()(Login);