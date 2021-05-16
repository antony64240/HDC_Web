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
import UserData from '../../Context/UserData'
import projectData from '../../Context/projectData';

const User = () => {

   const [isLoadedOngletNewProject, setisLoadedOngletNewProject] = useState(false);
   const [isLoadedOngletUser, setisLoadedOngletUser] = useState(true);
   const [isLoadedOngletMyProject, setisLoadedOngletMyProject] = useState(false);
   const [loadPage, SetloadPage] = useState(false); 
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [User, setUser] = useState({});
   const [dataProject, setDataProject] = useState([]);
   const [UpdateProject, setProject] = useState(true);

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


   const getPermission = () => {
      fetch(`${CONFIG.URLAPI}CheckToken`, {
          method: "GET",
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              Token: localStorage.getItem('token')
          }
      }).then((result) =>{
         if(result.status === 210){
                  window.location.href = "#/Adminboard";
         }else{
            result.json()
            .then(data =>{
               if(data.status === "success"){
                  setUser(data.user);
                  SetloadPage(true);
                }else{
                  window.location.href = "#/Login";
               }
            })
         }
         })
  };

   useEffect(() => {
      getPermission();
   },[1]);


   
   useEffect(()=>{
      if(loadPage){
         fetch(`${CONFIG.URLAPI}getProject`,
         {
             method: "GET",
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
                 "token": localStorage.getItem('token')
             },
         })
         .then(res => res.json())
         .then(response => {
             setDataProject(response.project.Project)
         });         
      }
   },[UpdateProject,loadPage])

   const HandleChange = (event) => {
      if(event === Pages.NEWPROJECT){
         setisLoadedOngletUser(false);
         setisLoadedOngletMyProject(false);
         setTimeout(()=>setisLoadedOngletNewProject(true),500)
      }
      if(event === Pages.PROFILS){
         setisLoadedOngletNewProject(false);
         setisLoadedOngletMyProject(false);
         setTimeout(()=>setisLoadedOngletUser(true),500)
      }
      if(event === Pages.LOGOUT){
         localStorage.setItem("token", '');
         window.location.href ='#/Login';
      }
      if(event === Pages.PROJECT){
         setisLoadedOngletNewProject(false);
         setisLoadedOngletUser(false);
         setTimeout(()=>setisLoadedOngletMyProject(true),500)
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
            <projectData.Provider value={{dataProject : dataProject, setDataProject : setDataProject}}>
               <UserData.Provider value={{User:User, setUser:setUser}}>
                     <OngletProfilUsers opacityProfil={isLoadedOngletUser} />
                     <OngletNouveauProjet opacityProject={isLoadedOngletNewProject} setProject={setProject} UpdateProject={UpdateProject} />
                     <OngletMyProjet opacityProject={isLoadedOngletMyProject} />     
               </UserData.Provider>
            </projectData.Provider>
      </div>   

      );
   }
}


export default User;


 
