'use strict';

class Routes {

    constructor(app, socket) {
        this.app = app;
        this.io = socket;
        this.ioClients = [];
    }

    appRoutes() {
        this.app.get('/', (req, res, next) => {
            res.render('index');
        })
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
        
            client.on('messages', (data) => {
        
                // io.to(clients[0]).emit('privatemsg', 'Im one');
                // io.to(clients[1]).emit('privatemsg', 'Hy there. Im 222');
                
                this.io.emit('broad', data);
                if(typeof(this.io.broadcast != 'undefined')) {
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
