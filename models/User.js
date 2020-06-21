const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, uppercase: true, trim: true },
  flastname: { type: String, required: true, uppercase: true, trim: true },
  mlastname: { type: String, required: true, uppercase: true, trim: true },
  folder: { type: String, required: true },
  imgprofile: {
    original: { type: String, required: true, default: "profile_default.png" },
    thumbnail: { type: String, required: false },
  },
  email: {
    type: String,
    required: true,
    index: { unique: "{VALUE} has been taken" },
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email, {VALUE} is not a valid address",
    ],
  },
});

UserSchema.plugin(require("mongoose-unique-validator")); //Pretty error and messages

//Notes: {PATH}/{VALUE}
module.exports = model("User", UserSchema);
