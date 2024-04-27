const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const { corsOptions } = require("./configs/cors");
const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
const boardRouter = require("./routes/board.router");

// error
const { errorHandlingMiddleware } = require("./middlewares/errorHandling");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// CORS
app.use(cors(corsOptions));

// Database
// Mongodb
require("./db/mongodb");

// Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/board", boardRouter);

// Middleware error handling
app.use(errorHandlingMiddleware);

app.listen(port);
