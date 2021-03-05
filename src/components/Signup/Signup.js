import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  
    const [Nom, SetNom] = useState("");
    const [password, SetPassword] = useState("");
    const [email, Setemail] = useState("");
    const [username, Setusername] = useState("");

   
    
    
    
    const handleSubmit = event => {
      event.preventDefault();
      
    }


    return (
      
      <div className="row " id="Body">
        <div className="medium-5 columns left">
          
        <h4>Inscription</h4>
      
        <input type="text" name="email"  placeholder="Adresse Mail" value ={email} onChange={(e) => Setemail(e.target.value)}/>
        <input type="text" name="name"  placeholder="Nom" value ={Nom} onChange={(e) => SetNom(e.target.value)}/>
        <input type="text" name="username" placeholder="Nom d'utilisateur" value ={username} onChange={(e) => Setusername(e.target.value)}/>
        <input type="password" name="password"  placeholder="Mot de passe" value ={password} onChange={(e) => SetPassword(e.target.value)}/>
        
        <input type="submit" className="button" value="S'incrire !" onClick={handleSubmit}/>
        <a href="/login">Déjà inscrit ?</a>

        </div>
        
      </div>
   );
}



export default Signup;