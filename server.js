const path = require("path");
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
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

//Connect to mongo DB
require("./database");

//Routes of server API
app.use("/api/users", require("./routes/users")); //Model JSON
app.use("/api/upload", require("./routes/upload")); //Upload files
app.use("/api", express.static(path.join(__dirname, "data"))); //Data

//Route testing
app.get("/test", (req, res) => {
  res.send("<h1 style='color:blue'>This text is a test of Express</h1>");
});

app.listen(port, () => console.log("Express is running, port ", port));
