/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
Promise.promisifyAll(fs);

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {

  return fs.readFileAsync(filePath).then((data) => {
    var firstLine = data.toString();
    firstLine = firstLine.split('\n')[0];
    return firstLine;
  }).catch(err => { throw(err) });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  
  return new Promise((resolve, reject) => {
    request(url, (err,data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }).then(data => {
    return data.statusCode;
  }).catch(err => { throw(err) });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
