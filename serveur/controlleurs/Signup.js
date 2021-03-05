
const UserSchema = require('../routes/models/Users');
const EmailValidator =require('email-validator');
const Escape = require('escape-html');


exports.createUsers = (req, res, next) => {
  var username = req.body.username;
      password = req.body.password;
      firstname = req.body.firstname;
      lastname = req.body.lastname;
      email = req.body.email;
      phone = req.body.phone;



  if (!username){
    res.status(301).json({
      message :'Veuillez entrer un nom d\'utilisateur'
      });
  }else{
    if(username.substr(0,1) != '.'){
      if(username.match((/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/))) {
        if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
          if(username.length <= 4) {
            return res.json({response: 'Votre nom d\'utilisateur est trop court', status: '201'});          
          } else {
            if(username.length >= 16){
              return res.json({response : 'Votre nom d\'utilisateur est trop long', status: '201'});
            } else {
              if(!email){
                return res.json({response : 'Veuillez entrer une adresse mail' , status: '201'});
              } else {
                if(!EmailValidator.validate(email)){
                  return res.json({ response : 'Votre adresse mail est incorrect', status: '201'});
                } else {
                  UserSchema.findOne({UserName: Escape(username)}, function(err, searchuser) {
                    if(err) {
                        return res.json({response: 'Un problème interne est survenue', status: 'error'});
                    }  else {
                        if(searchuser == null) {
                          UserSchema.findOne({Email: Escape(email)}, function(err, searchemail) {
                            if(err) {
                                return res.json({response: 'Un problème interne est survenue', status: 'error'});
                            } else {
                              console.log(searchemail);
                                if(searchemail == null) {

                                      var dataUsers =new UserSchema({
                                        UserName: username,
                                        Password: password,
                                        FirstName: firstname,
                                        LastName: lastname,
                                        Email: escape(email),
                                        Phone:  phone
                                      });
                                      console.log(dataUsers.Email);

                                      UserSchema.create(dataUsers, function(err, created) {

                                        if(err) {               
                                            return res.json({response: err.message, status: 'error'});
                                          } else {

                                            var dataUserPublic = {
                                              UserName: username,
                                              Password: password,
                                              FirstName: firstname,
                                              LastName: lastname,
                                              Email: escape(email),
                                              Phone:  phone
                                            }

                                            
                                            return res.json({response: 'Votre compte a bien été créé', user: dataUserPublic});
                                        }
                                        });
                                            
                            
                                } else {
                                  return res.json({response: 'Cette adresse email est déjà utilisé', status: 'error'});
                                }
                            }
                          });
                        } else {
                          return res.json({response: 'Ce nom d\'utilisateur est déjà utilisé', status: 'error'});
                        }
                    }
                  });
                }
              }
            }
          
          }    
        }else{
          return res.json({response: 'Le mot de passe doit au moins 8 caractères, dont une majuscule et un chiffre', status: '201'}); 
        } 
      }else {  
        return res.json({response: 'Les noms d\'utilisateurs ne peuvent contenir que des lettres, des chiffres, des traits de soulignement et des points', status: '201'}); 
      }
    }
  }   
};
  


exports.getUsers = (req, res, next) => {

  UserSchema.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );


 

  
};

exports.DeletOneUser = ('/:id', (req, res, next) => {
  UserSchema.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});