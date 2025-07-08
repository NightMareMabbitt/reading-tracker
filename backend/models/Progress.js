const mongoose = require('mongoose');
const Book = require('./Book');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, 
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  progress: {
    type: Number,
    required: true,
    min: 0, 
    max: 100, // Progress in percentage (0-100)
  },
  pagesRead: {
    type: Number,
    default: 0,
  }, 
  completed: {
    type: Boolean,
    default: false, // True is the book is completed
  },
  updatedAt: {
    type: Date,
    default: Date.now, 
  },

});
const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;


