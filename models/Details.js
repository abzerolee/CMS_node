const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetailsSchema = new Schema({

  title: String,
  stitle: String,
  from: {type: Schema.Types.ObjectId, ref: 'Categories'},
  tags: String,
  keywords: String,
  img: String,
  description: String,
  author: String,
  state: {type: Boolean, default: true},
  browse: {type: Number, default: 0},
  original: {type: Boolean, default: true},
  source: String,
  content: String,
  comments: String
  
}, {timestamps: true});

DetailsSchema.statics.getCategory = function(title, res, cb) {
  Detail.find({title: title}).populate('from', 'name').exec(function(err, doc) { 
    if(err) {
      res.json({code: 11, info: err.message});
      return;
    }
    cb.call(null, doc);
  })
}

const Detail = mongoose.model('Detail', DetailsSchema);

module.exports = Detail;