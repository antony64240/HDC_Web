import React, {useState, useEffect} from 'react';
import EmailValidator from 'email-validator';


const regexName = /^[a-z ,.'-]$/i;


const message =[

]



const ProfilUsers = (props) => {
    
   
    
   const [Nom, setNom] = useState("");
   const [Prenom, setPrenom] = useState("");
   const [Adresse, setAdresse] = useState("");
   const [Email, setemail] = useState("");
   const [Entreprise, setEntreprise] = useState("");
   const [Website, setWebsite] = useState("");
   const [Telephone, setTelephone] = useState("");
   const [TextErrorNom, setTextErrorNom] = useState("");
   const [TextErrorPrenom, setTextErrorPrenom] = useState("");
   const [TextErrorAdresse, setTextErrorAdresse] = useState("");
   const [TextErrorEmail, setTextErroremail] = useState("");
   const [TextErrorEntreprise, setTextErrorEntreprise] = useState("");
   const [TextErrorWebsite, setTextErrorWebsite] = useState("");
   const [TextErrorTelephone, setTextErrorTelephone] = useState("");

    
  


    useEffect(()=>{
        if(Nom.length!=0){
            if(Nom.length<3){ setTextErrorNom("Votre nom est trop court !")}else{if(Nom.length>12){setTextErrorNom("Votre nom est trop long !")}else{setTextErrorNom("")}}}else{setTextErrorNom("")}
    },[Nom]);
    
    useEffect(()=>{
        if(Prenom.length!=0){if(Prenom.length<3){setTextErrorPrenom("Votre prenom est trop court !")}else{if(Prenom.length > 12){setTextErrorPrenom("Votre orenom est trop long !")}else{setTextErrorPrenom("")}}}else{setTextErrorPrenom("")}
    },[Prenom]);

    useEffect(()=>{
        if(Email.length!=0){
            if(!EmailValidator.validate(Email)){setTextErroremail("l'Email ne peut pas être validé")}else{setTextErroremail("")}
        }else{
            setTextErroremail("")
        }
    },[Email]);

    return(
    
        <div style={props.opacityProfil ? enable : disable}>
                <p style={pstyle}>Vos Coordonnées :</p>
                <div style ={formulaire}>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Nom:</label>
                        <input style={inputStyle} name="Nom" type="text" value={Nom} onChange={(e) => setNom(e.target.value)}/>
                        <label style={textError}>{TextErrorNom}</label>
                    </div>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Prenom:</label>
                        <input style={inputStyle} name="Prenom" type="text" value={Prenom} onChange={(e) => setPrenom(e.target.value)}/>
                        <label style={textError}>{TextErrorPrenom}</label>
                    </div>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Adresse:</label>
                        <input style={inputStyle} name="Adresse" type="text" value={Adresse} onChange={(e) => setAdresse(e.target.value)}/>
                        <label style={textError}>{TextErrorAdresse}</label>
                    </div> 
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Adresse e-mail:</label>
                        <input style={inputStyle} name="Email" type="text" value={Email} onChange={(e) => setemail(e.target.value)}/>
                        <label style={textError}>{TextErrorEmail}</label>
                    </div>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Compagnie:</label>
                        <input style={inputStyle} name="Entreprise" type="text" value={Entreprise} onChange={(e) => setEntreprise(e.target.value)}/>
                        <label style={textError}>{TextErrorEntreprise}</label>
                    </div>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Site Web:</label>
                        <input style={inputStyle} name="Website" type="text" value={Website} onChange={(e) => setWebsite(e.target.value)}/>
                        <label style={textError}>{TextErrorWebsite}</label>
                    </div>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Telephone:</label>
                        <input style={inputStyle} name="Telephone" type="text" value={Telephone} onChange={(e) => setTelephone(e.target.Telephone)}/>
                        <label style={textError}>{TextErrorTelephone}</label>
                    </div>
                </div>
                <p style={pstyle}>Vos données personnelles seront traitées de façon strictement confidentielle et ne seront en aucun cas transmises à de tiers personnes physiques ou morales.</p>                
        </div>

    )
}
export default ProfilUsers;


const labelStyle = {
    fontSize:'1.2rem',
    
}

const textError ={

}

const inputStyle ={
    textAlign:'center'
}

const pstyle = {
    color:'black',
    cursor : 'default',
};

const formulaire ={
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '0.2rem',
    textAlign:'center'
};

const baseStyle = {
    height:'2rem',
    margin:'1rem',
    marginBottom:'4rem'
};

const container = {
   
};


const enable = {
    opacity : "1",
    transitionDuration : "0.7s",
    position: 'fixed',
    right: '20rem',
    left: '20rem',
    top: '10rem',
    bottom: '10rem',
    borderRadius: '30px',
    padding: '2rem 3rem',
    boxShadow: '0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)'
};


const disable = {
    position:'fixed',
    top:'-100rem',
    left: '20rem',
    right:'20rem',
    opacity :  "0",
    transitionDuration : "0.7s",
    height : '0'
};

