var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/js')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);



// app.get('/db', function(req, res, next) {
//     // starts db instanse
//     db.startDb(function (err) {
//         if(err) {
//             console.log(err)
//             return next(err);
//         }
//
//         var movieArr = [];
//         var id = ['tt0435761', 'tt0120363', 'tt0114709', 'tt1049413'];
//         request('http://www.omdbapi.com/?t=toy+story+3&y=&plot=short&r=json', function(error, response, data) {
//             if (error || response.statusCode != 200) {
//                 console.log(error);
//                 return;
//             }
//
//             var movie = {};
//             console.log("Body: "+data);
//             var body = JSON.parse(data);
//             console.log("TITLE: "+body.Title);
//             movie.title = body.Title;
//             movie.year = body.Year;
//             movie.rating = body.Rating;
//             movie.releaseDate = body.ReleaseDate;
//             movie.runTime = body.RunTime;
//             movie.genre = body.Genre;
//             movie.director = body.Director;
//             movie.writter = body.Writter;
//             movie.actors = body.Actors;
//             movie.plot = body.Plot;
//             movie.poster = body.Poster;
//             movie.imdbID = body.imdbID;
//             movie.imdbRating = body.imdbRating;
//
//             movieArr.push(movie);
//             console.log(movie); // Print the google web page.
//
//             db.addMovie(movie, function(err, savedMovie) {
//                 if (err) {
//                     console.log("error: " + err);
//                 }
//                 console.log("in app: " + JSON.stringify(savedMovie));
//
//                 res.send(savedMovie);
//                 res.redirect('/movies');
//             });
//         });
//     });
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
