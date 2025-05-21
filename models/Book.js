const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    text: true,
  },
  author: {
    type: String,
    required: true,
    text: true,
  },
  genre: {
    type: String,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Book', bookSchema);