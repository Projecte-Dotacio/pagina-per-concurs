const mongoose = require('mongoose');

const sentenceSchema = new mongoose.Schema({
  sentence: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  explanation: {
    type: String,
    required: false 
  }
});

const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = Sentence;
