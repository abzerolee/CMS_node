const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SystemSchema = new Schema({
  type: Number, // 1 登录 0 登出
  logs: String,
}, {timestamps: true});

module.exports = mongoose.model('SystemLog', SystemSchema);