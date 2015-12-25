var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET firstsocket page. */
router.get('/firstsocket', function(req, res, next) {
  res.render('firstsocket', null);
});

module.exports = router;
