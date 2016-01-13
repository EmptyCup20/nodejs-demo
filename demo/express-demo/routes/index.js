var express = require('express'),
    router = express.Router(),
    app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* nodejs的websocket 测试 */
router.get('/socket', function(req, res, next) {
    res.render('firstsocket', null);
});

module.exports = router;
