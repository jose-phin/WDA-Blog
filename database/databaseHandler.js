var mongoose = require('mongoose');
var Movie = require('./model/movies');
var config = require('./config.json');
var Promise = require('mpromise');

function startDb() {
    mongoose.promise = new Promise;
    mongoose.connect('mongodb://' + config.username + ':' + config.password + '@' + config.database);
    mongoose.connection.on('error', function() {
        mongoose.promise.reject('Error: Could not connect to mLab Database: ' + config.database);
    });
    mongoose.connection.once('open', function() {
        mongoose.promise.fulfill('Opened connection to database: ' + config.database);
    });
    return mongoose.promise;
}

function addMovie(data) {

    //create a new movie using the schema
    var newMovie = new Movie({
        title: data.title,
        year : data.year
    });

    //return the save promise
    return newMovie.save();
}

function getMovie(title) {

    //decode the title
    var decodedTitle = decodeURIComponent(title);

    //find the movie by title, ignore case
    return Movie.find({"title": new RegExp('^'+decodedTitle+'$', "i")}).exec();
}

module.exports = {
    startDb: startDb,
    addMovie: addMovie,
    getMovie:getMovie
};
