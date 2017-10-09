const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IndexIdSchema = new Schema({
  _id: {type: String},
  id: {type: Number, default: 1}
});

const indexId = mongoose.model('indexId', IndexIdSchema);

module.exports = indexId;