const mongoose = require('mongoose');

const TodoShema = mongoose.model(
  "Todo",
  new mongoose.Schema({
    Author:  { type : String, required : true},
    Description:  { type : String, required : true},
    Date : { type : Number , required : true},
    Duree :  { type : Number , required : true},
    State : { type : Boolean, required : true }
  })
);

module.exports = TodoShema;