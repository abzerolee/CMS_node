const http = require('http');
const path = require('path');
const express = require('express'); 
const mongoose = require('mongoose'); // 数据库操作模型
const swig = require('swig-templates'); // 模板引擎
const morgan = require('morgan'); // 日志记录中间件
const settings = require("./models/db/settings"); // 站点配置信息
const app = express();

// 连接数据库
const db = mongoose.connect(settings.URL, {useMongoClient: true}, function(err) {
  if(err) throw err;
  console.log('********************************************\n');
  console.log('the mongodb is running at '+ settings.URL +'\n');
  console.log('********************************************');
});

// 模板引擎配置
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// 后台日志配置
app.use(morgan('short', {stream: process.stdout}));

// 静态资源配置
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', 3000);

// 路由配置
const routes = require('./routes');
app.use(routes);

// 统一处理路由未定义的404 500
app.use(function(req, res, next) {
  let err = new Error('NOT FOUND');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  let status = err.status || 500;
  res.status(status).render('errors/'+ status);
});

// 启动服务
const server = http.createServer(app);
server.listen(3000, function() {
  console.log('---------------------------------------\n');
  console.log('the server is running at localhost:3000\n');
  console.log('---------------------------------------');
});