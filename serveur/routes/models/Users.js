const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


var UserSchema = mongoose.Schema({
  UserName: {
    type: String,
    lowercase: true,
    unique: true,
    required: [
        true, "ne peut être vide"
    ],
    match: [/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/, 'Votre nom d\'utilisateur est invalide car il utilise des caractères spéciaux ou dépasse les 30 caractères'],
    index: true
  },
  Password : { type : String , required : true},
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: {
    type: String,
    lowercase: true,
    unique : true,
    required: [true, "ne peut être vide"],
    match: [/\S+@\S+\.\S+/, 'est invalide'],
    index: true
  },
  Phone: { type: Number, required: true },
});


UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.Password, 10, function (err, hash) {
      if (err) {
          return next(err);
      }
      user.Password = hash;
      next();
  })
});


const Users = mongoose.model('Users', UserSchema);

module.exports = Users;