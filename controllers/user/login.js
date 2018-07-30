'use strict';

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const config = require('../../utils/config');
var User = require('../../models/user');
var handleError = require('../../utils/error-handler');

var controller = (req, res, next) => {

  var params = req.body;

  //Get user from database
  User.findOne({email: params.user})
  .select("+password")
  .then(user => {
    bcrypt.compare(params.password, user.password)
    .then(success => {

      if(success) {
        //Create new JWT and generate response
        jwt.sign({userId: user._id}, config.secret, { expiresIn: 60 * 60}, (err, token) => {
          if(err) {
            throw err;
          }

          //prepare user object to send along with the response
          var preparedUSerData = {
            name: user.name,
            email: user.email,
            _id: user._id
          }

          //Send JSON response
          res.json({user: preparedUSerData, success: true, authToken: token});
        })
      } else {
        res.json({success: false, message: "Incorrect credentials"});
      }
    })
    .catch(err => {
      handleError(res, err, "Invalid Data", 401);
    })
  })
  .catch(err => {
    handleError(res, err, "Invalid Data", 401);
  })

}

module.exports = controller;
