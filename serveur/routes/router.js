const express = require('express');
const router = express.Router()
const FileUser = require('../controlleurs/Files');
const SignUser = require('../controlleurs/Signup');
const AuthUser = require('../controlleurs/Auth');
const Project = require('../controlleurs/Project');
const Todo = require('../controlleurs/todo');

const { checkToken , verifyToken , checkRules } = require("../controlleurs/TokenValidation");



//ANONYMOUS ROUTE
router.post('/', SignUser.createUsers);
router.post('/', AuthUser.authentification);
router.get('//:token', SignUser.verifyEmail);
router.post('/', AuthUser.recoverPassword);
router.get('/', AuthUser.forgotPassword);


//ADMINROUTE
router.get('/', checkRules , SignUser.getUsers);
router.delete('//:id', checkRules , SignUser.DeletOneUser);
router.post('/', checkRules , Project.createDevis);
router.get('/' , checkRules , Project.getAllProjects);
router.get('/' , checkRules , FileUser.filesListAdmin);
router.get('/' , checkRules , FileUser.downloadFilesAdmin);

//USERROUTE
router.get('/',verifyToken);
router.post('/' , checkToken , Todo.addTodo);
router.put('/', checkToken , Todo.updateTodo);
router.delete('/', checkToken , Todo.deletTodo);
router.get('/', checkToken, FileUser.downloadFiles);
router.get('/',checkToken, FileUser.filesList);
router.delete('/',checkToken, FileUser.deletefiles);
router.post('/', FileUser.UploadFile);
router.post('/',checkToken, AuthUser.updateUser);
router.post('/',checkToken, Project.createProject);
router.get('/',checkToken, Project.getProjectbyUsers);
router.get('//:token', Project.getProject );

module.exports = router;
