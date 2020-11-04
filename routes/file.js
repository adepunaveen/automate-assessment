const File = require("../model/File");
const Folder = require("../model/Folder");
const Joi = require("@hapi/joi");
const router = require("express").Router();
const User = require("../model/User");

const schema = Joi.object({
    filename: Joi.string().min(6).max(255).required(),
    owner: Joi.string().min(6).max(255).required().email(),
    content: Joi.string().required(),
    filepath: Joi.string(),
});

// add file
router.post("/addfile", async (req, res) => {
    // validate the user
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const isUserExist = await User.findOne({ email: req.body.owner });

    if (!isUserExist) {
        return res.status(400).json({ error: "User Not exists" });

    }
    // const isFileExist = await File.findOne({ filename: req.body.filename, filepath: req.body.filepath, owner: req.body.owner });
    // if (isFileExist)
    //     return res.status(400).json({ error: "File already exists" });

    try {
        const newFile = new File({
            filename: req.body.filename,
            owner: req.body.owner,
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

    filename: Joi.string().min(6).max(255).required(),
    targetfolder: Joi.string().min(6).max(255).required(),
    owner: Joi.string().min(6).max(255).required().email(),
});

// login route
router.post("/movefile", async (req, res) => {
    // validate the user
    const { error } = movingschema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const isUserExist = await User.findOne({ email: req.body.owner });

    if (!isUserExist) {
        return res.status(400).json({ error: "User Not exists" });
    }


    const isFileExist = await File.findOne({ filename: req.body.filename });
    if (isFileExist)
        return res.status(400).json({ error: "File already exists" });

    const isFolderExist = await Folder.findOne({ foldername: req.body.targetfolder,usr });
        if (isFolderExist)
            return res.status(400).json({ error: "Folder Not exists" });
    


    try {
        File.findOneAndUpdate({},)
        res.json({ error: null, data: savedFile });
    } catch (error) {
        res.status(400).json({ error });
    }
});


module.exports = router;