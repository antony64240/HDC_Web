const jwt = require("jsonwebtoken");
const manageToken = require('../middleware/manageToken');

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.body.token;
    if (token) {
        let manager = new manageToken();
        if (manager.verifyToken(manager.decryptToken(token))){
                next();
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid Token..."
                });
            }
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  }
};