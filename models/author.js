const mongoose = require('mongoose');
const Book = require('./book');
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
authorSchema.pre('remove', function (next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      // Prevents us from removing somethign and passes the
      // error unto the next function
      next(err);
    } else if (books.length > 0) {
      next(new Error('this author has books still'));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model('Author', authorSchema);
