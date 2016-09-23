var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'xXSepHiROthxxNarUT0Xx Movies' });
});

module.exports = router;
