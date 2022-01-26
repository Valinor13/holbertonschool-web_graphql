const mongoose = require('mongoose');
const { Schema } = mongoose;

// Class object that communicates with mongodb database
const taskScheme = new mongoose.Schema({
    project: String,
    title: String,
    weight: Number,
    description: String
 })

 module.exports = mongoose.model("task", taskScheme);
 