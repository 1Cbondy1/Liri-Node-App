require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
var axios = require("axios");

// Initial if statements to determine if command is valid
if (process.argv[2]) {
    // Run the movie-this function
    if (process.argv[2] === "movie-this") {
        console.log("Running movie-this...");
        movieThis();
    }
    // Run the spotify-this-song function
    else if (process.argv[2] === "spotify-this-song") {
        console.log("Running spotify-this-song...");
        spotifyThis();  
    }
    // Run the concert-this function
    else if (process.argv[2] === "concert-this") {
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

// Function using axios package to search for movie information
function movieThis() {

    if (process.argv[3]) { 
        var movieName = process.argv[3];
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
    console.log("It's working!!");
}

// Console.logs this text if a valid command is not chosen
function validCommand() {
    console.log("\n" + "Please enter a valid command from the following list:");
    console.log("concert-this");
    console.log("spotify-this-song");
    console.log("movie-this");
    console.log("do-what-it-says" + "\n");
}