const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({

  pid: {type: Schema.Types.ObjectId}, // 父级_id 根级则为'0'
  name: String, // 路由名称 
  keywords: String, // 导航显示文本
  title: String, // 页面标题 
  order: {type: Number, default: 0}, // 导航排序
  path: {type: String, default: '0'}, // 父级路由
  image: {type: String},
  comments: String, // 备注
  description: String, // 简介
  
}, {timestamps: true});


const funs = [createRootPath, createChildrenPath];

CategoriesSchema.statics = {
  createPath: function(type, fields, res, cb) {
    let self = this;
    let cache = res.locals.cache;
    Categories.find({name: fields.name}, {_id: 1, name: 1}, function(err, doc) {
      if(err) {
        res.json({code: 11, info: err.message})
        return;
      }
      if(fields.name === '__list' && fields.pid) {
        fields.name = '__list_'+ cache.get(fields.pid);
      }
      if(doc.length !== 0) {
        cb.call(null, false, 'name repeats');
        return;
      }
      funs[type-1].call(self, fields, res, cb);
    });    
  },
  getCategory: function(query, res, cb) {
    Categories.find(query.condi, {createdAt: 0, updatedAt: 0, __v: 0}, {sort: [{'order': query.opt.sort}]},
      function(err, cates){
        if(err) {
          res.json({code: 11, info: err.message});
          return;
        }
        cb.call(null, cates);
      });
  }
}

const Categories = mongoose.model('Categories', CategoriesSchema);

// 父级路由创建
function createRootPath(fields, res, cb) {
  fields.path = '/web/' + fields.name;
  let category_root = new Categories(fields);
  category_root.save(function(err, doc) {
    if(err){
      res.json({code: 11, info: err.message});
      return;
    } 
    cb.call(null, true);
  })
}

// 子级路由创建
function createChildrenPath(fields, res, cb) {
  this.find({'_id': fields.pid}, 'path', function(err, doc) {
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    fields.path = doc[0].path +'/'+ fields.name;
    let category_child = new Categories(fields);
    category_child.save(function(err, doc) {
      if(err) {
        res.json({code: 11, info: err.message});
        return;
      } 
      cb.call(null, true);
    })
  });
}

module.exports = Categories;