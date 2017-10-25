var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, function(err, data) {
    if (err) {
      callback(null, err);
    } else {
      var formatted = data.toString().split('\n');
      callback(formatted);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  this.readListOfUrls( function(list, err) {
    callback(list.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url, function(err) {
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(this.paths.archivedSites, function(err, files) {
    if (err) {
      callback(null, err);
    } else {
      callback(files.includes(url));
    }
  });
};

exports.downloadUrls = function(urls) {
  _.each(urls, (url) => {

    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
};
