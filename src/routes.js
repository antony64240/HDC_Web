import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Myfooter from './components/Footer/footer';


import Service from './Pages/Service/Service';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Realisation from './Pages/Realisation/Realisation';
import SecteurActivite from './Pages/SecteurActivite/SecteurActivite';
import Accueil from './Pages/Accueil/Accueil';
import infoLegal from './Pages/InfoLegal/infoLegal';
import User from './Pages/AccountUser/User';
import ProfilUsers from './components/profilUsers/profilUsers';


const Routes = () => (
    
    <div>

        <Navbar/>


        <BrowserRouter>
            <Switch>

                <Route path="/User" component={User}/>
                <Route path="/Accueil" component={Accueil}/>
                <Route path="/Service" component={Service}/>
                <Route path="/Login" component={Login}/>
                <Route path="/Signup" component={Signup}/>
                <Route path="/SecteurActivite" component={SecteurActivite}/>      
                <Route path="/Realisation" component={Realisation}/>
                <Route path="/infoLegal" component={infoLegal}/>
                <Route path="/ProfilUsers" component={ProfilUsers}/>

            </Switch>
        </BrowserRouter>

        <Myfooter/>
    </div>
);

export default Routes;
