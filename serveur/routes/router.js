const express = require('express');
const router = express.Router()

const SignUser = require('../controlleurs/Signup');
const AuthUser = require('../controlleurs/Auth');

router.get('/Users', SignUser.getUsers);



router.post('/AddUser', SignUser.createUsers);
router.post('/LoginUser', AuthUser.authentification);


router.delete('/DeletUser/:id', SignUser.DeletOneUser);

module.exports = router;