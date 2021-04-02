const fs = require('fs');
const File = require('../routes/models/Files')
var multer = require('multer')
const testFolder = 'C:/Users/anton/eclipse-workspace/FichierClient';
var path = require('path');
const { cpuUsage } = require('process');


exports.filesList = (req, res, next) => {
    let content = JSON.parse(req.headers.content)
    console.log(testFolder + "/" + content.username + content.UrlRequest);
        var arrayList = [];
        var dir = testFolder + "/" + content.username + content.UrlRequest;
        fs.readdir(dir, (error, fileNames) => {
            if (error) 
                throw error;
            
            var ext = "";
            fileNames.forEach(filename => {
                const name = path.parse(filename).name;
                if (path.parse(filename).ext == "") {
                    ext = "dossier";
                } else {
                    ext = path.parse(filename).ext;
                }
                const length = filename.length;
                file = new File(name, ext, length);
                arrayList.push(file);

            });
            res.status(201).json({list: arrayList, status: "success"});
        });
};




exports.downloadFiles =  (req, res,next) => {
    console.log(req.originalUrl)
    var Param = req.originalUrl;
    Param  = Param.split("&");
    console.log(Param);
    var filePath = Param[0].substr(27);
    var username = Param[1].substr(9);
    var fileName = Param[2].substr(5);
    fileName = 'C:/Users/anton/eclipse-workspace/FichierClient/'+username+filePath+"/"+fileName; 
     res.status(200).download(filePath,fileName)
};

exports.UploadFile = (req, res, next) => {  
    var Param = req.originalUrl;
    Param  = Param.split("&");
    console.log(Param[0]);
    console.log('C:/Users/anton/eclipse-workspace/FichierClient/'+Param[1].substr(9)+Param[0].substr(29));
    var storage = multer.diskStorage({
        destination: 'C:/Users/anton/eclipse-workspace/FichierClient/'+Param[1].substr(9)+Param[0].substr(29)
        ,
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
    var upload = multer({storage: storage}).array('file')

    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            console.log("A Multer error occurred when uploading.");
            return res.status(500).json(err);

        } else if (err) {
            console.log("An unknown error occurred when uploading.");
            return res.status(500).json(err)
        }

        return res.status(200).send(
            

        )
        


    })
};


