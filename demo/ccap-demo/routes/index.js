var express = require('express');
var router = express.Router();
var images = require('images');
var ccap = require('ccap')({
	width:120, //set width,default is 256

    height:38, //set height,default is 60

    offset:25, //set text spacing,default is 40

    quality:50, //set pic quality,default is 50

    fontsize: 30,

});
var captchaData,captchaText,captchaBuffer
router.get('/', function(req, res) {
	res.render('index');
});

router.get('/getCaptcha',function(req,res){
	captchaData = ccap.get();
	captchaText = captchaData[0];
	captchaBuffer = captchaData[1];
	console.log(captchaText);
	res.send(captchaBuffer);
});

router.get('/verfiy',function(req,res){
	var query = req.query,
		code = true;
	if(captchaText == query.captcha.toUpperCase()){
		res.send(code)
	}else{
		res.send(!code)
	}
})

module.exports = router;