const router = require('express').Router();
const _ = require('nimble');
const Categories = require('../models/Categories');
const Advertsing = require('../models/Advertsing');
const Details = require('../models/Details');
const Fragments = require('../models/Fragments');
// 分类管理
let path_cate = '/api/categories/';

// 提取指定参数
function extract(obj, keys) {
  let tmp = {}; // 对obj遍历 以防obj为空
  _.each(obj, function(val, key) {
    if(keys.indexOf(keys) === -1) {
      tmp[key] = val;
    }
  });
  return tmp;
}

router.post(path_cate +'addCategory', function(req, res) {
  let param = req.body;
  let type = param.type;
  Categories.createPath(type, param, res, function(msg, info) {
    res.json({code: msg ? 10 : 11, info: info});
  });
});

router.post(path_cate +'delCategory', function(req, res) {
  let ids = req.body.ids;
  Categories.remove({_id: {$all: ids}}, function(err, docs) {
    if(err) {
      res.json({code: 11, info: err.message});
    }
    res.json({code: 10, info: []});
  });
});

router.post(path_cate +'updateCategory', function(req, res) {
  let id = req.body.id;
  delete req.body.id;
  let fields = req.body;
  Categories.findOneAndUpdate({_id: id}, fields, function(err, docs) {
    if(err) res.json({code: 11, info: err.message});
    res.json({code: 10, info: []});
  })
});

router.get(path_cate +'getCategory', function(req, res) {
  let query = {
    condi: extract(req.body, ['name', '_id', 'pid', 'parent']),
    obt: {
      sort: req.query.sort || -1
    } 
  };
  Categories.getCategory(query, res, function(docs) {
    let cache = {};
    _.each(docs, function(v) {
      cache[v._id] = v.name;
    });
    docs = _.map(docs, function(v) {
      v._doc.parent = v.pid ? cache[v.pid] : null ;
      return v;
    });
    res.json({code: 10, info: docs});
  });
});

module.exports = router;