import React, {useState,useEffect} from 'react';
import OngletNouveauProjet from '../../components/componentsPage/newProject/Project';
import OngletProfilUsers from '../../components/componentsPage/profilUsers/profilUsers';
import OngletMyProjet from '../../components/componentsPage/Project/Project';
import ListFolder from '../../components/componentsPage/Folder/ListFolder';
import {CircularProgress} from '@material-ui/core';
import { CONFIG } from '../../components/enum-list/enum-list'
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconMenu from '../../image/home.png';
import { IMG , HEADER } from './style';
import { Pages } from './enum';
import  LANG  from '../../language/Lang';


const User = () => {

   const [isLoadedOngletNewProject, setisLoadedOngletNewProject] = useState(false);
   const [isLoadedOngletUser, setisLoadedOngletUser] = useState(true);
   const [isLoadedOngletMyProject, setisLoadedOngletMyProject] = useState(false);
   const [loadPage, SetloadPage] = useState(false); 
   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
   const handleClose = () => {
     setAnchorEl(null);
   };
   

   const OngletUsers = [
      {
         title: Pages.NEWPROJECT,
      },
      {
         title: Pages.PROJECT,
      },
      {
         title : Pages.PROFILS
      },
      {
         title : Pages.LOGOUT
      }
   ]

   const SendReq = () => {

      if( localStorage.getItem("User") !== null && localStorage.getItem("User") !== '' ){
         let User = JSON.parse(localStorage.getItem("User"));
      fetch(`${CONFIG.URLAPI}CheckToken`, {
          method: "GET",
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              Token: localStorage.getItem('token')
          }
      }).then((result) => {
         console.log(result.status)
            if(result.status!==201){
               window.location.href ='#/Login';
            }else{
               if(result.status===201){
                  SetloadPage(true)
               }
            }
           
         }
      );
      }else{
         window.location.href ='#/Login';
      }
  };

   useEffect(() => {
      SendReq()
   },[1]);

   const HandleChange = (event) => {
      if(event === Pages.NEWPROJECT){
         setisLoadedOngletUser(false);
         setisLoadedOngletMyProject(false);
         setTimeout(()=>setisLoadedOngletNewProject(true),1000)
      }
      if(event === Pages.PROFILS){
         setisLoadedOngletNewProject(false);
         setisLoadedOngletMyProject(false);
         setTimeout(()=>setisLoadedOngletUser(true),1000)
      }
      if(event === Pages.LOGOUT){
         localStorage.setItem("User", '');
         localStorage.setItem("token", '');
         window.location.href ='#/Login';
      }
      if(event === Pages.PROJECT){
         setisLoadedOngletNewProject(false);
         setisLoadedOngletUser(false);
         setTimeout(()=>setisLoadedOngletMyProject(true),1000)
      }
      handleClose()
   }

    
    if(!loadPage){
      return (<div style={{textAlign:'center', marginTop:'15%'}}><CircularProgress /></div>)
    }else{
      return (
         <div > 
            <HEADER>
             <LANG/>
             <IMG src={IconMenu} onClick={handleClick}/>
               <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                        {OngletUsers.map((item , keys) => {
                           return (
                        <MenuItem key={keys} onClick={() => HandleChange(item.title)}>{item.title}</MenuItem>
                        )
                  })}
               </Menu>
            </HEADER>
                  <OngletProfilUsers opacityProfil={isLoadedOngletUser}  />
                  <OngletNouveauProjet opacityProject={isLoadedOngletNewProject} />
                  <OngletMyProjet opacityProject={isLoadedOngletMyProject} />     
      </div>

      );
   }
}

export default User;


 
