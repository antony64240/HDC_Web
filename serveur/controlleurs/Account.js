const manageToken = require('../middleware/manageToken');

exports.checkToken = async (req, res, next) => {
    var token = req.body.token;
    const ManagerToker = new manageToken();
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
