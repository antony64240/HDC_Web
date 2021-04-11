import React, {useState,useEffect} from 'react';
import OngletNouveauProjet from '../../components/componentsPage/Project/Project';
import OngletProfilUsers from '../../components/componentsPage/profilUsers/profilUsers';
import ListFolder from '../../components/componentsPage/Folder/ListFolder'
import {CircularProgress} from '@material-ui/core';
const User = () => {

   const [isLoadedOngletProject, setisLoadedOngletProject] = useState(false);
   const [isLoadedOngletUser, setisLoadedOngletUser] = useState(true);
   const [loadPage, SetloadPage] = useState(false); 

   

   const OngletUsers = [
      {
         title: 'Nouveau Projet',
      },
      {
         title: 'Mon Profils',
      },
      {
         title : 'Mes Documents'
      }
   ]

   const SendReq = () => {
      fetch("http://localhost:3001/api/CheckToken", {
          method: "GET",
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              Token: localStorage.getItem('token')
          }
      }).then((result) => {
            if(result.status!==201){
               window.location.href ='/Login';
            }else{
               if(result.status===201){
                  SetloadPage(true)
               }
            }
           
         }
      );
  };

   useEffect(() => {
      SendReq()
   },[1]);

   const HandleChange = (event) => {
      if(event === "Nouveau Projet"){
         setisLoadedOngletUser(false);
         setisLoadedOngletProject(true);
      }
      if(event === "Mon Profils"){
         setisLoadedOngletUser(true);
         setisLoadedOngletProject(false);
      }
   }
   
   function changeBackground(e) {
      e.target.style.background = 'gray';
    }
    function changeBackgroundback(e) {
      e.target.style.background = 'rgb(239, 239, 239)';
    }

  
    
    if(!loadPage){
      return (<div style={{textAlign:'center', marginTop:'15%'}}><CircularProgress /></div>)
    }else{
      return (
         <div style={baseStyle}> 
            <div style={barslide}>
               <ul style={{listStyleType: 'none'}}>
                  {OngletUsers.map((item, index) => {
                     return (
                        <div key={index}>
                           <button style={StyleButton} onClick={()=> HandleChange(item.title)} onMouseEnter={changeBackground} onMouseLeave={changeBackgroundback} >
                           <li  style={Styleli}>
                              {item.title}
                           </li>
                        </button> 
                        </div>
                     )
                  })}
               </ul>
            </div>
               <div style={Composent}>
                  <OngletProfilUsers opacityProfil={isLoadedOngletUser}  />
                  <OngletNouveauProjet opacityProject={isLoadedOngletProject} />
               </div>      
               <ListFolder/>
      </div>

      );
   }
}

export default User;


   const baseStyle = {
   };

   const StyleButton ={
    outline:  'none',
    width:'17rem',
    height:'3rem',
    margin:'1rem',
   background:'-internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59))'
   }

   const Styleli ={
    margin: '10px',
    padding: '0rem 5rem',
    display: 'contents'
   }

  const Composent = {
     displayContent:'center',
     width:'70rem'
   };   

   const barslide = {
      position:'fixed',
      border: '0px',
      width: '17rem',
      bottom : '10rem',
      top:'10rem'
    };   
 
