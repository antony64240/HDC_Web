const express = require('express');
const router = express.Router()
const FileUser = require('../controlleurs/Files');
const SignUser = require('../controlleurs/Signup');
const AuthUser = require('../controlleurs/Auth');
const {checkToken,verifyToken} = require("../controlleurs/TokenValidation");



//ANONYMOUS ROUTE
router.post('/AddUser', SignUser.createUsers);
router.post('/LoginUser', AuthUser.authentification);
router.get('/verifyEmail/:token', SignUser.verifyEmail);
router.post('/ForgotPassword', AuthUser.forgotPassword);
router.get('/ForgotPassword/:token', AuthUser.forgotPassword);


//ADMINROUTE
router.get('/Users', SignUser.getUsers);
router.delete('/DeletUser/:id', SignUser.DeletOneUser);


//USERROUTE
router.get('/Download', checkToken, FileUser.downloadFiles)
router.get('/ListFichier',checkToken, FileUser.filesList);
router.get('/CheckToken',verifyToken);
router.post('/UploadFile', checkToken, FileUser.UploadFile);

module.exports = router;