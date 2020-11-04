const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  foldername: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    index: { unique: true } 
  },
  owner: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    index: { unique: true } 
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
folderSchema.index({
  foldername: 1,
  owner: 1,
}, {
  unique: true,
});
module.exports = mongoose.model("Folder", folderSchema);