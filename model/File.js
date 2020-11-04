const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    
  },
  owner: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  content: {
    type: String,
    required: true,
  },
  filepath:{
    type:String,
    required:true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
fileSchema.index({
  filename: 1,
  owner: 1,
}, {
  unique: true,
});
module.exports = mongoose.model("File", fileSchema);