const multer = require("multer");
const fs = require("fs");
const path = require("path");

const User = require("../models/User");

const dir = "./data/"; //Folder into root

const removeOld = (user) => {
  try {
    const oldImageProfile = dir + user.folder + "/" + user.imgprofile.original;
    if (fs.existsSync(oldImageProfile)) {
      fs.unlink(oldImageProfile, (err) => {});
    }
    /*const oldImageThumb = dir + user.folder + "/" + user.imgprofile.thumbnail;
  if (fs.existsSync(oldImageThumb)) {
    fs.unlink(oldImageThumb, (err) => {
    });
  }*/
  } catch (e) {
    console.log(e.message);
  }
};

var upload = multer({
  storage: multer.diskStorage({
    destination: async function (req, file, callback) {
      const user = await User.findById(req.params.id);
      removeOld(user);
      if (!fs.existsSync(dir)) {
        await fs.mkdirSync(dir); //If not exist create folder
      }
      if (!fs.existsSync(dir + user.folder)) {
        await fs.mkdirSync(dir + user.folder); //If not exist create folder
      }
      callback(null, dir + user.folder);
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  },
});

module.exports = upload;
