const Folder = require("../model/Folder");
const File = require("../model/File");
const Joi = require("@hapi/joi");
const router = require("express").Router();
const User = require("../model/User");

const schema = Joi.object({
    foldername: Joi.string().min(1).max(255).required(),
});

router.get('/getfiles/:folder',async(req,res)=>{
    const foldername = req.params.folder
    const files = await File.find({owner:req.user.id,filepath:foldername},{'_id': 0,'__v':0});
    res.json(files)
})

// login route
router.post("/createfolder", async (req, res) => {
    // validate the user
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const isFolderExist = await Folder.findOne({ foldername: req.body.foldername, owner: req.user.id });
    if (isFolderExist)
        return res.status(400).json({ error: "Folder already exists" });

        console.log({
            foldername: req.body.foldername,
            owner: req.user.id,
        })
    try {
        
        const newFolder = new Folder({
            foldername: req.body.foldername,
            owner: req.user.id,
        });
        const savedFolder = await newFolder.save();
        res.json( savedFolder);
    } catch (error) {
        res.status(400).json({ error });
    }
});





module.exports = router;