/**
 * Created by xxholly32 on 2016/6/5.
 */
//https://github.com/leizongmin/js-xss/blob/master/README.zh.md
var xss = require('xss');
var options = {
    whiteList: {
        a: ['href', 'title', 'target']
    }
};
var myxss = new xss.FilterXSS(options);
// 以后直接调用 myxss.process() 来处理即可
var html = myxss.process('<script>alert("xss");</script>');
console.log(html);
var html = myxss.process('<div>xxxx</div>');
console.log(html);
var html = myxss.process('<a href="xxx">xxxx</a>');
console.log(html);