var express = require('express');
var router = express.Router();
var images = require('images');
var ccap = require('ccap')({
	//设置验证码图片宽度,默认为256
	width:120, 
	//设置验证码图片高度,默认为60
    height:38, 
	//设置验证码数字间隔,默认为40
    offset:25, 
	//设置验证码图片质量,默认为50
    quality:50, 
	//设置验证码数字大小,默认为56
    fontsize: 30,

});

var captchaData,captchaText,captchaBuffer

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/getCaptcha',function(req,res){
	//获取验证码数据(数组形式)
	captchaData = ccap.get();
	//验证码的文字部分
	captchaText = captchaData[0];
	//验证码数据流
	captchaBuffer = captchaData[1];
	console.log(captchaText);
	res.send(captchaBuffer);
});

router.get('/verfiy',function(req,res){
	var query = req.query,
		code = true;
		//验证输入的验证码
	if(captchaText == query.captcha.toUpperCase()){
		res.send(code)
	}else{
		res.send(!code)
	}
})

module.exports = router;