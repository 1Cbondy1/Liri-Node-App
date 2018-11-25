require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
var axios = require("axios");

// Determine if command is valid
if (process.argv[2]) {
    if (process.argv[2] === "concert-this") {
        console.log("Running concert-this...");
        concertThis();
    }
    else {
        validCommand();
    }
} 
else {
    validCommand();
}

function concertThis() {

    if (process.argv[3]) {

        var movieName = process.argv[3];
        var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        // Runs a request with axios to the OMDB API with the movie specified
        axios.get(movieUrl).then(
            function(response) {
                console.log("\n" + "Title: " + response.data.Title);
                console.log("Year: " + response.data.Released);
                console.log("IMDB Rating: " + response.data.imdbRating + "\n");
                // console.log("Rotten Tomatoes Rating: " + response.data.);
                // console.log("Country: " + response.data.);
                // console.log("Language: " + response.data.);
                // console.log("Actors: " + response.data.);
            }
        );

    } else {
        console.log("Please enter a movie to search.");
    }
}

function validCommand() {
    console.log("\n" + "Please enter a valid command from the following list:");
    console.log("concert-this");
    console.log("spotify-this-song");
    console.log("movie-this");
    console.log("do-what-it-says" + "\n");
}