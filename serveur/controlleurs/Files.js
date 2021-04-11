const fs = require('fs');
const File = require('../models/Files');
const multer = require('multer');
var path = require('path');
const __Config =require('../config.json');


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
    var storage = multer.diskStorage({
        destination: `${__Config.Folder.path}${req.headers.email}/${req.headers.currenturl}`
        ,
        filename: function (req, file, cb) {
            cb(null,file.originalname)
        }
    })
    var upload = multer({storage: storage}).array('file')
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(
        )
    })
};


