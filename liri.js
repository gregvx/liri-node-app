var Spotify = require('node-spotify-api');
var request = require('request');
require("dotenv").config();
var keys = require('./keys.js');
 
var spotify = new Spotify(keys.spotify);
 
spotify.search({ type: 'track', query: 'Porcelina' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.tracks); 
});