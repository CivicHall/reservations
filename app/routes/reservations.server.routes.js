'use strict';

module.exports = function(app) {
  // Root routing
  var reservations = require('../../app/controllers/reservations.server.controller');
  app.route('/reservations').get(reservations.getReservations);
  app.route('/resources').get(reservations.getResources);
};
