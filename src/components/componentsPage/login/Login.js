import React from "react";
import loginImg from "../../../image/login.svg";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginParams: {
                username: "",
                password: ""
            }
        }
    }

    handleLogin() {
        console.log(this.state.loginParams.username)
        
        fetch("http://localhost:3001/api/LoginUser", {
            method: "POST",
            body: JSON.stringify(
                {
                  username: this.state.loginParams.username,
                  password:this.state.loginParams.password
                }
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then((result) => {
            if (result['status'] === "success") {
                localStorage.setItem('token', result['token']);
                localStorage.setItem('username', this.state.loginParams.username);
                localStorage.setItem('connected', 'true');
                window.location.href ='/User';
            } else {
                localStorage.setItem('connected', 'false');
                localStorage.setItem('username', '');
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
          <div className="base-container" ref={this.props.containerRef}>
          <div className="header">Login</div>
          <div className="content">
            <div className="image">
              <img src={loginImg} />
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={this.handleFormChange} placeholder="username" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={this.handleFormChange} placeholder="password" />
              </div>
            </div>
          </div>
          <div className="footer">
            <button type="button" className="btn" onClick={this.handleLogin.bind(this)}>
              Login
            </button>
          </div>
        </div>
        );
    }
}
