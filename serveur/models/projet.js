const mongoose = require('mongoose');

const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    Author:  { type : String, required : true},
    Description:  { type : String, required : true},
    Date : { type : Number , required : true},
    DateExp :  { type : Number , required : true},
    Todo : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
      }
    ],
    Devis :  { type : Boolean },
    Valider : { type : Boolean },
    Token : { type : String }
  })
);

module.exports = Project;