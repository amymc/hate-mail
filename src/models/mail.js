const mongoose = require('mongoose');
// mongoose.promise = global.Promise;
// const slug = require('slugs');

const mailSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  recipient: {
    type: String,
    trim: true
  },
  sender: {
    type: String,
    trim: true
  },
  bodyText: {
    type: String,
    trim: true
  }
  
});

// storeSchema.pre('save', function(next) {
//   if(!this.isModified('name')) {
//     return next();
//   }
//   this.slug = slug(this.name);
//   next();
// });

module.exports  = mongoose.model('Mail', mailSchema);