const Categories = require('../../models/Categories');
const Advertsing = require('../../models/Advertsing');
const Fragments = require('../../models/Fragments');
const Details = require('../../models/Details');
const nim = require('nimble');

function findAdvers(subitem, data, cb) {
  Advertsing.find({applied: {$in: [subitem, 'public']}}, function(err, docs) {
    if(err) throw err;
    docs.forEach(function(v) {
      data.advers[v.adverId] = v;
    });
    cb();
  });
}

function findFrags(subitem, data, cb) {
  Fragments.find({applied: {$in: [subitem, 'public']}}, function(err, docs) {
    if(err) throw err;
    docs.forEach(function(v) {
      data.frags[v.fragId] = v;
    });
    cb();
  });
}

function findSubitem(cate, data, cb) {
  Categories.find({pid: cate.pid}, function(err, subitems) {
    if(err) throw err;
    let subnav = subitems.map(function(v) {
      return {keywords: v.keywords, link: v.path, active: cate.name === v.name ? true : false};
    });
    data.subnav = subnav;
    Details.findOne({categoryId: cate._id}, function(err, section) {
      if(err) throw err;
      data.section = section;
      cb();
    });
  });
}

module.exports = function(req, res) {
  let category = req.params.category;
  let subitem = req.params.subitem;
  let cache = res.locals.cache;
  let nav = cache.keys();
  let data = {};

  if(nav.indexOf(category) === -1 || nav.indexOf(subitem) === -1) {
    res.notfound();
    return;
  };

  let cate = cache.get(subitem);
  if(!cate) {
    res.notfound();
    return;
  }

  data.title = cate && cate.title;
  data.section = {};
  data.advers = {};
  data.frags = {};

  nim.parallel([
    function(cb) {
      findAdvers(subitem, data, cb);
    },
    function(cb) {
      findFrags(subitem, data, cb);
    },
    function(cb) {
      findSubitem(cate, data, cb);
    }
  ], function() {
    res.render('web/'+ category +'_detail', data, function(err, html){
      if(err) throw new Error(err.message);
      res.send(html);
    });
  })
}