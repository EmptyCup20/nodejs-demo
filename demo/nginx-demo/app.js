/**
 * Created by xiangxiao3 on 2016/6/30.
 */
var express = require('express')
    , router = express.Router()
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , http = require('http')
    , path = require('path')
    , session = require("express-session")
    , ejs = require('ejs');

var app = express();

//设置默认端口, 启动views
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "nginx"
}));

router.get('/', function(req, res, next) {
    req.session.ip = "10.25.20.35";
    req.session.port = "3000";
    res.render('index', {
        title: 'Express',
        ip : "10.25.20.35",
        sessionId : req.session.id
    });
});

router.post('/mypost', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//server 服务
var server = http.createServer(app);
//启动server
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});