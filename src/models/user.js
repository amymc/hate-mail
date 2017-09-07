const mongoose = require('mongoose');

// set up a mongoose model
module.exports = mongoose.model('User', new mongoose.Schema({ 
  name: String, 
  password: String, 
  admin: Boolean 
}));