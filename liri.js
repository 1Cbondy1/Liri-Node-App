require("dotenv").config();

// Require all modules and exteral js files
var Spotify = require('node-spotify-api');
var axios = require("axios");
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);

// Initial if statements to determine if command is valid
if (process.argv[2]) {
    // Run the movie-this function
    if (process.argv[2] === "movie-this") {
        movieThis();
    }
    // Run the spotify-this-song function
    else if (process.argv[2] === "spotify-this-song") {
        spotifyThis();  
    }
    // Run the concert-this function
    else if (process.argv[2] === "concert-this") {
        concertThis();  
    }
    else {
        validCommand();
    }
} 
else {
    validCommand();
}

// Function using axios package to search for movie information
function movieThis() {

    console.log("Running movie-this...");

    if (process.argv[3]) { 
        var movieName = process.argv.slice(3).join(" ");
    }
    else {
        var movieName = "Mr. Nobody";
    }

    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // Runs a request with axios to the OMDB API with the movie specified
    axios.get(movieUrl).then(
        function(response) {
            console.log("\n" + "Title: " + response.data.Title);
            console.log("Year: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Actors: " + response.data.Actors + "\n");
        }
    );
}

// Function using Node-Spotify-API package to search for movie information
function spotifyThis() {
    console.log("Running spotify-this-song...");

    if (process.argv[3]) { 
        var songName = process.argv.slice(3).join(" ");
    }
    else {
        var songName = "The Sign, Ace of Base";
    }

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("\n" + "Track: " + data.tracks.items[0].name); 
        console.log("Artist: " + data.tracks.items[0].artists[0].name); 
        console.log("Album: " + data.tracks.items[0].album.name); 
        console.log("Preview: " + data.tracks.items[0].preview_url + "\n"); 

    });
}

// Function using axios package to search for movie information
function concertThis() {

    console.log("Running concert-this...");

    if (process.argv[3]) { 
        var artist = process.argv.slice(3).join(" ");
    }
    else {
        var artist = "Cher";
    }

    var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // Runs a request with axios to the OMDB API with the movie specified
    axios.get(bandUrl).then(
        function(response) {
            console.log("\n" + "Artist: " + artist);
            for (var i = 0; i < 5; i++) {
                console.log("\n" + "Venue: " + response.data[i].venue.name);
                console.log("Address: " + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
                console.log("Date: " + response.data[i].datetime + "\n");
            }
        }
    );
}

// Console.logs this text if a valid command is not chosen
function validCommand() {
    console.log("\n" + "Please enter a valid command from the following list:");
    console.log("concert-this");
    console.log("spotify-this-song");
    console.log("movie-this");
    console.log("do-what-it-says" + "\n");
}