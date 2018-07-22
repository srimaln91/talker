'use strict';
const registrationController = require('../controllers/user/register');

class Routes {

    constructor(app, socket) {
        this.app = app;
        this.io = socket;
        this.ioClients = [];
    }

    appRoutes() {
        this.app.get('/', (req, res, next) => {
            res.render('index');
        });

        this.app.post('/registration', registrationController);
    }

    socketEvents() {

        this.io.on('connection', (client) => {

            console.log('client connected');

            this.ioClients.push(client.id);

            console.log(this.ioClients);

            client.on('join', (data) => {
                console.log(data);
                this.io.emit('messages', 'Hello from server');
            });

            client.on('disconnect', () => {
                // var disconClientIdIndex = this.ioClients.indexOf(client.id);
                this.ioClients = this.ioClients.filter((item) => {
                    return item !== client.id;
                })
            });

            client.on('messages', (data) => {

                this.ioClients.forEach((clientId) => {
                    this.io.to(clientId).emit('privatemsg', 'Test Private Msg');
                });

                this.io.emit('broad', data);

                if(typeof(this.io.broadcast) != 'undefined') {
                    this.io.broadcast.emit('broad',data);
                }

            });

        });
    }

    init() {
        this.appRoutes();
        this.socketEvents();
    }
}

module.exports = Routes;
