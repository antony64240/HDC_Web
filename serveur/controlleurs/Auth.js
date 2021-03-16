const Users = require('../routes/models/Users');
const Escape = require('escape-html');
const bcrypt = require ('bcrypt');
const manageToken = require('../middleware/manageToken');

exports.authentification = (req, res, next) =>
{
    var Username = req.body.username,
        Password = req.body.password;


        if(!Username) {
            return res.json({response: 'Veuillez entrer votre identifiant', status: 'error'});
        } else {
            if(!Password) {
                return res.json({response: 'Veuillez entrer un mot de passe', status: 'error'});
            } else {
                Users.findOne({UserName: Escape(Username)}, function(err, search) {
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
                                            username:search.UserName,
                                            email:search.Email,
                                            phone:search.Phone,
                                            id:search._id,
                                            firstName:search.FirstName,
                                            lastname:search.LastName,
                                            exp :   Date.now()+900000
                                        }
                                        return res.status(301).json({response: 'Vous êtes maintenant connecté', status: 'success', token: new manageToken().generateEncode(userData)});
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
            }
        }
}
