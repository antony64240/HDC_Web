import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Myfooter from './components/Footer/footer';


import Service from './components/Pages/Service/Service';
import Login from './components/Pages/Login/Login';
import Signup from './components/Pages/Signup/Signup';
import Realisation from './components/Pages/Realisation/Realisation';
import SecteurActivite from './components/Pages/SecteurActivite/SecteurActivite';
import Accueil from './components/Pages/Accueil/Accueil';
import infoLegal from './components/Pages/InfoLegal/infoLegal';
import RandomRoute from './components/RandomRoute/RandomRoute';


const Routes = () => (
  <div >
    
  <Navbar />


  <BrowserRouter >
      <Switch>   
          <Route path="/Accueil" component={Accueil}/>
          <Route path="/Service" component={Service}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Signup" component={Signup}/>
          <Route path="/SecteurActivite" component={SecteurActivite}/>      
          <Route path="/Realisation" component={Realisation}/>
          <Route path="/infoLegal" component={infoLegal}/>
      </Switch>
  </BrowserRouter>

  <Myfooter />
</div>
);

export default Routes;