var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var fs = require('fs');


exports.handleRequest = function (request, response) {
  //on GET
  if (request.url === '/') {
    if (request.method === 'GET') {
      console.log('its a get to the / endpoint');
      response.writeHead(200, httpHelpers.headers);
      response.end('' + fs.readFile('web/public/index.html', function(err, data) {
        console.log('err:', err, 'data:', data);
      }));
    } else {
      response.writeHead(405, httpHelpers.headers);
      response.end('405: Method not allowd');
    }

  }

  //on POST 
  response.end(archive.paths.list);
};
