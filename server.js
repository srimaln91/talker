'use strict';

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const redis = require("redis");

const expressSetup = require('./utils/express-setup');
const router = require('./routes/main');
const SocketManager = require('./routes/sockers');

const config = require('./utils/config');

class Server {

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
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
    new router(this.app);
    new SocketManager(this.server, this.redisClient);
  }

  /**
   * Initialize database connection
   */
  initializeDatabase() {

    var mongoOptions = { useNewUrlParser: true };

    mongoose.connect(config.database.connString, mongoOptions)
    .then(() => {
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

  startRedisClient() {

    this.redisClient = redis.createClient();

    this.redisClient.on("error", function (err) {
      console.log("Error " + err);
    });

    this.redisClient.on('connect', function () {
      console.log('Redis connected.');
    });

  }
  /**
   * Bootstrap the application
   */
  runApp() {

    this.appConfig();
    this.startRedisClient();
    this.appRouteSetup();
    this.initializeDatabase();
  }

}

var server = new Server();
server.runApp();
