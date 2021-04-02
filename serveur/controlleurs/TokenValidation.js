const jwt = require("jsonwebtoken");
const manageToken = require('../middleware/manageToken');

module.exports = {
  checkToken: (req, res, next) => {
    let content = JSON.parse(req.headers.content)
    let token = content.token
    if (token) {
        let manager = new manageToken();
        if (manager.verifyToken(manager.decryptToken(token))){
               next()
            } else {
              return res.status(498).json({message: "Token Invalid"})
            }
    } else {
      return res.status(498).json({message: "Access Denied! Unauthorized User"})
    }
  },
  verifyToken: (req, res, next) => {
    let token = req.headers.token;
    if (token) {
        let manager = new manageToken();
        console.log(manager.verifyToken(manager.decryptToken(token)))
        if (manager.verifyToken(manager.decryptToken(token))){
          return res.status(201).json({message: "Token Valid"})
            } else {
              return res.status(498).json({message: "Token Invalid"})
            }
    } else {
      
      return res.status(498).json({message: "Access Denied! Unauthorized User"})
      
    }
  }
}