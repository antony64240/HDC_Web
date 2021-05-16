const ORM = require('../services/ORM')
const manageToken = require('../middleware/manageToken');


authentification = async (req, res) => {
    const { email , password } = req.body;
    try {
        let result = await ORM.authentification(email, password);
        res.status(201).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}


forgotPassword = async (req, res) => {
    const { email } = manageToken.getData(req.headers.token);
    try {
        const result = await ORM.forgetPassword(email)
        res.status(201).json(result)
    }catch (err) {
        res.status(401).json(err)
    }
}




recoverPassword = async (req, res) => {
    const { token , password } = req.body;
    try {
        const result = await ORM.recoverPassword(token , password)
        res.status(201).json(result)
    }catch (err) {
        res.status(401).json(err)
    }
}


updateUser = async (req, res) => {
    try {
        const result  = await ORM.updateUser(req.body.User)
        res.status(201).json(result);
    } catch (err) {
        res.status(401).json(err);
    }
}

module.exports = {
    updateUser,
    recoverPassword,
    forgotPassword,
    authentification
}