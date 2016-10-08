var request = require('request');

/*
    movieIdArr:  array of OMDB id or a single string
                 null will get the default ones
    callback: Optional
    return value: will call the callback and execute each time for each id
*/
function getMoviesById(movieIdArr, callback) {
    var idList = [];

    if (movieIdArr != null) {
        if (Array.isArray(movieIdArr)) {
            idList.push(movieIdArr);
        } else {
            idList = movieIdArr;
        }
    } else {
        // if no movie ID were specified
        return callback(null);
    }

    var movieArr = [];
    idList.forEach(function(movieId) {
        var url = 'http://www.omdbapi.com/?i=' + movieId + '&plot=short&r=json';

        request(url, function(error, response, data) {
            if (error || response.statusCode != 200) {
                console.log(error);
                return callback(null);
            }
            var body = JSON.parse(data);
            var movie = {};
            movie.title = body.Title;
            movie.year = body.Year;
            movie.rating = body.Rating;
            movie.releaseDate = body.ReleaseDate;
            movie.runTime = body.RunTime;
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
    });
}

module.exports = {
    getMoviesById: getMoviesById
};
