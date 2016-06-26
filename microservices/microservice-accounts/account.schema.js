var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }
});

exports = module.exports = mongoose.model('Account', AccountSchema);
