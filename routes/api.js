const router = require('express').Router();
const _ = require('nimble');
const Categories = require('../models/Categories');
const Advertsing = require('../models/Advertsing');
const Details = require('../models/Details');
const Fragments = require('../models/Fragments');

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

// 增加路由 删除路由 修改路由 查找路由 分类管理
let path_cate = '/api/categories/';

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
  let tmp = extract(req.query, ['name', 'parent', '_id']);
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


// 获取所有碎片 删除碎片 修改碎片 添加碎片
let path_frags = '/api/frags/';

router.get(path_frags +'getFrags', function(req, res) {
  let tmp = extract(req.query, ['applied', 'type', 'name', '_id']);

  let query = {condi: tmp, opt: {}};
  Fragments.find(query.condi).populate('applied', 'name keywords').exec(function(err, frags) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: frags});
  });
});

router.post(path_frags +'delFrag', function(req, res) {
  let ids = req.body.ids;
  Fragments.remove({_id: {$in: ids}}, function(err, doc) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  })
});

router.post(path_frags +'updateFrag', function(req, res) {
  let id = req.body.id;
  let fields = extract(req.body, ['name', 'content', 'type', 'applied']);
  Fragments.findByIdAndUpdate(id, fields, function(err, doc) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  });
});

router.post(path_frags +'addFrag', function(req, res) {
  let field = extract(req.body, ['name', 'content', 'type', 'applied']);
  let frags = new Fragments(field);
  frags.save(function(err, doc) {
    if(err) {
      res.json({code: 10, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  });
});

// 广告相关接口 
let path_adver = '/api/adver/';

router.get(path_adver +'getAdvers', function(req, res) {
  let condi = extract(req.query, ['name', 'type', 'state', '_id']);
  Advertsing.find(condi, function(err, advers) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: advers});
  });
});

router.post(path_adver +'delAdver', function(req, res) {
  let ids = req.body.ids;
  Advertsing.remove({_id: {$in: ids}}, function(err, doc) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  })
});

router.post(path_adver +'updateAdver', function(req, res) {
  let id = req.body.id;
  let fields = extract(req.body, ['name', 'target', 'state', 'type', 'link', 'title', 'alt']);
  let sImg = req.body.sImg;
  
  if(sImg.charAt(0) == '[' && sImg.charAt(sImg.length-1) == ']') {
    sImg = JSON.parse(sImg);
    fields.sImg = _.map(sImg, function(v) {
      return extract(v, ['img', 'link', 'alt']);
    });
  }else {
    fields.sImg = sImg;
  };

  Advertsing.findByIdAndUpdate(id, fields, function(err, doc) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  });
});

router.post(path_adver +'addAdver', function(req, res) {
  let fields = extract(req.body, ['name', 'target', 'state', 'type', 'link', 'title', 'alt']);
  let sImg = req.body.sImg;
  if(sImg.charAt(0) == '[' && sImg.charAt(sImg.length-1) == ']') {
    sImg = JSON.parse(sImg);
    fields.sImg = _.map(sImg, function(v) {
      return extract(v, ['img', 'link', 'alt']);
    });
  }else {
    fields.sImg = sImg;
  };

  let adver = new Advertsing(fields);
  adver.save(function(err, doc) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  })
});

let path_article = '/api/article/';

router.get(path_article +'getArticles', function(req, res) {
  let query = extract(req.query, ['_id', 'title', 'tags', 'keywords', 'state', 'author', 'original']);
  if(query.tags) {
    query.tags = {$in: query.tags.split(',')} 
  }
  if(query.keywords) {
    query.keywords =  {$in: query.keywords.split(',')};
  }
  Details.find(query).populate('from', '_id name keywords').exec(function(err, articles) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: articles});
  });
});

router.post(path_article +'delArticle', function(req, res) {
  let ids = req.body.ids;
  Details.remove({_id: {$in: ids}}, function(err, doc) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  });
});

router.post(path_article +'updateArticle', function(req, res) {
  let id = req.body.id;
  let fields = extract(req.body, ['title', 'stitle', 'from', 'tags', 'keywords', 'img', 'description', 'author', 'state', 'original', 'source', 'content', 'comments']);

  fields.keywords = fields.keywords && fields.keywords.split(',');
  fields.tags = fields.tags && fields.tags.split(',');

  Details.findByIdAndUpdate(id, fields, function(err, doc) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  });
});

router.post(path_article +'addArticle', function(req, res) {
  let fields = extract(req.body, ['title', 'stitle', 'from', 'tags', 'keywords', 'img', 'description', 'author', 'state', 'original', 'source', 'content', 'comments']);

  fields.keywords = fields.keywords && fields.keywords.split(',');
  fields.tag = fields.tag && fields.tag.split(',');

  let article = new Details(fields);
  article.save(function(err, doc) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    res.json({code: 10, info: []});
  });
});


module.exports = router;