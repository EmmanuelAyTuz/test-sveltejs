const dotenv = require("dotenv");
dotenv.config();

//Envioments of the project
module.exports = {
  url_mongo: process.env.MONGO_DB,
  port: process.env.PORT,
};
