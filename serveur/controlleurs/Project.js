const ProjectShema = require('../models/projet');
const mailSender = require('../services/mailSender');
const { jsPDF } = require('jspdf');
var encoding = require('encoding');
const fs = require('fs'); 
const img  = require('../models/image');
const __config = require('../config.json');
const manageToken = require('../middleware/manageToken');
const projectManager = require('../services/projectManager');

exports.createProject = async (req, res) =>
{
    const { email } = manageToken.getData(req.headers.token);
    const  project  = req.body;
    try{
        const result = await projectManager.createproject(email, project);
        res.status(201).json(result);
    }
    catch(err){
        res.status(500).json(err);
    } 
}

exports.getProjectbyUsers = async (req, res) =>
{
    const { email } = manageToken.getData(req.headers.token);
    try{
        const result = await projectManager.getprojectbyUser(email);
        res.status(201).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}


exports.getProject = async (req, res, next) =>
{   
    const { token } = req.params;
    try{
        const result = await projectManager.getproject(token);
        res.status(201).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}


exports.getAllProjects = async (req, res, next) =>
{   
    try{
        const result = await projectManager.getAllProjects();
        res.status(201).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}


exports.createDevis = async (req, res, next) =>
{     
    const { project , user , data } = req.body;

    ProjectShema.findById(project._id,(err, search)=>{
        search.Devis = true;
        search.Valider = true
        if(err){
            return res.status(401).json({response: 'Projet introuvable.', status: 'error'});
        }else{
            const doc = new jsPDF({
                unit: "pt",
                orientation: "p",
                lineHeight: 1.2
            });
            doc.setFontSize(12);
            doc.addImage(img , 'png', 0, 0, 650, 900);
            doc.text(`MEZZASALMA Christian`, 120, 70);
            doc.text(`Aix en Provence`, 140, 90);
            doc.text(`${new Date().getUTCDate()}`, 110, 197);
            doc.text(`${new Date().getMonth()+1}`, 130, 197);
            doc.text(`${new Date().getUTCFullYear()}`, 142, 197);
            doc.text(`${user.FirstName} ${user.LastName}`, 400, 70)
            doc.setFontSize(8);
            data.forEach((elem , index) => {
                if(elem.price!=undefined && elem.heure !=undefined){
                    if(elem.description.length < 36){
                        doc.text(`-${elem.description}`, 70, 260+(25*index));
                    }else{
                        doc.text(`-${elem.description.substring(0, 55)}`, 70, 255+(25*index));
                        doc.text(`${elem.description.substring(55, 105)}`, 70, 263+(25*index));
                        doc.text(`${elem.description.substring(105, 150)}`, 70, 271+(25*index));
                    }
                    doc.text(`${elem.heure}h`, 300, 260+(25*index))
                    doc.text(`${elem.price}€/h`, 390, 260+(25*index))
                    doc.text(`${Math.floor(elem.heure*elem.price)}€`, 475, 260+(25*index))
                }
            });
            const dataImg = doc.output()
            const buffer = encoding.convert(dataImg, "Latin_1") 
            fs.writeFileSync(`${__config.Folder.path}${user.Email}/devis/${project._id}.pdf`, buffer, 'binary');
            ProjectShema.updateOne({_id:project._id}, search, (err, success)=>{
                if(err){
                    return res.status(401).json({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});     
                }else{
                    new mailSender().sendMailestimate(project.Author, project, (err,succes) =>{
                        if(err === null){
                            return res.status(401).json({response: 'Erreur Interne, désolé du désagrément.', status: 'error'});     
                        }else{
                            return res.status(401).json({response: 'Done.', status: 'success'});     
                        }
                    })
                }
            })
    
        }
    })  
    
}