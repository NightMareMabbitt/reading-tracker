const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
  name: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},  // Refernece to Userm model
});

module.exports = mongoose.model('Shelf', shelfSchema);
