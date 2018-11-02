var Spotify = require('node-spotify-api');
var request = require('request');
require("dotenv").config();
var keys = require('./keys.js');
 
var spotify = new Spotify(keys.spotify);


//parse out command
var command = process.argv[2];
var remainder = "";
for (var i=3; i < process.argv.length; i++) {
    remainder = remainder + process.argv[i] + " ";
}
remainder = remainder.trim();
remainder = remainder.split(' ').join('+');

console.log("The command you entered was " + command + " as related to " + remainder);
 
if (command === "concert-this") {
    var baseurl = "https://rest.bandsintown.com/artists/" + remainder + "/events?app_id=codingbootcamp";
    console.log(baseurl);
    request(baseurl, function(err, res, body) {
        console.log(body);
    });
}

if (command === "spotify-this-song") {
    
}

if (command === "movie-this") {
    
}

if (command === "do-what-it-says") {
    
}
// spotify.search({ type: 'track', query: 'Porcelina' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data.tracks); 
// });