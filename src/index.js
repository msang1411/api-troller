const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");

// error
const { errorHandlingMiddleware } = require("./middlewares/errorHandling");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// CORS
const cors = require("cors");
var whitelist = ["http://localhost:5173"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Database
// Mongodb
require("./db/mongodb");

// Routers
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", cors(corsOptionsDelegate), authRouter);

// Middleware error handling
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  // console.log(`app listening on port localhost:${port}`);
});
