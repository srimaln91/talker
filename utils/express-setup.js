'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

class Config {

  constructor(app) {
    // Setting .html as the default template extension
    app.set('view engine', 'html');

    // Initializing the ejs template engine
    app.engine('html', require('ejs').renderFile);

    // Telling express where it can find the templates
    app.set('views', (__dirname + '/../pages'));

    //Static path
    app.use(require('express').static(require('path').join('public_data')));

    //CORS setup
    app.use(cors());

    //Body parser
    app.use(bodyParser.json());

    //Set logger agent
    app.use(morgan("combined"));
  }
}

module.exports = Config;
