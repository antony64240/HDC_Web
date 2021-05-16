const manageToken = require('../middleware/manageToken');
const roles = require('../models/roles');

module.exports = {
  checkToken: async (req, res, next) => {
    const { token } = req.headers;
    if (token) {
        if (manageToken.verifyToken(manageToken.decryptToken(token))){
               next()
            } else {
              return res.status(498).json({message: "Token Invalid"})
            }
    } else {
      return res.status(498).json({message: "Access Denied! Unauthorized User"})
    }
  },

  verifyToken: async (req, res) => {
    const { token } = req.headers;
    if (token) {
        if (manageToken.verifyToken(manageToken.decryptToken(token))){
          const data = manageToken.getData(token);
          if(data.role === roles.ADMIN || data.role === roles.SUPERADMIN){
            return res.status(210).json({message: "Token Valid", user: data , status : "success"})
          }else{
            return res.status(201).json({message: "Token Valid", user: data , status : "success"})
          }
            } else {
              return res.status(498).json({message: "Token Invalid"})
            }
    } else {
      return res.status(498).json({message: "Access Denied! Unauthorized User"})
    }
  },

  checkRules: async (req, res , next) => {
    const { token } = req.headers;
    if (token) {
        if (manageToken.verifyToken(manageToken.decryptToken(token))){
          const data = manageToken.getData(token);
          if(data.role === roles.ADMIN || data.role === roles.SUPERADMIN){
            next()
          }else{
            return res.status(201).json({message: "Access Denied! Unauthorized User" , status : "error"})
          }
            } else {
              return res.status(498).json({message: "Token Invalid"})
            }
    } else {
      return res.status(498).json({message: "Access Denied! Unauthorized User"})
    }
  }
}