'use strict';

const express = require('express');
const http = require('http');
const socket = require('socket.io');
const mongoose = require('mongoose');

const expressSetup = require('./utils/express-setup');
const router = require('./routes/main');
const config = require('./utils/config');

class Server {

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socket(this.server);
  }

  /**
   * Initialize the main configuration
   */
  appConfig() {
    new expressSetup(this.app);

    this.host = config.host;
    this.port = process.env.PORT || config.port;
  }

  /**
   * Register app routes
   */
  appRouteSetup() {
    var routes = new router(this.app, this.io);
    routes.init();
  }

  /**
   * Initialize database connection
   */
  initializeDatabase() {

    var mongoOptions = { useNewUrlParser: true };

    mongoose.connect(config.database.connString, mongoOptions).then(() => {
      console.info("Database Connected.");
      this.startServer();
    }).catch((err) => {
      console.error("Database connection error.");
    })
  }

  /**
   * Start the node server
   */
  startServer() {
    console.info("Starting Node Server...");

    this.server.listen(this.port, this.host, () => {
      console.info("Server is listening on port: " + this.port);
    });

    this.server.on('error', () => {
      console.error("Unable to start the server on port: " + port);

      //Stop the process
      process.exit();
    });

  }

  /**
   * Bootstrap the application
   */
  runApp() {

    this.appConfig();
    this.appRouteSetup();
    this.initializeDatabase();
  }

}

var server = new Server();
server.runApp();
