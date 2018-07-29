'use strict';

var express = require('express');
var router = express.Router();

const createConversation = require('../controllers/conversation/create');

router.post('/', createConversation);

module.exports = router;
