var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers');
var fs = require('fs');


exports.handleRequest = function (request, response) {
  //on GET
  if (request.url === '/') {
    if (request.method === 'GET') {
      fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end(data);
      });
    } else {
      response.writeHead(405, httpHelpers.headers);
      response.end('405: Method not allowd');
    }
  }

  //on POST 
  //response.end(archive.paths.list);
};

