import {HashRouter, Route, Switch} from 'react-router-dom';
import Service from './Pages/Service/Service';
import Activite from './Pages/SecteurActivite/Activite';
import Accueil from './Pages/Accueil/Accueil';
import User from './Pages/AccountUser/User';
import Connexion from './Pages/connexion/connexion'; 
import VerifyEmail from './Pages/validation/validation'; 
import VerifyProject from './Pages/validation/validationproject'; 
import RecoveryPassword from './Pages/validation/passRecovery';
import AdminBoard from './Pages/boardAdmin/boardAdmin';


const Routes = () => (
          
        <HashRouter>
            <Switch>
                <Route path="/User" component={User}/>
                <Route exact path="/"  component={Accueil}/>
                <Route path="/Service" component={Service}/>
                <Route path="/SecteurActivite" component={Activite}/>
                <Route path="/Login" component={Connexion}/>
                <Route path="/VerifyEmail" component={VerifyEmail}/>
                <Route path='/valideProject' component={VerifyProject}/>
                <Route path='/recovery' component={RecoveryPassword}/>
                <Route path='/Adminboard' component={AdminBoard}/>
            </Switch>
        </HashRouter>

);

export default Routes;
