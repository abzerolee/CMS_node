const Categories = require('../models/Categories');
const Advertsing = require('../models/Advertsing');

const Cache = require('memory-cache').Cache;

let cache = new Cache();
// 提取nav 导航
// Categories.find({pid: null}, function(err, docs){
// 	if(err) throw err;
//   nav = docs.sort(function(x, y) {
// 		return y.order - x.order;
// 	});
// });
// 定义本地缓存 方便路由处理

// 初始化数据库
exports.initData = function() {
	// do some test
	
}

// 初始化标准的视图locals。
exports.initLocals = function(req, res, next) {
	Categories.find(function(err, docs) {
		if(err) throw err;
		docs.forEach(function(v) {
			cache.put(v.name, v);
		});
		res.locals.cache = cache;
		res.locals.user = req.user;
		next();
	});
}

// 初始化错误处理函数到`res`中
exports.initErrorHandlers = function(req, res, next) {
  res.err = function(err, title, message) {
		res.status(500).render('errors/500', {
				errorTitle: title,
				errorMsg: message
		});
  }
  res.notfound = function(title, message) {
		res.status(404).render('errors/404', {
				errorTitle: title,
				errorMsg: message
		});
  }
  next();
};

// 路由缓存
exports.cache = cache.get('nav');