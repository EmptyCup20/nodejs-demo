var express = require('express'),
    router = express.Router(),
    http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET firstsocket page. */
router.get('/firstsocket', function(req, res, next) {
  res.render('firstsocket', null);
});

/* GET firstsocket page. */
router.get('/firsthttp', function(req, res, next) {
  res.render('firsthttp', null);
});

module.exports = router;
