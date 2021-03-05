import React, { useState } from 'react';
import EmailValidator from 'email-validator';

import './Signup.css';
import './BtnSignup.css';


const Signup = () => {
    var boolemail=false;
    var boolusername=false;
    var boolpassword=false;
    var boolphone=false;


    const [firstname, setfirstname] = useState("");
    const [lastname , setlastname] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [phone , setPhone] = useState("");

    const [Errorpassword, setErrorpassword] = useState("");
    const [Errorpassword2, setErrorpassword2] = useState("");
    const [Erroremail, setErroremail] = useState("");
    const [Errorusername, setErrorusername] = useState("");
    const [Errorphone, setErrorphone] = useState("");
    const [errorMessage, SeterrorMessage] = useState("");


    const handleSubmit = event => {
        
        if (!username){
            setErrorusername('* Veuillez entrer un identifiant.');
        }else{
            if(username.substr(0,1) === '.'){
                setErrorusername('* Votre identifiant ne peut pas commencer par un point.'); 
            }else{
                if(!username.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)) {
                    setErrorusername('* Votre identifiant ne peut contenir que des lettres, des chiffres, des traits de soulignement et des points');
                }else{  
                    if(username.length <= 4){
                        setErrorusername('* Votre identifiant est trop court.');
                    }else{
                        if(username.length >= 16){
                            setErrorusername('* Votre identifiant est trop long.');
                        }else{
                            setErrorusername(' ');
                            boolusername=true;
                        }
                    }
                }
            }
        }
        
        if(!password){
            setErrorpassword('* Veuillez entrer un mot de passe.');
        }else{
            if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
                if(password !== password2){
                    setErrorpassword2('* Votre mot de passe est différent.');
                }else{
                    setErrorpassword('');
                    setErrorpassword2('');
                    boolpassword=true;
                }
            } else {
                setErrorpassword('* Le mot de passe doit au moins 8 caractères, dont une majuscule, une minuscule et un chiffre.');
            }   
        }


        if(!email){
            setErroremail('* Veuillez entrer une adresse mail.');
        } else {
            if(!EmailValidator.validate(email)){
                setErroremail('* Votre adresse mail est incorrect.');
            }else {
                setErroremail('');
                boolemail=true;
            }
        }

        console.log(phone.length);
        if(phone){
            if(!phone.match(/^0[1-9]([-. ]?[0-9]{2}){4}$/)){
                    setErrorphone('* Votre numéro de téléphopne est incorrect');
                }else{
            boolphone=true;
            setErrorphone(' ');
            }
        }else{
            setErrorphone(' ');
        }



        if(boolpassword && boolemail && boolusername && boolphone){
            if (username){
                if(username.substr(0,1) !== '.'){
                    if(username.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)) {
                        if(username.length >= 4) {
                            if(username.length <= 16){
                                if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
                                    if(password === password2){
                                        if(email){
                                            if(EmailValidator.validate(email)){                                              
                                                setErrorpassword(' ');
                                                setErrorpassword2(' ');
                                                setErroremail(' ');
                                                setErrorphone(' ');
                                                fetch("http://localhost:3001/api/AddUser", {           
                                                    method: "POST",                
                                                    body: JSON.stringify({ 
                                                        username: username, 
                                                        password: password,
                                                        firstname : firstname,
                                                        lastname : lastname,
                                                        email: email, 
                                                        phone: phone 
                                                    }), 
                                                    headers: { 
                                                        "Content-type": "application/json; charset=UTF-8"
                                                    } 
                                                }) 
                                                .then(response => response.json()).then(
                                                    (result) => {
                                                        SeterrorMessage(result['response']);
                                                    }
                                                );
                                            }
                                        }
                                    }
                                }           
                            }
                        }    
                    } 
                }
            }
        }   
    };
                       



    return (

      <div className="Pageregister">
          <div className='register'>
                    <div className="register-box">
                    <h2>Inscription</h2>
                    <form>
                        <div className="user-box">
                            <label>Identifiant *</label>
                            <input type="text" name="identifiant" required="" value ={username} onChange={(e) => setusername(e.target.value)}/>
                            <div className= 'textError'> {Errorusername} </div>
                        </div>
                        <div className="user-box">
                            <label>Mot de passe *</label>
                            <input type="password" name="mdp" required="" value ={password} onChange={(e) => setPassword(e.target.value)}/>
                            <div className= 'textError'> {Errorpassword} </div>
                        
                        </div>
                        <div className="user-box">
                            <label>Confirmer le mot de passe *</label>
                            <input type="password" name="mdp" required="" value ={password2} onChange={(e) => setPassword2(e.target.value)}/> 
                            <div className= 'textError'> {Errorpassword2} </div>
                            
                        </div>
                        <div className="user-box">
                            <label>Nom</label>
                            <input type="text" name="nom" value ={firstname} onChange={(e) => setfirstname(e.target.value)} />                
                        </div>
                        <div className="user-box">
                            <label>Prénom</label>
                            <input type="text" name="prenom" value ={lastname}  onChange={(e) => setlastname(e.target.value)}/>
                        </div>
                        <div className="user-box">
                            <label>Adresse e-mail *</label>
                            <input type="text" name="mail"  required=""  value ={email} onChange={(e) => setemail(e.target.value)}/>
                            <div className= 'textError'> {Erroremail} </div>                
                        </div>
                        <div className="user-box">
                            <label>N° Téléphone <h1 className="littleText">(recommandé)</h1> </label>
                            <input type="text" name="telephone" minLength="10" maxLength="10" size="10" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            <div className= 'textError'> {Errorphone} </div>
                            
                        </div>
                        <div id="requis">
                            * : Champs obligatoires
                        </div>
                        <table>
                            <tr>
                                <td className='CaseExt'></td>
                                <td className='CaseInt'>
                                <a  onClick={handleSubmit} >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>

                                    M'INSCRIRE
                                   
                                </a>
                                </td>
                                <td className='CaseExt'></td> 
                                
                            </tr>
                        </table>
                        <div className= 'textError'> {errorMessage} </div>
                    </form>
                    
                </div>
                </div>

    </div>
   );
}



export default Signup;