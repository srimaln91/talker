const socket = require('socket.io');

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
        this.redisClient.set(client.id, userId);
      });

      // client.on('join', (data) => {
      //   console.log(data);
      //   this.io.emit('messages', 'Hello from server');
      // });

      client.on('new-message', (data) => {
        console.log(data);
        this.io.emit('new-message', data);
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
