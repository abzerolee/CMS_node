const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  name: {type: String, default: 'guest'},
  loginName: String,
  password: String,
  email: String,
  isAdmin: {type: Boolean, default: false}

}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);