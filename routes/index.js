var express = require('express');
var router = express.Router();
var database = require('../database/databaseHandler');

/* GET home page. */
router.get('/', function(req, res) {
  database.getAllMovies(function(err, results) {
    if(err) {
      res.status(400);
      return res.send({"success": false, "message": err.message});
    }
    res.render('index', { title: 'blabla', movies:results, username: req.session.username});
  });
});

router.get('/login', function(req, res) {
  var warningMessage;
  if ( req.query.error) {
    warningMessage = "You have entered the wrong password or username";
  }
  res.render('login', {warningMessage: warningMessage});
});


router.post('/createAccount', function(req, res) {
  var newUser = req.body;
  database.addUser( newUser, function(err, user) {
    if (err) {
      res.status(400);
      return res.send({"success": false, "message": err.message});
    }
    console.log("USE:" +JSON.stringify(user));
    req.session.username = user.username;
    return res.redirect('/');
  });
});

router.post('/login', function(req, res) {
  var loginUser = req.body;
  database.findUser(loginUser, function(err, user) {
    if (err) {
      res.status(400);
      return res.send({"success": false, "message": err.message});
    }
    if(user == null) {
      return res.redirect('/login?error=true');
    }
    req.session.username = user.username;
    return res.redirect('/');
  });
});

router.get('/logout', function(req, res) {
  req.session.username = null;
  res.redirect('/login');
});

router.get('/:title', function(req, res) {
    database.getMovieV2(req.params.title, function(err,movie) {
      if(err) {
        res.status(400);
        return res.send({"success": false, "message": err.message});
      }

      let isNotLoggedIn = false;

      if(!req.session.username) {
        isNotLoggedIn = true;
      }
      return res.render('movie',{movie:movie,username:req.session.username, isNotLoggedIn: isNotLoggedIn});
    });
});

router.post('/:title', function(req, res) {
  var comment = req.body;
  comment.username = req.session.username;
  database.addComments(req.params.title, comment, function(err) {
    if(err) {
      res.status(400);
      return res.send({"success": false, "message": err.message});
    }
    return res.redirect('/'+req.params.title);
  });
});

module.exports = router;
