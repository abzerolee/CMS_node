const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IndexIds = require('./IndexIds');

let indexId = new IndexIds({_id: 'adverId'});

const AdvertisingSchema = new Schema({

  name:  String,
  type: {type: Number, default: 0}, // 展示形式 0 单个 1 多个
  state: {type: Boolean, default: true}, // 是否展示
  title: String,
  link: String,
  target: {type : String, default : '_blank'},
  sImg: Schema.Types.Mixed,
  alt: String,
  adverId: Number,
  applied: {type: String, default: 'public'}, // 应用于哪个路由 与 Category.name对应
  
}, {timestamps: true});

AdvertisingSchema.pre('save', function(next) {
  let doc = this;
  IndexIds.findByIdAndUpdate({_id: 'adverId'}, {$inc: {id: 1}}, {new: true, upsert: true})
    .then(function(indexId) {
      doc.adverId = indexId.id;
      next();
    })
    .catch(function(err) {
      next(err);
    })
});

module.exports = mongoose.model('Advertising', AdvertisingSchema);