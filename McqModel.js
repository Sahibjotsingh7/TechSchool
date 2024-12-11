// McqModel.js

const mongoose = require('mongoose');

// Define the MCQ Schema
const mcqSchema = new mongoose.Schema({
  ques: {
    type: String,
    required: true,
  },
  aoptions: {
    type: [String],  
    required: true,
  },
  ans: {
    type: String,     
    required: true,
  },
  explanation: {
    type: String,     
    required: true,
  }
});

module.exports = mcqSchema; 
