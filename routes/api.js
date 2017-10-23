const router = require('express').Router();
const _ = require('nimble');
const Categories = require('../models/Categories');
const Advertsing = require('../models/Advertsing');
const Details = require('../models/Details');
const Fragments = require('../models/Fragments');
// 分类管理
let path_cate = '/api/categories/';

// 判断输入合法
function isValid(val) {
  return (val == '' || val == undefined || val == null ||/^[ ]+$/.test(val)) ? false : true;
}

// 提取指定参数
function extract(obj, keys) {
  let tmp = {}; // 对obj遍历 以防obj为空
  _.each(obj, function(val, key) {
    if(keys.indexOf(key) !== -1 && isValid(val)) {
      tmp[key] = val;
    }
  });
  return tmp;
}

// 图片上传
router.post('/api/uploadImg', function(req, res) {
  let files = _.map(req.files, function(f) {
    return f.path.replace('public', '');
  });
  res.json({code: 10, info: files});
});

// 增加路由 删除路由 修改路由 查找路由
router.post(path_cate +'addCategory', function(req, res) {
  let type = req.body.type;
  if(!type) res.json({code: 11, info: 'category no type!'});
  let query = extract(req.body, ['name', 'pid', 'keywords', 'title', 'order', 'image', 'comments', 'description']);

  Categories.createPath(type, query, res, function(msg, info) {
    res.json({code: 10, info: []});
  });
});

router.post(path_cate +'delCategory', function(req, res) {
  let ids = req.body.ids;
  Categories.remove({_id: {$in: ids}}, function(err, docs) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  });
});

router.post(path_cate +'updateCategory', function(req, res) {
  let id = req.body.id;
  let fields = extract(req.body, ['name', 'pid', 'keywords', 'title', 'order', 'image', 'comments', 'description']);
  // 增加path
  if(fields.pid){
    let cache = res.locals.cache;
    let path = cache.get(cache.get(fields.pid)).path;
    fields.path = path +'/'+ fields.name;
  }

  Categories.findByIdAndUpdate(id, fields, function(err, docs) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  })
});

router.get(path_cate +'getCategory', function(req, res) {
  let tmp = extract(req.query, ['name', 'parent']);
  // parent转为pid
  if(tmp.parent) {
    tmp.pid = res.locals.cache.get(tmp.parent)._id;
    delete tmp.parent;
  }

  let query = {condi: tmp, opt: {sort: -1}};
  Categories.getCategory(query, res, function(docs) {
    // 返回数据加入 parent 字段
    _.each(docs, function(v) {
      v._doc.parent = res.locals.cache.get(v.pid);
    });
    res.json({code: 10, info: docs});
  });
});


// 
module.exports = router;