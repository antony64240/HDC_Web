import React, {useState, useEffect} from "react";
import { CONFIG }  from '../../components/enum-list/enum-list';
import gifImg from '../../image/checkmark.gif';
import styled from 'styled-components';
const IMG = styled.img`

`;

const DIV = styled.div`
margin-top:10%;
text-align: center;
font-size:20px;
width:100%;
`;


const VerifyEmail = () => {
    const [message, setMessage] = useState(Boolean);
    

    const requestValidation = () =>{
      
        const token = getQueryStringValue("token");
        fetch(`${CONFIG.URLAPI}verifyEmail/${token}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then((result) => {
             if (result['status'] === "success"){
                setMessage(<IMG src={gifImg}></IMG>);
                setTimeout(()=>{ setMessage(result.response);},1600);
                setTimeout(()=>{ window.location.href ='#/Login'; },3000);
               
            }else{
                setMessage(result.response);
                setTimeout(()=>{ window.location.href ='#/Login'; },3000);
            } 
        })
    }

    const getQueryStringValue =  (key) => {  
        return decodeURIComponent(window.location.hash.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*+\#]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    }  

    useEffect(()=>{
        requestValidation();
    },[1])

        return(
            <DIV>
                {message}
            </DIV>
        )
    
}

export default VerifyEmail