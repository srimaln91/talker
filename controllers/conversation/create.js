var bcrypt = require('bcrypt');

var Conversation = require('../../models/conversation');
var User = require('../../models/user');

var handleError = require('../../utils/error-handler');

var controller = async (req, res, next) => {

  var params = req.body;

  //get users
  var users = req.body.users;
  User.find({ _id: { $in: users } }).then(users => {

    //Check for existing conversations
    Conversation.findOne().where({ users: users }).then(oldConversation => {

      if (oldConversation !== null) {

        res.json({ conversation: oldConversation, success: true, isNew: false });
        res.end();

      } else {

        var conversation = new Conversation({
          name: params.name,
          users: users
        });

        conversation.save()
          .then(newConversation => {
            res.json({ conversation: newConversation, success: true, isNew: true });
            res.end();
          })
          .catch(err => {
            handleError(res, err, "Error occured", 404);
          })
      }

    })
      .catch(err => {
        handleError(res, err, "Can not find old conversations", 404);
      })

  })
    .catch(err => {
      handleError(res, err, "Can not find users", 404);
    })
}

module.exports = controller;
