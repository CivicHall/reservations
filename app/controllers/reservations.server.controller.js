'use strict';

var https = require('https'),
  querystring = require('querystring'),
  config = require('../../config');


function authenticate(callback) {
  console.log(config);

  // Build an object that we want to send
  var authentication = {
    scope: 'read',
    grant_type: 'password',
    username: config.cobot.username,
    password: config.cobot.password,
    client_id: config.cobot.client_id,
    client_secret: config.cobot.client_secret,
  }

  // Put together the data
  var post_data = querystring.stringify(authentication);

  // An object of options to indicate where to post to
  var post_options = {
      host: 'www.cobot.me',
      path: '/oauth/access_token',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length
      }
  };

  // Set up the request
  var post_req = https.request(post_options, function(res) {
    res.setEncoding('utf8');
    var token = '';
    res.on('data', function (chunk) {
      token = token + chunk;
    });
    res.on('end', function() {
      callback(JSON.parse(token));
    });
  });

  post_req.write(post_data);
  post_req.end()
}

/**
 * Module dependencies.
 */
exports.getReservations = function(req, res) {

  authenticate(function(token) {
    var start = new Date();
    var end = new Date();
    start.setHours(0,0,0,0);
    end.setHours(23,59,59,999);

    var parameters = querystring.stringify({
      from: start.toUTCString(),
      to: end.toUTCString()
    });

    // An object of options to indicate where to post to
    var get_options = {
      host: config.cobot.host,
      path: '/api/bookings?' + parameters,
      method: 'GET',

      headers: {
        'Authorization': 'Bearer ' + token.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    // Set up the request
    var get_req = https.request(get_options, function(res_get) {
      res_get.setEncoding('utf8');
      var data = []
      res_get.on('data', function (chunk) {
          data.push(chunk);
      });
      res_get.on('end', function() {
        res.send(data.join(''));
      });
    });

    // post the data
    get_req.end()
  })

};

exports.getResources = function(req, res) {

  authenticate(function(token) {

    // An object of options to indicate where to post to
    var get_options = {
      host: config.cobot.host,
      path: '/api/resources',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    // Set up the request
    var get_req = https.request(get_options, function(res_get) {
      res_get.setEncoding('utf8');
      var data = []
      res_get.on('data', function (chunk) {
          data.push(chunk);
      });
      res_get.on('end', function() {
        res.send(data.join(''));
      });
    });

    // post the data
    get_req.end()
  })

};
