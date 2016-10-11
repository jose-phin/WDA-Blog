var request = require('request');

/*
    omdbId:  String which is an OMDB id
    callback: should process the data
*/
function getMoviesById(omdbId, callback) {

        var url = 'http://www.omdbapi.com/?i=' + omdbId + '&plot=short&r=json';
        console.log("on here some more");
        request(url, function(error, response, data) {
            if (error || response.statusCode != 200) {
                console.log(error);
                return callback(null);
            }
            var body = JSON.parse(data);
            console.log('body: '+ JSON.stringify(body));
            var movie = {};
            movie.title = body.Title;
            movie.year = body.Year;
            movie.rating = body.Rating;
            movie.releaseDate = body.Released;
            movie.runTime = body.Runtime;
            movie.genre = body.Genre;
            movie.director = body.Director;
            movie.writter = body.Writter;
            movie.actors = body.Actors;
            movie.plot = body.Plot;
            movie.poster = body.Poster;
            movie.imdbID = body.imdbID;
            movie.imdbRating = body.imdbRating;
            callback(movie);
        });
}

module.exports = {
    getMoviesById: getMoviesById
};
