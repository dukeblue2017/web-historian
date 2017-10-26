var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');


exports.handleRequest = function (request, response) {
  if (request.method === 'GET') {
    console.log('GET received, endpoint: ', request.url);
    fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(data);
      response.end();
    });
  } else if (request.method === 'POST') {
    console.log('POST received, endpoint: ', request.url);
    request.on('data', function(chunk) {
      var urlToPost = ('' + chunk).slice(4);
      archive.isUrlInList(urlToPost, function() {
        //if yes: 1)if in archive: return archived html 2)if not in archive: loading.html
        //if no: add urlToPost to list and send them to loading
      });
    });
  } else {
    console.log('Method received is not GET or POST, endpoint: ', request.url);
    response.writeHead(405, httpHelpers.headers);
    response.end('405: Method not allowed to endpoint /');
  }
  
};

