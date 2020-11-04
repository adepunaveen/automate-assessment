const Folder = require("../model/Folder");
const Joi = require("@hapi/joi");
const router = require("express").Router();
const User = require("../model/User");

const schema = Joi.object({
    foldername: Joi.string().min(6).max(255).required(),
    owner: Joi.string().min(6).max(255).required().email(),
});

// login route
router.post("/createfolder", async (req, res) => {
    // validate the user
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const isUserExist = await User.findOne({ email: req.body.owner });

    if (!isUserExist) {
        return res.status(400).json({ error: "User Not exists" });

    }
    const isFolderExist = await Folder.findOne({ foldername: req.body.foldername, owner: req.body.owner });
    if (isFolderExist)
        return res.status(400).json({ error: "Folder already exists" });

    try {
        const newFolder = new Folder({
            foldername: req.body.foldername,
            owner: req.body.owner,
        });
        const savedFolder = await newFolder.save();
        res.json({ error: null, data: savedFolder });
    } catch (error) {
        res.status(400).json({ error });
    }
});





module.exports = router;