const router = require("express").Router();
const User = require("../model/User");
const File = require("../model/File");
const Folder = require("../model/Folder");

router.get('/',async(req,res)=>{
  console.log({owner:req.user})
  const files = await File.find({owner:req.user.id,filepath:"/"},{'_id': 0,'__v':0});
  const folders = await Folder.find({owner:req.user.id}, {'_id': 0,'__v':0})
  res.json({files,folders})
});


module.exports = router;