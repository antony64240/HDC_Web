import React, {useState,useEffect} from 'react';
import OngletNouveauProjet from '../../components/Project/Project';
import OngletProfilUsers from '../../components/profilUsers/profilUsers';
import ListFolder from '../../components/Folder/ListFolder'
const User = () => {

   const [isLoadedOngletProject, setisLoadedOngletProject] = useState(false);
   const [isLoadedOngletUser, setisLoadedOngletUser] = useState(true);


   

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

   const HandleChange = (event) => {
      if(event == "Nouveau Projet"){
         setisLoadedOngletUser(false);
         setisLoadedOngletProject(true);
      }
      if(event == "Mon Profils"){
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

  
  
   useEffect(() => {
 
  }, []);


     return (
      <div style={baseStyle}> 
         <div style={barslide}>
            <ul style={{listStyleType: 'none'}}>
               {OngletUsers.map((item, index) => {
                  return (
                        <button style={StyleButton} onClick={()=> HandleChange(item.title)} onMouseEnter={changeBackground} onMouseLeave={changeBackgroundback} >
                        <li key={index} style={Styleli}>
                           {item.title}
                        </li>
                     </button> 
                  )
               })}
            </ul>
         </div>
            <div style={Composent}>
               <OngletProfilUsers opacityProfil={isLoadedOngletUser} />
               <OngletNouveauProjet opacityProject={isLoadedOngletProject} />
            </div>      
            <ListFolder/>
   </div>

    );
  
}

export default User;


   const baseStyle = {
   };

   const StyleButton ={
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
 
