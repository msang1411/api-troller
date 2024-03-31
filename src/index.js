const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRouter = require("./routes/user.router");

// error
const { errorHandlingMiddleware } = require("./middlewares/errorHandling");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Database
// Mongodb
require("./db/mongodb");

// Routers
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);

// Middleware error handling
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`app listening on port localhost:${port}`);
});
