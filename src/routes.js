import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Service from './Pages/Service/Service';
import Activite from './Pages/SecteurActivite/Activite';
import Accueil from './Pages/Accueil/Accueil';
import User from './Pages/AccountUser/User';
import Connexion from './Pages/connexion/connexion'; 
import VerifyEmail from './Pages/validation/validation'; 
import ForgetPassword from './components/componentsPage/login/forgetpassword'


const Routes = () => (
    
    <div>


        
        <BrowserRouter>
            <Switch>
                <Route path="/User" component={User}/>
                <Route path="/Accueil" component={Accueil}/>
                <Route path="/Service" component={Service}/>
                <Route path="/Activite" component={Activite}/>
                <Route path="/Login" component={Connexion}/>
                <Route path="/VerifyEmail" component={VerifyEmail}/>
            </Switch>
        </BrowserRouter>
        

      
    </div>
);

export default Routes;
