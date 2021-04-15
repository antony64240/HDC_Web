const fs = require('fs');
const File = require('../models/Files');
const multer = require('multer');
var path = require('path');
const __Config =require('../config.json');
const url = require("url");
const manageToken = require('../middleware/manageToken');

exports.filesList = async (req, res, next) => {
        let arrayList = [];
        let dir = `${__Config.Folder.path}${req.headers.email}/${req.headers.urlrequest}`;
        fs.readdir(dir, (error, fileNames) => {
            if (error) 
                throw error;
            let ext = "";
            fileNames.forEach(filename => {
                let name = path.parse(filename).name;
                if (path.parse(filename).ext == "") {
                    ext = "dossier";
                } else {
                    ext = path.parse(filename).ext;
                }
                let length = filename.length;
                file = new File(name, ext, length);
                arrayList.push(file);
            });
            res.status(201).json({list: arrayList, status: "success"});
        });
};




exports.downloadFiles = async  (req, res,next) => {
    // fileName = __Config.Folder.path+Email+filePath+"/"+fileName; 
    // res.status(200).download(filePath,fileName)
};

exports.UploadFile = async (req, res, next) => { 
    let query = url.parse(req.originalUrl, true).query.url;
    let tab = query.split('?');
    let token = getQueryStringValue('token','?'.concat(tab[2]));
    let user = getQueryStringValue('user','?'.concat(tab[1]));
    let current = getQueryStringValue('Currenturl','?'.concat(tab[0]));
    let manager = new manageToken();
    if (manager.verifyToken(manager.decryptToken(token))){
        let storage = multer.diskStorage({
            destination: `${__Config.Folder.path}${user}/${current}`
            ,
            filename: function (req, file, cb) {
                cb(null,file.originalname)
            }
        })
        var upload = multer({storage: storage}).array('file')
        

        console.log("upload");
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err)
            }
            console.log("finish")
            return res.status(200).json({status : "success" , response: "Le dépot à été réalisé."})
        })
    }else{
        return res.status(498).json({message: "Token Invalid"})
    }
};


const getQueryStringValue =  (key,url) => {  
    return decodeURIComponent(url.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*+\#]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  