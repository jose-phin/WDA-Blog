var mongoose = require('mongoose');
var movieSchema = new mongoose.Schema({
    title: String,
    year : Number,
    rating: String,
    releaseDate: String,
    runTime: String,
    genre: String,
    director: String,
    writter: String,
    actors: String,
    plot: String,
    poster: String,
    imdbID: String,
    imdbRating : Number
});

module.exports = mongoose.model('Movie', movieSchema);
