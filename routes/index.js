var express = require('express');
var router = express.Router();
var database = require('../database/databaseHandler')
/* GET home page. */
router.get('/', function(req, res) {
  database.getAllMovies(function(err, results) {
    if(err) {
      res.status(400);
      return res.send({"success": false, "message": err.message});
    }
    console.log("in here results");
      res.render('index', { title: 'Mavericks Inc. Blog', movies:results});
  });

});

router.get('/:title', function(req, res) {
    database.getMovieV2(req.params.title, function(err,movie) {
      if(err) {
        res.status(400);
        return res.send({"success": false, "message": err.message});
      }
      return res.render('movie',{movie:movie, title: "blbalabl"});
    });
});

router.post('/:title', function(req, res) {
  var comment = req.body;
  database.addComments(req.params.title, comment, function(err) {
    if(err) {
      res.status(400);
      return res.send({"success": false, "message": err.message});
    }

    return res.redirect('/'+req.params.title);

  });
});

module.exports = router;
