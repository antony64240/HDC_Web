let uuid = require('uuid');

let File  = class {
    constructor(name, ext, lenght) {
       this._id= uuid.v4();
       this.name = name;
       this.extension= ext;
       this.lenght=lenght;
     }
   };


module.exports = File;