const upload = require("../helpers/uploader");
const { Router } = require("express");

const router = Router();

/*Upload file*/
router.post("/:id", upload.single("profile"), async (req, res) => {
  try {
    res.status(200).json({ who: req.params.id, data: req.file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
