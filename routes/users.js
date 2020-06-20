const { Router } = require("express");
const User = require("../models/User");

const router = Router();

//Messages
const err_msg = "Usuario no existe";
const ef_msg = "Campo(s) incorrecto(s)";
const ec_msg = "Error creando usuario";
const er_msg = "Ningun usuario";
const eu_msg = "Error actualizando usuario";
const ed_msg = "Error eliminado usuario";

//Create
router.post("/", async (req, res) => {
  const { name, flastname, mlastname, email } = req.body;
  const newUser = new User({
    name,
    flastname,
    mlastname,
    email,
  });
  try {
    const user = await newUser.save();
    if (!user) {
      throw new Error(ec_msg);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Read all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      throw new Error(er_msg);
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Read single user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error(er_msg);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, flastname, mlastname, email } = req.body;
  try {
    const user = User.findById(id);
    if (!user) {
      throw new Error(err_msg);
    }
    if (!name || !flastname || !mlastname || !email) {
      throw new Error(ef_msg);
    }
    const updated = await user.update({
      name,
      flastname,
      mlastname,
      email,
    });
    if (!updated) {
      throw new Error(eu_msg);
    }
    res.status(200).json({ id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = User.findById(id);
    if (!user) {
      throw new Error(err_msg);
    }
    const removed = await user.remove();
    if (!removed) {
      throw new Error(ed_msg);
    }
    res.status(200).json({ id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
