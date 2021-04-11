import React from "react";
import loginImg from "../../../image/login.svg";
import RegisterStyle from './style/index_style';

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginParams: {
                email: "",
                password: "",
                password1: ""
            },
            errorMessage:""
        }
    }


    handleRegister = () => {
      fetch("http://localhost:3001/api/AddUser", {
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
        console.log(result)
          if (result['status'] === "success") {
            console.log("here")
            window.location.href = '/Login';
          } else { 
            console.log("here")
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
          <RegisterStyle ref={this.props.containerRef}>
          <RegisterStyle.Header>Inscription</RegisterStyle.Header>
          <RegisterStyle.Content>
          <RegisterStyle.IMGContainer>
              <RegisterStyle.ImgLogin alt ="ImgLogin" src={loginImg} />
          </RegisterStyle.IMGContainer>
            <RegisterStyle.Form>
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
            <RegisterStyle.Btn type="button" className="btn" onClick={this.handleRegister}>
              Inscription
            </RegisterStyle.Btn>
          </RegisterStyle.Footer>
        </RegisterStyle>
        );
    }
}
