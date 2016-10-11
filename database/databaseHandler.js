var mongoose = require('mongoose');
var Movie = require('./model/movies');
var User = require('./model/user');
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
        year : data.year,
        rating : data.rating,
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
    console.log("data: "+data);
    //return the save promise
    return newMovie.save();
}

function getMovie(title) {
    //decode the title
    var decodedTitle = decodeURIComponent(title);

    //find the movie by title, ignore case
    return Movie.find({"title": new RegExp('^'+decodedTitle+'$', "i")}).exec();
}


function getMovieV2(title, callback) {
    var movie;
    // finds the movie by title, ignoring cases
    // then processes the data and executres the callback on success
    Movie.find({"title": new RegExp('^' + title+'$', 'i')}).cursor()
            .on('data', function(doc) { movie = doc; })
            .on('err', function() { return callback(err,null); })
            .on('end', function() { return callback(null,movie); });
}

function getAllMovies(callback) {

    var movies = [];

    // Gets all the movies form the database
    Movie.find().cursor()
            .on('data', function(doc) { console.log(doc.title); movies.push(doc);})
            .on('err', function() {return callback(err,null);})
            .on('end', function() { console.log('Done!'); return callback(null,movies);});
}

function addComments(title, comment, callback) {
    // add the date in
    comment.date = new Date;
    var movie;

    // finds the movie accodring to the title
    // then saves the comment to the database after retreiving it
    Movie.find({"title": new RegExp('^' + title+'$', 'i')})
        .cursor()
        .on('data', function(doc){movie = doc})
        .on('err', function() {return callback(err);})
        .on('end', function() {
            if(comment.isReply) {
                var reply = {};
                reply.username = comment.username;
                reply.comment = comment.comment;
                reply.date = comment.date;
                console.log('reply: '+ JSON.stringify(reply));
                for(var i=0; i<movie.comments.length; i++) {
                    if(movie.comments[i]._id == comment.commentId) {
                        movie.comments[i].replies.push(reply);
                    }
                }
                movie.save();
                return callback(null);
            } else {
                movie.comments.push(comment);
                movie.save();
                return callback(null);
            }
        });
}

function addUser (data, callback) {
    var newUser = new User();
    newUser.username = data.username;
    newUser.password = data.password;
    newUser.save(function(err) {
        console.log("new user: "+ newUser);
        return callback(err, newUser);
    });
}

function findUser (loginUser, callback) {
    var user;
    User.findOne({'username' : new RegExp('^' + loginUser.username+'$', 'i')})
        .cursor()
        .on('data', function(data) {user = data})
        .on('err', function() { return callback(err, null) })
        .on('end', function()
                    {   if( user == null ) {
                            return callback(null, null);
                        }
                        if(user.username == loginUser.username && loginUser.password == user.password) {
                            return callback(null, user);
                        } else {
                            return callback(null, null);
                        }
                    });
}

module.exports = {
    startDb: startDb,
    addMovie: addMovie,
    getMovie:getMovie,
    getMovieV2:getMovieV2,
    addComments:addComments,
    getAllMovies : getAllMovies,
    addUser: addUser,
    findUser:findUser
};
