var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express1' });
  res.redirect('/catalog');
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express1' });
});

module.exports = router;
