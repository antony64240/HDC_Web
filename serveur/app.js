const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var multer = require('multer')
var cors = require('cors');
const route = require('./routes/router');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://amezzas:5Fk28OTmMSkOKl7I@cluster0.wcjzr.mongodb.net/<dbname>?retryWrites=true&w=majority',


  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(bodyParser.json());
  app.use(cors());

  
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); 

  app.use('/api/', route);




  module.exports = app;