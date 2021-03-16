const manageToken = require('../middleware/manageToken');




const testFolder = 'C:/Users/anton/eclipse-workspace/FichierClient';

exports.checkToken = (req, res, next) => {
    var token = req.body.token;
    const ManagerToker = new manageToken();
    console.log(ManagerToker.verifyToken(ManagerToker.decryptToken(token)));
    if(ManagerToker.verifyToken(ManagerToker.decryptToken(token))){
        res.status(301).json({
            message: "Token valid"
          });
    }else{
        res.status(401).json({
            message: "Token expired"
          });
    }   
};
