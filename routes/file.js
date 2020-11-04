const File = require("../model/File");
const Folder = require("../model/Folder");
const Joi = require("@hapi/joi");
const router = require("express").Router();
const User = require("../model/User");
const { json } = require("express");

const schema = Joi.object({
    filename: Joi.string().min(1).max(255).required(),
    content: Joi.string().required(),
    filepath: Joi.string(),
});



// add file
router.post("/addfile", async (req, res) => {
    // validate the user
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const newFile = new File({
            filename: req.body.filename,
            owner: req.user.id,
            content: req.body.content,
            filepath: req.body.filepath,
        });
        const savedFile = await newFile.save();
        res.json( savedFile );
    } catch (error) {
        res.status(400).json({ error });
    }
});


const movingschema = Joi.object({

    filename: Joi.string().min(1).max(255).required(),
    targetfolder: Joi.string().min(1).max(255).required(),
//    owner: Joi.string().min(6).max(255).required().email(),
});

// login route
router.post("/movefile", async (req, res) => {
    // validate the user
    const { error } = movingschema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const isFileExist = await File.findOne({ filename: req.body.filename,owner:req.user.id });
    if (!isFileExist)
        return res.status(400).json({ error: "File Not exists" });

    const isFolderExist = await Folder.findOne({ foldername: req.body.targetfolder,owner:req.user.id});
    console.log(isFolderExist)
        if (!isFolderExist)
            return res.status(400).json({ error: "Folder Not exists" });
    
    console.log({_id: isFileExist._id})

    try {
        isFileExist.filepath = req.body.targetfolder;
     //   const res = await isFileExist.save()
     const result = await File.findOneAndUpdate({_id: isFileExist._id},{$set:{filepath: req.body.targetfolder}})
        res.json( result );
    } catch (error) {
        res.status(400).json({ error });
    }
});


module.exports = router;