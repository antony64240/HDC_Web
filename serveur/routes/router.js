const express = require('express');
const router = express.Router()
const FileUser = require('../controlleurs/Files');
const SignUser = require('../controlleurs/Signup');
const AuthUser = require('../controlleurs/Auth');
const Project = require('../controlleurs/Project');
const Todo = require('../controlleurs/todo');

const { checkToken , verifyToken , checkRules } = require("../controlleurs/TokenValidation");



//ANONYMOUS ROUTE
router.post('/AddUser', SignUser.createUsers);
router.post('/LoginUser', AuthUser.authentification);
router.get('/verifyEmail/:token', SignUser.verifyEmail);
router.post('/ForgotPassword', AuthUser.recoverPassword);
router.get('/ForgotPassword', AuthUser.forgotPassword);


//ADMINROUTE
router.get('/Users', checkRules , SignUser.getUsers);
router.delete('/DeletUser/:id', checkRules , SignUser.DeletOneUser);
router.post('/createpdf', checkRules , Project.createDevis);
router.get('/getAllProjects' , checkRules , Project.getAllProjects);
router.get('/filesListAdmin' , checkRules , FileUser.filesListAdmin);
router.get('/downloadAdmin' , checkRules , FileUser.downloadFilesAdmin);

//USERROUTE
router.get('/CheckToken',verifyToken);
router.post('/Todo' , checkToken , Todo.addTodo);
router.put('/Todo', checkToken , Todo.updateTodo);
router.delete('/Todo', checkToken , Todo.deletTodo);
router.get('/Download', checkToken, FileUser.downloadFiles);
router.get('/ListFichier',checkToken, FileUser.filesList);
router.delete('/ListFichier',checkToken, FileUser.deletefiles);
router.post('/UploadFile', FileUser.UploadFile);
router.post('/UpdateUser',checkToken, AuthUser.updateUser);
router.post('/newProject',checkToken, Project.createProject);
router.get('/getProject',checkToken, Project.getProjectbyUsers);
router.get('/Project/:token', Project.getProject );

module.exports = router;