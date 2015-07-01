/*global require, module, applicationContext */
'use strict';
var apiKey = applicationContext.configuration.apiKey;
var apiUser = applicationContext.configuration.apiUser;
var request = require('org/arangodb/request');
var multipartMime = require('./util/multipart-mime');
var util = require('util');

var data = require('./exports').schema.validate(applicationContext.argv[0]);
if (data.error) {
  throw data.error;
}

var payload = multipartMime(_.extend({api_user: apiUser, api_key: apiKey}, data.value));
var response = request.post('https://api.sendgrid.com/api/mail.send.json', {
  body: payload.payload,
  headers: {
    'accept': 'application/json',
    'content-type': 'multipart/form-data; boundary=' + payload.boundary
  }
});

if (response.body) {
  response.body = JSON.parse(response.body);
  if (Math.floor(response.statusCode / 100) !== 2) {
    throw new Error(util.format(
      'Server returned HTTP status %s with message: %s',
      response.statusCode,
      body.message
    ));
  }
} else if (Math.floor(response.statusCode / 100) !== 2) {
  throw new Error('Server sent an empty response with status ' + response.statusCode);
}

module.exports = response.body;
