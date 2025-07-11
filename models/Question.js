const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  stream: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Question', questionSchema);
