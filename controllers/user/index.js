'use strict';

const config = require('../../utils/config');
const User = require('../../models/user');
const handleError = require('../../utils/error-handler');

var controller = (req, res, next) => {

  var params = req.body;

  User.find({}).then(users => {
    res.json(users);
    res.end();
  })
  .catch(err => {
    handleError(res, err, "No users found", 404);
  })
}

module.exports = controller;
