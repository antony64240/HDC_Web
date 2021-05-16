
const UserSchema = require('../models/Users');
const preRegisterSchema = require('../models/PreRegister');
const manageToken = require('../middleware/manageToken');
const  fs  = require('fs');
const __Config =require('../config.json');
const ORM = require('../services/ORM');
const roles = require('../models/roles');

exports.createUsers = async (req, res) => {
  const { password , email } = req.body;
  try{
      const result = await ORM.createUser(password, email);
      res.status(200).json(result)
  }catch(err){
      res.status(200).json(err)
  }
};


exports.verifyEmail = async (req,res) => {
  const { token } = req.params;
  preRegisterSchema.findOne({Token:token}, function(err,search) {
    if (search != null){
      let dataUsers = new UserSchema({     
        Password: search.Password,
        Email: search.Email,
        Role: roles.USER
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
                if(err){
                } else {
                  fs.mkdir(`${__Config.Folder.path}${search.Email}/devis`,(e)=>{
                    if(err){
                      return res.json({response: 'Erreur lors de la création du fichier, contacter le support.', status:'Error'});
                    }else{
                      fs.mkdir(`${__Config.Folder.path}${search.Email}/facturation`,(e)=>{
                        if(err){
                          return res.json({response: 'Erreur lors de la création du fichier, contacter le support.', status:'Error'});
                        }else{
                         return res.json({response: 'Votre compte a bien été validé', status:'success'});
                        }
                      })
                    }
                  })
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


exports.getUsers = async (req, res) => {
  try{
    const result = await ORM.getUsers();
    res.status(201).json({data : result});
  }catch(err){
    res.status(501).json(err);
  }
};

exports.DeletOneUser = ('/:id', (req, res) => {
  const { id } = req.params;
  UserSchema.deleteOne({_id: id}).then(
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