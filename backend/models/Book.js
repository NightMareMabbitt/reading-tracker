const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type:String, required: true},
  author: {type: String, required: true},
  progress: {type: Number, default: 0}, // Save progress in percentage
  shelf: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelf', required: true}, //Reference to Shelf model
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, //Reference to User model
});

module.exports = mongoose.model('Book', bookSchema);
