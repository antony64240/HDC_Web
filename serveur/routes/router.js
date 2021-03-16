const express = require('express');
const router = express.Router()
const FileUser = require('../controlleurs/Files');
const SignUser = require('../controlleurs/Signup');
const AuthUser = require('../controlleurs/Auth');
const TokenManagement = require('../controlleurs/Account');
const { checkToken } = require("../controlleurs/TokenValidation");



//ANONYMOUS ROUTE
router.post('/AddUser', SignUser.createUsers);
router.post('/LoginUser', AuthUser.authentification);


//ADMINROUTE
router.get('/Users', SignUser.getUsers);
router.delete('/DeletUser/:id', SignUser.DeletOneUser);


//USERROUTE
router.get('/Download', FileUser.downloadFiles)
router.post('/ListFichier', checkToken, FileUser.filesList);
router.post('/CheckToken', TokenManagement.checkToken);
router.post('/UploadFile', FileUser.UploadFile);

module.exports = router;