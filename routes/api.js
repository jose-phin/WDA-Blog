var express = require('express');
var router = express.Router();
var database = require('../database/databaseHandler');

/* POST api page. */
router.post('/', function(req, res) {
    res.json({"test": "arinocuppachino"});
});

/**
 * POST api, write new movie to mLab database
 */
router.post('/movie', function(req, res) {

    database.addMovie(req.body).then(
        //if everything was ok
        function() {
            res.send({"success": true});
        },
        //else, if there was an error
        function(err) {
            res.status(400);
            res.send({"success": false, "message": err.message});
        }
    );
});

/**
 * GET api movie, read entry from the database by movie title
 */
router.get('/movie/:title', function(req, res) {

    database.getMovie(req.params.title).then(
        //if everything was ok
        function(results) {
            res.send({"success": true, movies: results});
        },
        //else, if there was an error
        function(err) {
            res.status(400);
            res.send({"success": false, "message": err.message});
        }
    );
});

module.exports = router;
