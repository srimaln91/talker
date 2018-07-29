'use strict';

var bcrypt = require('bcrypt');

var User = require('../../models/user');
var handleError = require('../../utils/error-handler');

var controller = (req, res, next) => {

  var params = req.body;

  bcrypt.hash(params.password, 5).then(function(hash) {

    var user = new User({
      name: {
        fname: params.name.fname,
        lname: params.name.lname,
        uname: params.name.uname
      },
      email: params.email,
      password: hash
    });

    user.save((err, data) => {
      if(err) {
        handleError(res, err, "Invalid Data", 401);
      }

      res.json({success: true});
      res.end();

    });
  })
  .catch((err) => {
    console.error(err);
    res.status(500);
    res.end();
  })
}

module.exports = controller;
