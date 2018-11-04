var Spotify = require('node-spotify-api');
var request = require('request');
require("dotenv").config();
var keys = require('./keys.js');
const moment = require('moment')
var fs = require("fs");

var spotify = new Spotify(keys.spotify);


//parse out command
var command = process.argv[2];
var remainder = "";
for (var i = 3; i < process.argv.length; i++) {
    remainder = remainder + process.argv[i] + " ";
}
remainder = remainder.trim();
remainder = remainder.split(' ').join('+');

// console.log("The command you entered was " + command + " as related to " + remainder);

if (command === "concert-this") {
    concertInfo(remainder);
}

if (command === "spotify-this-song") {
    songInfo(remainder);
}

if (command === "movie-this") {
    movieInfo(remainder);
}

if (command === "do-what-it-says") {
    //first read in the text file
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // We will then print the contents of data
        // console.log("read in the following: " + data);
        // Then split data by the comma
        var dataArr = data.split(",");
        var myMethod = dataArr[0];
        var myParam = dataArr[1].split('"')[1];
        myParam = myParam.split(' ').join('+');
        // console.log("So, we need to do the function " + myMethod + " with the paramater of " + myParam);
        if (myMethod === "concert-this") {
            bandInfo(myParam);
        }
        
        if (myMethod === "spotify-this-song") {
            songInfo(myParam);
        }
        
        if (myMethod === "movie-this") {
            movieInfo(myParam);
        }

    });
}

function concertInfo(bandName) {
    if (bandName === "") {
        bandName = "Taylor Swift";
    }
    var baseurl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    // console.log(baseurl);
    request(baseurl, function (err, res, body) {
        var concerts = JSON.parse(body);
        if (concerts.length == 0) {
            console.log("Couldnt find any upcomming shows.");
        }
        for (var i = 0; i < concerts.length; i++) {
            var concert = concerts[i];
            console.log("You can see a show at " + concert.venue.name);
            console.log("in " + concert.venue.city + ", " + concert.venue.region);
            var concertDateTime = moment(concert.datetime);
            console.log("on " + concertDateTime.format("MM/DD/YYYY"));
            console.log("--------------------------");
        };
        console.log("\n");
    });
};

function songInfo(trackName) {
    if (trackName === "") {
        trackName = "The Sign Ace of Base";
    }
    spotify.search({ type: 'track', query: trackName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items);
        var song = data.tracks.items[0];
        if (song != null) {
            console.log("I found the following track:")
            // Artist(s)
            console.log("Artist: " + song.artists[0].name);

            // The song's name
            console.log("Track name: " + song.name);

            // A preview link of the song from Spotify
            console.log("Spotify link: " + song.external_urls.spotify);

            // The album that the song is from
            //the album name
            console.log("Album: " + song.album.name + "\n");
        }
        else {
            console.log("Couldn't find a song with that name.\n");
        }
    });
};

function movieInfo(movieName) {
    if (movieName === "") {
        movieName = "Mr. Nobody";
    }
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body)
            // console.log(movie);
            if (movie.Title != null) {
                console.log("Title: " + movie.Title);
                console.log("Release Year: " + movie.Year);
                console.log("IMDB Rating: " + movie.imdbRating);
                var rtScore = "Not Found";
                for (var i = 0; i < movie.Ratings.length; i++) {
                    var rating = movie.Ratings[i];
                    if (rating.Source === "Rotten Tomatoes") {
                        rtScore = rating.Value;
                    }
                }
                console.log("Rotten Tomatoes Rating: " + rtScore);
                console.log("Country Produced In: " + movie.Country);
                console.log("Language: " + movie.Language);
                console.log("Plot: " + movie.Plot);
                console.log("Actors: " + movie.Actors + "\n");
                
            }
            else {
                console.log("Couldnt find a movie with that name.\n");
            }
        }
    });
};