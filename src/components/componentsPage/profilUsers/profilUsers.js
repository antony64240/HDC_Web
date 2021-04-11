import React, {useState, useEffect} from 'react';
import EmailValidator from 'email-validator';
import Select from "react-dropdown-select";
import { Hint } from 'react-autocomplete-hint';




const regNumber=/^[0-9]{1,5}$/;
const regAreacode=/^[0-9]{5}$/;
const url="https://geo.api.gouv.fr/communes?codePostal=";




const ProfilUsers = (props) => {
    
   
    
   const [firstname, setFirstname] = useState("");
   const [lastname, setLastname] = useState("");
   const [address, setAddresse] = useState("");
   const [email, setEmail] = useState("");
   const [compagny, setCompagny] = useState("");
   const [areacode, setAreacode] = useState("");
   const [phone, setPhone] = useState("");
   const [city, setCity] = useState("");
   const [cityAreacode,setCityAreacode] = useState([]);
   const [AddressSearch,setAddressSearch] = useState([]);

   const [TextErrorFirstname, setTextErrorFirstname] = useState("");
   const [TextErrorLastname, setTextErrorLastname] = useState("");
//    const [TextErrorAddress, setTextErrorAddress] = useState("");
   const [TextErrorEmail, setTextErrorEmail] = useState("");
   const [TextErrorCompagny, setTextErrorCompagny] = useState("");
   const [TextErrorAreacode, setTextErrorAreacode] = useState("");
   const [TextErrorPhone, setTextErrorPhone] = useState("");
   const [TextErrorCity, setTextErrorCity] = useState("");

    
  


    useEffect(()=>{
        if(firstname.length!==0){if(firstname.length<3){ setTextErrorFirstname("Votre nom est trop court !")}else{if(firstname.length>12){setTextErrorFirstname("Votre nom est trop long !")}else{setTextErrorFirstname("")}}}else{setTextErrorFirstname("")}
    },[firstname]);
    
    useEffect(()=>{
        if(lastname.length!==0){if(lastname.length<3){setTextErrorLastname("Votre prenom est trop court !")}else{if(lastname.length > 12){setTextErrorLastname("Votre orenom est trop long !")}else{setTextErrorLastname("")}}}else{setTextErrorLastname("")}
    },[lastname]);

    useEffect(()=>{
        if(email.length!==0){if(!EmailValidator.validate(email)){setTextErrorEmail("l'Email ne peut pas être validé")}else{setTextErrorEmail("")}}else{setTextErrorEmail("")}
    },[email]);

    useEffect(()=>{
        if(areacode.length===1){if(areacode.match(regNumber)===null){setAreacode(areacode.substr(areacode.length))}}else{if(areacode.match(regNumber)===null){setAreacode(areacode.substr(0,areacode.length-1))}}
        if(areacode.match(regAreacode)){
            fetch(url+areacode,{
                headers: {Accept: 'application/json'}
            })
            .then(res => res.json())
            .then(
                (result) => {
                    var tab = []
                    result.map((item,i) => tab.push(item))
                    setCityAreacode(tab);
                },
                (error) => {
                    console.log('error')
                }
            )
        }
        if(areacode.match(regAreacode) === null){
            setCityAreacode([])
        }
    },[areacode]);
  
    
    useEffect(()=>{
        if(address.length>2){
            fetch("https://api-adresse.data.gouv.fr/search/?type=street&q="+address+"&postcode="+areacode,{
                mode: 'cors',
                headers: {Accept: 'application/json'}
            })
            .then(res => res.json())
            .then(
                (result) => {
                    var tab = []
                    result.features.map((item,i) => tab.push(item.properties.name))
                    console.log(tab)
                    setAddressSearch(tab)
                },
                (error) => {
                    console.log(error)
                }
            )
        }
    },[address]);

    useEffect(()=>{
        console.log(1)
    },[1]);

    return(
    
        <div style={props.opacityProfil ? enable : disable}>
                <p style={pstyle}>Vos Coordonnées :</p>
                <div style ={formulaire}>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Nom:</label>
                        <input style={StyleInput} name="Nom" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                        <label style={textError}>{TextErrorFirstname}</label>
                    </div>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Prenom:</label>
                        <input style={StyleInput} name="Prenom" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                        <label style={textError}>{TextErrorLastname}</label>
                    </div>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Adresse e-mail:</label>
                        <input style={StyleInput} name="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label style={textError}>{TextErrorEmail}</label>
                    </div>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Code postal:</label>
                        <input type="text" id="Cp" style={StyleInput} name="Adresse" value={areacode} onChange={(e) => setAreacode(e.target.value)}>
                        </input>
                        <label style={textError}>{TextErrorAreacode}</label>
                        <a></a>
                    </div> 
                    
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Ville:</label>
                             <Select style={StyleInput} options ={cityAreacode} valueField={"nom"} placeholder={""} labelField={"nom"} onChange={(values) => setCity(values[0].nom)} />
                        <label style={textError}>{TextErrorCity}</label>
                    </div> 
                    <div style ={baseStyle}>
                    <label style={labelStyle}>Adresse:</label>
                    <Hint style={StyleInput} options={AddressSearch} allowTabFill>
                        <input style={StyleInput}
                            value={address}
                            onChange={e => setAddresse(e.target.value)} 
                            />
                    </Hint>
                    </div>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Compagnie:</label>
                        <input style={StyleInput} name="Entreprise" type="text" value={compagny} onChange={(e) => setCompagny(e.target.value)}/>
                        <label style={textError}>{TextErrorCompagny}</label>
                    </div>
                    <div style ={baseStyle}>
                        <label style={labelStyle}>Telephone:</label>
                        <input style={StyleInput} name="Telephone" type="text" value={phone} onChange={(e) => setPhone(e.target.Telephone)}/>
                        <label style={textError}>{TextErrorPhone}</label>
                    </div>
                </div>
                <button style={ValidationStyle}>Valider les modifications</button>
                <p style={pstyle}>Vos données personnelles seront traitées de façon strictement confidentielle et ne seront en aucun cas transmises à de tiers personnes physiques ou morales.</p>                
        </div>

    )
}
export default ProfilUsers;


const styleSELECT= {
    width:'100%',
    
    outline: 'none',
    boxSizing: "border-box",
    boxShadow: "inset 0 1px 2px rgb(10 10 10 / 10%)",
   justifyContent:'center'
}
const StyleInput= {
    width:'100%',
    height: '1.475rem',
    boxShadow: "inset 0 1px 2px rgb(10 10 10 / 10%)",
    border: '1px solid #cacaca',
    fontSize: '1rem',
    color: '#8a8a8a',
    outline:  'none',
    minHeight:'1.475rem'
}

const labelStyle = {
    fontSize:'0.9rem',
}

const textError ={

}

const ValidationStyle={
    marginTop   :'2rem',
    width:'50%',
    textAlign:'center',
    height: '2.4375rem',
}

const inputStyle ={

}

const pstyle = {
    color:'black',
    cursor : 'default',
    marginTop:"4vh"
};

const formulaire ={
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    textAlign:'center',

};

const baseStyle = {
    height:'2rem',
    margin:'1rem',
    marginBottom:'2rem',
    paddingLeft :'4vh',
    paddingRight :'4vh'
};

const enable = {
    opacity : "0.99",
    transitionDuration : "0.7s",
    position: 'fixed',
    right: '20rem',
    left: '20rem',
    top: '10rem',
    bottom: '10rem',
    borderRadius: '30px',
    padding: '2rem 3rem',
    boxShadow: '0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)',
    textAlign:'center'
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

