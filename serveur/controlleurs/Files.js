const fs = require('fs');
const multer = require('multer');
const __Config =require('../config.json');
const manageToken = require('../middleware/manageToken');
const FilesManager = require('../services/filesManager');
const url = require("url");


exports.filesList = async (req, res) => {
        const { urlrequest , token } = req.headers;
        const { email } = manageToken.getData(token);
        try{
            let result = await FilesManager.getFilesList(email,urlrequest);
            res.status(201).json({list : result.list, status : result.status});
        }catch(err){
            res.status(401).json({response : err , status : "error"});
        }        
};

exports.filesListAdmin = async (req, res) => {
    const { urlrequest , email} = req.headers;
    try{
        let result = await FilesManager.getFilesList(email,urlrequest);
        res.status(201).json({list : result.list, status : result.status});
    }catch(err){
        res.status(401).json({response : err , status : "error"});
    }        
};



exports.downloadFiles = (req, res) => {
    const { url , name , token } = req.headers;
    const { email } = manageToken.getData(token);
    res.download(`${__Config.Folder.path}${email}/${url}/${name}`);
};

exports.downloadFilesAdmin = (req, res) => {
    const { url , name , email } = req.headers;
    res.download(`${__Config.Folder.path}${email}/${url}/${name}`);
};

exports.deletefiles = (req, res ) => {
    const { url , name , token } = req.headers;
    const { email } = manageToken.getData(token);
    fs.unlink(`${__Config.Folder.path}${email}/${url}/${name}`, (err)=>{
       if(err){
         res.status(201).json({response:"done", status:"success"});
       }else{
         res.status(201).json({response:"done", status:"success"});
       }
    })
};


exports.UploadFile = (req, res) => { 
    const query = url.parse(req.originalUrl, true).query.url;
    const tab = query.split('?');
    const token = getQueryStringValue('token','?'.concat(tab[1]));
    const current = getQueryStringValue('Currenturl','?'.concat(tab[0]));
    if (manageToken.verifyToken(manageToken.decryptToken(token))){
        const { email } = manageToken.getData(token);
        try {
            fs.mkdirSync(`${__Config.Folder.path}${email}/${current}`);
        } catch (err) {
        }
        const storage = multer.diskStorage({
            destination: `${__Config.Folder.path}${email}/${current}`
            ,
            filename: function (req, file, cb) {
                cb(null,file.originalname)
            }
        });
        const upload = multer({storage: storage}).array('file');
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).json({status : "success" , response: "Le dépot à été réalisé."})
        });
    }else{
        return res.status(498).json({message: "Token Invalid"});
    }   
};



const getQueryStringValue =  (key,url) => {  
    return decodeURIComponent(url.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*+\#]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  