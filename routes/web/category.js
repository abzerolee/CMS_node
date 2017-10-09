const Categories = require('../../models/Categories');
const Advertsing = require('../../models/Advertsing');
const Fragments = require('../../models/Fragments');
const nim = require('nimble');

function findAdverts(params, data, cb) {
  Advertsing.find({applied: params}, function(err, docs) {
    if(err) throw err;
    docs.forEach(function(v) {
      data.advers[v.adverId] = v;
    });
    cb();
  });
}

function findFrag(params, data, cb) {
  Fragments.find({applied: params}, function(err, frags) {
    if(err) throw err;
    frags.forEach(function(v) {
      data.frags[v.fragId] = v;
    })
    cb();
  });
}

function findCategory(category, data, cb) {
  Categories.find({pid: category._id}, function(err, docs) {
    if(err) throw err;
    let arr = docs.map(function(v) {
      return {title: v.keywords, description: v.description, image: v.image, link: v.path}
    })
    data.section = arr;
    cb();
  })
}

module.exports = function(req, res) {
  let params = req.params.category;
  let cache = res.locals.cache;
  let locals = res.locals;
  let nav = cache.keys();
  let data = {}, SINGLE = 0, MUTI = 1;

  // 是否存在请求路由
  if(nav.indexOf(params) === -1) {
    res.notFound();
    return;
  }

  let category = cache.get(params);
  data.title = category.title;
  data.advers = {};
  data.frags = {};
  data.section = [];

  nim.parallel([
    function(cb) {
      findAdverts(params, data, cb);
    },
    function(cb) {
      findFrag(params, data, cb);
    },
    function(cb) {
      findCategory(category, data, cb);
    }
  ], function() {
    res.render(params, data, function(err, html){
      if(err) return console.error(err);
      res.send(html);
    });
  });
}