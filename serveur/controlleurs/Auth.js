const Users = require('../routes/models/Users');
const Escape = require('escape-html');
const bcrypt = require ('bcrypt');

exports.authentification = (req, res, next) =>
{
    var Username = req.body.username,
        Password = req.body.password;

    console.log(req.body.Password);

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
                        console.log(search);
                        if(search != null) {
                            bcrypt.compare(Password, search.Password, function (err, result) {

                                if (err) {
                                    return res.status(500).send({
                                        status: 'error',
                                        response: 'Un problème interne est survenue',
                                    });                                   
                                } else {
                                    if (result === true) {                                       
                                        return res.json({response: 'Vous êtes maintenant connecté', status: 'success'});
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
