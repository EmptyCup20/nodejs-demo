var express = require('express');
var router = express.Router();

/* GET firstsocket page. */
router.get('/firstsocket', function(req, res, next) {
    res.render('firstsocket', null);
});

module.exports = router;
