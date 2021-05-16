const uuid = require('uuid');
const mailSender = require('./mailSender');
const ProjectShema = require('../models/projet');
const Users = require('../models/Users');
const TodoShema = require('../models/todo');


async function createproject(email, project){
    return new Promise((acc,rej)=>{
        let dataProject = new ProjectShema({   
            Author : email,
            Description: project.descriptif,
            Date : project.datecreation,
            DateExp : project.datefin,
            Valider : false,
            Devis : false,
            Token : uuid.v4()
          });
        ProjectShema.create(dataProject, function(err, search) {
            if(search!=null){
                Users.findOneAndUpdate({Email:email},{$push:{Project : search._id}}, function(err, update) {
                    if(err) {            
                        rej({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
                    } else {
                        new mailSender().sendProject(email,search,(success, err)=>{
                            if(err){
                                rej({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
                            }else{
                                acc({response: 'Done.', status: 'success'});
                            }
                        })
                    }
                });
            }else{
                rej({response: 'Erreur Interne.', status: 'error'});       
            }
        });
    })
}


async function getprojectbyUser(email){
    return new Promise((acc,rej)=>{
        Users.findOne({ Email : email })
        .populate({
            path:'Project',
            model:'Project',
            populate : {
                path:'Todo',
                model:'Todo'
            }
        })
            .exec(function (err, story) {
                if (err){
                    rej(err);
                } else {
                    acc({response: 'Done.', status: 'success', project: story});
                } 
        });
    })
}

async function getAllProjects(){
    return new Promise((acc,rej)=>{
        ProjectShema.find()
        .populate({
            path:'Todo',
            model:'Todo',
            }
        )
            .exec(function (err, story) {
                if (err){
                    rej(err);
                } else {
                    acc({response: 'Done.', status: 'success', project: story});
                } 
        });
    })
}

async function addTodo(email, projectID, Todo){
    return new Promise((acc, rej) =>{
        let dataTodo = new TodoShema({
            _id : Todo._id,
            Author : email,
            Description : Todo.Description,
            Duree : Todo.Duree,
            Date : Todo.Date,
            State : Todo.State

        })
        TodoShema.create(dataTodo , function (err, search){
            if(err){
                rej({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
            } else {
                ProjectShema.findOneAndUpdate({_id : projectID }, { $push:{ Todo : search._id }}, function(err , update){
                    if(err){
                        rej({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
                    }else{
                        acc({response: 'Done.', status: 'success' , data : search});
                    }
                })
            }
        })
    });
}


async function updateTodo(Todo , id){   
    return new Promise((acc, rej) =>{
        TodoShema.findById( id , function( err, search){
            if(err){
                rej({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
            }else{
                let dataTodo = new TodoShema({
                    _id : search._id,
                    Author : search.Author,
                    Description : Todo.Description,
                    Duree : Todo.Duree,
                    Date : search.Date,
                    State : search.State
                })
                TodoShema.findOneAndUpdate({_id : search._id}, dataTodo, {upsert: true , new: true}, function(err, update){
                    if(err){
                        rej({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
                    }else{
                            if(err){
                                rej({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
                            }else{

                                acc({response: 'Done.', status: 'success' , update : update});
                            }                        
                    }
                })
            }
        })
    });
}


async function deletTodo(id){
    return new Promise((acc, rej) =>{
        TodoShema.deleteOne({ _id : id }, function( err, search){
            if(err){
                rej({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
            }else{
                acc({response: 'Done.', status: 'success' });
            }
        })
    });
}


async function getproject(token){
    return new Promise((acc,rej)=>{
        ProjectShema.findOne({ Token : token}, (err, search) => {
            if(err){
                rej({response: 'Projet introuvable.', status: 'error'});       
            }else{
                Users.findOne({Email: search.Author}, function(err, user) {
                    if(err) {              
                        rej({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});
                    } else {
                        acc({response: 'Done.', status: 'success', project: search , user : user });
                    }
                })
            }
        })
    })
}


module.exports={
    createproject,
    getprojectbyUser,
    getproject,
    addTodo,
    updateTodo,
    deletTodo,
    getAllProjects
}