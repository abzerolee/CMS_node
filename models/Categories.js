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

CategoriesSchema.statics.createPath = function(type, fields, cb) {
  if(!type) throw new Error('methods need a type');
  if(typeof type === 'number') {
    funs[type-1].call(this, fields, cb);
  }
}

const Categories = mongoose.model('Categories', CategoriesSchema);

// 父级路由创建
function createRootPath(fields, cb) {
  fields.path = '/web/' + fields.name;
  let category_root = new Categories(fields);
  category_root.save(function(err, doc) {
    if(err) return console.error(err);
    if(typeof cb === 'function'){
      cb.call(null, doc);
    }
  })
}

// 子级路由创建
function createChildrenPath(fields, cb) {
  this.find({'_id': fields.pid}, 'path', function(err, doc) {
    if(err) return console.error(err);
    fields.path = doc[0].path +'/'+ fields.name;
    let category_child = new Categories(fields);
    category_child.save(function(err, doc) {
      return console.error(err);
      if(typeof cb === 'function') {
        cb.call(null, doc);
      }
    })
  });
}

module.exports = Categories;