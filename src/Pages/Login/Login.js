import React, {useState} from 'react';
import logoAccount from '../../image/LogoAccount.png';
import './Login.css'

const Login = () => {


  const [username, Setusername] = useState("");
  const [password, SetPassword] = useState("");
  const [errorMessage, SeterrorMessage] = useState("");
  

  const Handlelogin = event => {
    

    fetch("http://localhost:3001/api/LoginUser", {           
                                                    method: "POST",                
                                                    body: JSON.stringify({ 
                                                        username: username, 
                                                        password: password, 
                                                    }), 
                                                    headers: { 
                                                        "Content-type": "application/json; charset=UTF-8"
                                                    } 
                                                }) 
                                                .then(response => response.json()).then(
                                                    (result) => {
                                                        if(result['status']==="success"){
                                                          console.log("token update");
                                                          localStorage.setItem('token', result['token']);
                                                          localStorage.setItem('username',username);
                                                          localStorage.setItem('connected','true');
                                                          window.location.href ='/Accueil';
                                                        }else{
                                                          localStorage.setItem('connected','false');
                                                          localStorage.setItem('username','');
                                                          SeterrorMessage(result['response']);
                                                        } 
                                                    }
                                                )
  }

     return (
      <div className="Login"  >
        <div className="Login-box">
        
          <div className='IconeSite' id="card" >
            <img src={logoAccount} alt="LogoWA"/>   
          </div>
          <label className='textInput'> Identifiant </label>
          <input type="text" name="username"  value={username} onChange={(e) => Setusername(e.target.value)}/>
          <label className='textInput'> Mot de passe </label>
          <input type="password" name="password"   value={password} onChange={(e) => SetPassword(e.target.value)}/>
          
            <a href=''><h1> Mot de passe oublié?</h1></a>
            <div className= 'textError'> {errorMessage} </div>
          <div className='Btn'>
              <div className='BtnLogin' onClick={Handlelogin}>Se connecter</div>
            <br/>
            <a href="/signup">
              <div className='BtnRegister'>S'inscrire</div>
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default Login;