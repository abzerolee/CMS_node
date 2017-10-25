const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IndexIds = require('./IndexIds');

let indexId = new IndexIds({_id: 'fragId'});

const FragmentSchema = new Schema({
  name: String, // 碎片名称
  fragId: {type: Number},
  type: {type: Number, default: 0}, // 碎片类型 0 为图片 1 为文字
  applied: {type: Schema.Types.ObjectId, ref: 'Categories'}, // 应用于哪个路由 与 Category.name对应
  content: Schema.Types.Mixed,
}, {timestamps: true});

FragmentSchema.pre('save', function(next) {
  let doc = this;
  IndexIds.findByIdAndUpdate({_id: 'fragId'}, {$inc: {id: 1}}, {new: true, upsert: true})
    .then(function(indexId) {
      doc.fragId = indexId.id;
      next();
    })
    .catch(function(err) {
      console.error(err);
    })
});

const Fragments = mongoose.model('Fragments', FragmentSchema);

module.exports = Fragments;