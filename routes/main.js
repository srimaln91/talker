'use strict';

const userRoutes = require('./user/user.routes');
const conversatinoRoutes = require('./conversation.routes');

class Routes {

    constructor(app) {
        this.app = app;
        this.initializeRoutes();
    }

    initializeRoutes() {
      this.app.use('/user', userRoutes);
      this.app.use('/conversation', conversatinoRoutes);
    }
}

module.exports = Routes;
