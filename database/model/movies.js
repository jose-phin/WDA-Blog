var mongoose = require('mongoose');
var movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year : { type: Number, required: true },
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
    imdbRating : Number,
    comments :
        [{
            username: String,
            comment: String,
            date: Date,
            replies: [{
                username: String,
                comment: String,
                date: Date}]
        }]
});

module.exports = mongoose.model('Movie', movieSchema);
