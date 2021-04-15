
const UserSchema = require('../models/Users');
const EmailValidator =require('email-validator');
const preRegisterSchema = require('../models/PreRegister');
const Escape = require('escape-html');
let uuid = require('uuid');
const  fs  = require('fs');
const __Config =require('../config.json');


exports.createUsers = (req, res, next) => {
  let password = req.body.password;
      email = req.body.email;      
            if(!email){
                return res.json({response : 'Veuillez entrer une adresse mail' , status: '201'});
              } else {
                if(!EmailValidator.validate(email)){
                  return res.json({ response : 'Votre adresse mail est incorrect', status: '201'});
                } else {
                  if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
                    preRegisterSchema.findOne({Email:Escape(email)}, (err,search) => {
                      if(search==null){
                          UserSchema.findOne({Email: Escape(email)}, function(err, searchemail) {
                            if(err) {
                                return res.json({response: 'Un problème interne est survenue', status: 'error'});
                            } else {
                                if(searchemail == null) {
                                  let dataUsers = new preRegisterSchema({     
                                        Password: password,
                                        Email: escape(email),
                                        Token : uuid.v4()
                                      });
                                      preRegisterSchema.create(dataUsers, function(err, created) {
                                          if(err) {              
                                            return res.json({response: err.message, status: 'error'});
                                          } else {
                                            let dataUserPublic = {
                                              Password: password,
                                              Email: escape(email)
                                            }
                                            return res.json({response: 'Votre compte a bien été créé', user: dataUserPublic, status:'success'});
                                        }
                                        });
                                } else {
                                  return res.json({response: 'Cette adresse email est déjà utilisé', status: 'error'});
                                }
                              }
                            });
                          }else{
                            return res.json({response: 'Cette adresse email est en attente de validation', status: 'error'});
                          }
                        });
                }else{
                  return res.json({response: 'Le mot de passe doit au moins 8 caractères, dont une majuscule et un chiffre', status: '201'}); 
                }  
              }
            }
              
};


exports.verifyEmail = async (req,res,next) => {
  let token = req.params.token
  console.log(token)
  preRegisterSchema.findOne({Token:token}, function(err,search) {
    if (search != null){
      let dataUsers = new UserSchema({     
        Password: search.Password,
        Email: search.Email
      });
      UserSchema.create(dataUsers, function(err, created) {
        if(err){
          return res.status(200).json({response: 'Erreur lors de la validation de l\'email.', status:'error'});
        }else{
          preRegisterSchema.deleteOne({email:search.email}, function(err,deleted){
            if(err){
              return res.json({response: 'Error server', status:'error'});
            }else{
              fs.mkdir(`${__Config.Folder.path}${search.Email}`,function(e){
                console.log(e)
                if(e){
                  return res.json({response: 'Erreur lors de la création du fichier, contacter le support.', status:'Error'});
                } else {
                  return res.json({response: 'Votre compte a bien été validé', status:'success'});
                }
                });
            }
          })          
        }
      })
    }else{
      return res.json({response: 'Token déjà validé', status:'error'});
    }
  });
}


exports.getUsers = (req, res, next) => {
  req.headers.email
  UserSchema.findOne({email: mail}).then(
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