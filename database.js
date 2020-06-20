const { url_mongo } = require("./env");

const mongoose = require("mongoose");

mongoose
  .connect(url_mongo, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Mongo DB is connected"))
  .catch((err) => console.error(err));
