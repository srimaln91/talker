'use strict';

const express = require('express');
const http = require('http');
var socket = require('socket.io');

const config = require('./utils/config');
const router = require('./routes/main');

class Server {

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socket(this.server);
    }

    appConfig() {
        new config(this.app);

        this.host = '127.0.0.1';
        this.port = 4000;
    }

    appRouteSetup() {
        var routes = new router(this.app, this.io);
        routes.init();
    }

    runApp() {

        this.appConfig();
        this.appRouteSetup();

        this.server.listen(this.port, this.host, () => {
            console.log("Server is listening on port: "+ this.port);
        });
    }

}

var server = new Server();
server.runApp();