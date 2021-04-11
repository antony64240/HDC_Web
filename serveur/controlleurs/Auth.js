const Users = require('../models/Users');
const bcrypt = require ('bcrypt');
const manageToken = require('../middleware/manageToken');
const preRegisterSchema = require('../models/PreRegister');
const mailSender = require('../services/mailSender');
let uuid = require('uuid');

exports.authentification = async (req, res, next) =>
{
    let Email = req.body.email,
        Password = req.body.password;
    if(!Email) {
        return res.json({response: 'Veuillez entrer votre Email', status: 'error'});
    } else {
        if(!Password) {
            return res.json({response: 'Veuillez entrer un mot de passe', status: 'error'});
        } else {
            preRegisterSchema.findOne({Email: Email}, function(err, searchPreUser) {
                if(err) {
                    return res.json({response: err.message, status: 'error'});
                }else{
                    if (searchPreUser == null){
                        Users.findOne({Email: Email}, function(err, search) {
                            if(err) {
                                return res.json({response: err.message, status: 'error'});
                            } else {
                                if(search != null) {
                                    bcrypt.compare(Password, search.Password, function (err, result) {
                                        if (err) {
                                            return res.status(500).send({
                                                status: 'error',
                                                response: 'Un problème interne est survenue',
                                            });                                   
                                        } else {
                                            if (result === true) { 
                                                const userData = {
                                                    email:search.Email,
                                                    id:search._id,
                                                    firstName:search.FirstName,
                                                    lastname:search.LastName,
                                                    phone: search.phone,
                                                    Areacode: search.Areacode,
                                                    city: search.City,
                                                    compagny : search.Compagny,
                                                    tokenExpiration : Date.now()+900000
                                                }
                                                return res.status(301).json({response: 'Vous êtes maintenant connecté', status: 'success', token: new manageToken().generateEncode(userData) , user: userData});
                                            } else {
                                                return res.json({response: 'Votre mot de passe est incorrect', status: 'error'});
                                            }
                                        }
                                    });

                                } else {
                                    return res.json({response: 'Votre identifiant est incorrect', status: 'error'});
                                }
                            }
                        });
                    }else{
                        return res.status(300).json({response: 'Cette adresse email est en attente de validation', status: 'error'});
                    }
                }
            });
        }
    }
}


exports.forgotPassword = async (req, res, next) =>
{
    let Email = req.body.email;
    preRegisterSchema.findOne({Email: Email}, function(err, searchPreUser) {
        if(searchPreUser!=null){
            return res.status(401).json({response: 'Cette adresse email est en attente de validation', status: 'error'});       
        }else{
            Users.findOne({Email: Email}, function(err, search) {
                if(search!=null){
                    search.Token = uuid.v4();
                    Users.updateOne({Email:search.Email},search, function(err, created) {
                        if(err) {              
                            return res.status(401).json({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
                        } else {
                            new mailSender().sendPassword(search.Email,search.Token,(success,err)=>{
                                if(err){
                                    return res.status(201).json({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
                                }else{
                                    return res.status(201).json({response: 'Message envoyé.', status: 'success'});
                                }
                            });
                        }
                    });
                }else{
                    return res.status(401).json({response: 'Adresse Email introuvable.', status: 'error'});       
                }
            });
        }
    });
}

