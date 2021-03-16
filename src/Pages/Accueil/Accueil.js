import React, {useState} from 'react';

import './Accueil.css';

const Accueil = () => {

  const Handlelogin = event => {
    
    fetch("http://localhost:3001/api/CheckToken", {           
                                                    method: "POST",                
                                                    body: JSON.stringify({ 
                                                        token: localStorage.getItem('token'), 
                                                    }), 
                                                    headers: { 
                                                        "Content-type": "application/json; charset=UTF-8"
                                                    } 
                                                }) 
                                                .then(response => response.json()).then(
                                                    (result) => {
                                                        console.log(result['message']);
                                                        if(result['message']=='Token expired'){
                                                          localStorage.setItem('connected','false');
                                                        }                                               
                                                    }
                                                );                                        
  }
  
  
    return (     
      <div >
        Bienvenue à toi  {localStorage.getItem('username')}
        <br></br>
        {localStorage.getItem('token')}
        <br></br>
        {localStorage.getItem('connected')}
        <button onClick={Handlelogin}>Check token here !</button>
      </div>
    );
}

export default Accueil;