const socket = require('socket.io');
const Conversation = require('../models/conversation');
const Message = require('../models/message');

class SocketManager {

  constructor(server, redisClient) {
    this.io = socket(server);
    this.ioClients = [];
    this.redisClient = redisClient;
    this.bindEvents();
  }

  bindEvents() {

    this.io.on('connection', (client) => {

      console.log('client connected');

      // this.ioClients.push(client.id);
      client.on('userid', (userId) => {
        this.redisClient.set(userId, client.id );
      });

      client.on('room', (roomId) => {
        console.log("Joined Room : " + roomId);
        client.join(roomId);
      });

      client.on('new-message', (newMessage) => {

        //Get recipients
        Conversation.findById(newMessage.conversation)
        .select({users: 1})
        .then(conversation => {
          this.io.to(conversation._id).emit('new-message', newMessage);
          var message = new Message({
            conversation: conversation,
            from: newMessage.from,
            message_body: newMessage.message_body
          });
          message.save();
        })
        .catch(err => {
          console.log(err);
        });

      });

      client.on('disconnect', () => {
        console.log('Client Disconnected.');
        // this.ioClients = this.ioClients.filter((item) => {
        //   return item !== client.id;
        // })
        this.redisClient.del(client.id);
      });

      // client.on('messages', (data) => {

      //   this.ioClients.forEach((clientId) => {
      //     this.io.to(clientId).emit('privatemsg', 'Test Private Msg');
      //   });

      //   this.io.emit('broad', data);

      //   if (typeof (this.io.broadcast) != 'undefined') {
      //     this.io.broadcast.emit('broad', data);
      //   }

      // })

    })

  }
}

module.exports = SocketManager;
