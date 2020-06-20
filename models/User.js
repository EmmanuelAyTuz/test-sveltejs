const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, uppercase: true, trim: true },
  flastname: { type: String, required: true, uppercase: true, trim: true },
  mlastname: { type: String, required: true, uppercase: true, trim: true },
  email: { type: String, required: true, index: { unique: true } },
});

module.exports = model("User", UserSchema);
