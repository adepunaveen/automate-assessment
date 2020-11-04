const router = require("express").Router();
const User = require("../model/User");

router.post("/addfile", async (req, res) => {
  const users = await User.find();
  res.json({
    error: null,
    data: {
      title: "My dashboard",
      content: "dashboard content",
      user: users, // token payload information
    },
  });
});

module.exports = router;