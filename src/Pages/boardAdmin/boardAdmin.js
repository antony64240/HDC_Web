import React, {useState,useEffect} from 'react';
import {CircularProgress} from '@material-ui/core';
import { CONFIG } from '../../components/enum-list/enum-list'
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconMenu from '../../image/home.png';
import { IMG , HEADER } from './style';
import { Pages } from './adminlist';
import  LANG  from '../../language/Lang';
import UserData from '../../Context/UserData'
import projectData from '../../Context/projectData';
import OngletMyProjet from '../../components/componentPageAdmin/Project';

const AdminBoard = () => {

   const [isLoadedOngletUser, setisLoadedOngletUser] = useState(true);
   const [isLoadedOngletProject, setisLoadedOngletProject] = useState(false);
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
         title: Pages.USERS,
      },
      {
         title: Pages.PROJECT,
      },
      {
         title : Pages.LOGOUT
      }
   ]


   const getPermission = () => {

    fetch(`${CONFIG.URLAPI}CheckToken`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Token: localStorage.getItem('token')
        }
    }).then((result) =>{
       if(result.status !== 210){
                window.location.href = "#/Login";
       }else{
          result.json()
          .then(Response =>{
             if(Response.status === "success"){
                setUser(Response.user);
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
        fetch(`${CONFIG.URLAPI}Users`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token": localStorage.getItem('token')
            },
        })
        .then(res => res.json())
        .then(response => {
            setUser(response.data)
        });         

        fetch(`${CONFIG.URLAPI}getAllProjects`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "token": localStorage.getItem('token')
            },
        })
        .then(res => res.json())
        .then(response => {
            setDataProject(response.project)
        });         
    }
    },[loadPage])


   const HandleChange = (event) => {
      if(event === Pages.USERS){
        setisLoadedOngletProject(false);
        setTimeout(()=>setisLoadedOngletUser(true),500)
      }
      if(event === Pages.LOGOUT){
         localStorage.setItem("token", '');
         window.location.href ='#/Login';
      }
      if(event === Pages.PROJECT){
        setisLoadedOngletUser(false);
         setTimeout(()=>setisLoadedOngletProject(true),500)
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
                     {/* <OngletProfilUsers opacityProfil={isLoadedOngletUser} />
                     <OngletNouveauProjet opacityProject={isLoadedOngletNewProject} setProject={setProject} UpdateProject={UpdateProject} /> */}
                     <OngletMyProjet opacityProject={isLoadedOngletProject} />   
               </UserData.Provider>
            </projectData.Provider>
      </div>   

      );
   }
}


export default AdminBoard;