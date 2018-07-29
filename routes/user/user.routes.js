'use strict';

var express = require('express');
var router = express.Router();

const registrationController = require('../../controllers/user/register');
const loginController = require('../../controllers/user/login');
const indexController = require('../../controllers/user/index');

router.post('/login', loginController);
router.get('/', indexController);
router.post('/', registrationController);

module.exports = router;
