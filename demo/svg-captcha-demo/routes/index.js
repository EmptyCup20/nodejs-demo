var express = require('express');
var router = express.Router();
var svgCaptcha =  require('svg-captcha'); //验证码


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* GET SVG */
router.get('/svg', function(req, res, next) {
    var text = svgCaptcha.randomText();
    var example = svgCaptcha({width:100,height:40,noiseLv:30,text:text});
    console.log(text);
    var captcha = svgCaptcha(text);
    //req.session.captcha = text;
    res.set('Content-Type', 'image/svg+xml');
    res.status(200).send(example);
});


module.exports = router;
