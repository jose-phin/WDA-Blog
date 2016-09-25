var mongoose = require('mongoose');
var Movie = require('./models/movies');


function startDb(callback) {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/movie');
    mongoose.connection.on('error', function() {
      console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
      callback("ERROR");
    });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("we are connectimando");
      callback(null);
    });

}

function addMovie(data, callback) {

    var newMovie = new Movie({
        title: data.title,
        year : data.year,
        rating: data.rating,
        releaseDate: data.releaseDate,
        runTime: data.runTime,
        genre: data.genre,
        director: data.director,
        writter: data.writter,
        actors: data.actors,
        plot: data.plot,
        poster: data.poster,
        imdbID: data.imdbID,
        imdbRating : data.imdbRating
    });

    console.log("data plox: " + JSON.stringify(newMovie));

    newMovie.save(function(err) {
        if (err) {
            callback(err,null);
        }
        callback(null, data);
    });
}

module.exports = {
    startDb: startDb,
    addMovie: addMovie
};
