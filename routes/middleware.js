const Categories = require('../models/Categories');
const Advertsing = require('../models/Advertsing');
const Details = require('../models/Details');
const Cache = require('memory-cache').Cache;

let cache = new Cache();

// 初始化数据库
exports.initData = function() {
	// do some test
}

// 初始化标准的视图locals。
exports.initLocals = function(req, res, next) {
	Categories.find(function(err, docs) {
		if(err) res.err(err, err.message);
		docs.forEach(function(v) {
			cache.put(v.name, v);
		});
		docs.forEach(function(v) {
			cache.put(v._id, v.name);
		})
		res.locals.cache = cache;
		res.locals.user = req.user;
		next();
	});
}

// 初始化错误处理函数到`res`中
exports.initErrorHandlers = function(req, res, next) {
  res.err = function(err, message) {
		res.status(500).render('errors/500', {
				errorMsg: message,
		});
  }
  res.notfound = function(title, message) {
		res.status(404).render('errors/404', {
				errorMsg: message,
		});
  }
  next();
};

// 路由缓存
exports.cache = cache.get('nav');