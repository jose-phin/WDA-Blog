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

    //initialise the database connection
    var result = database.startDb();

    //handle the promise results
    result.onFulfill(function (status) {
        console.log(status);
        database.addMovie(req.body).then(
            //if everything was ok
            function() {
                res.send("Write to database OK");
            },
            //else, if there was an error
            function(err) {
                res.status(400);
                res.send(err.message);
            }
        )
    });
    result.onReject(function (status) {
        console.error(status);
        res.status(500);
        res.send(status);
    });

});
module.exports = router;
