//Envioments
const { port } = require("./env");

//Express
const express = require("express");
const app = express();

//CORS & more
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//Middlewares
app.use(cors());
app.use(bodyParser());
app.use(morgan("tiny"));

//Connect to mongo DB
require("./database");

//Routes of server API
app.use("/api/users", require("./routes/users"));

//Route testing
app.get("/test", (req, res) => {
  res.send("<h1 style='color:blue'>This text is a test of Express</h1>");
});

app.listen(port, () => console.log("Express is running, port ", port));
