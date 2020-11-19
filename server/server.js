const express = require("express");
const server = express();

const morgan = require("morgan");
const cors = require("cors");

const visitorRouter = require("./routes/visitor-router.js");

// Middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Routers
server.use("/api/visitor", visitorRouter);

//Routes
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;
