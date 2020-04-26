const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
/*const RedisServer = require('redis-server');
const server = new RedisServer({
  port: 6379,
  bin: '/usr/local/bin/redis-server'
});*/

const clientRoutes = require("./api/routes/clients");
const leadRoutes = require("./api/routes/leads");
const sprintRoutes = require("./api/routes/sprints");
const taskRoutes = require("./api/routes/tasks");
const userRoutes = require("./api/routes/users");
const settingRoutes = require("./api/routes/settings");

mongoose.connect(
  "mongodb://Taras:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0-shard-00-00-jceak.mongodb.net:27017,cluster0-shard-00-01-jceak.mongodb.net:27017,cluster0-shard-00-02-jceak.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useMongoClient: true
  }
);

/*server.open((err) => {
  if (err === null) {
    // You may now connect a client to the Redis
    // server bound to port 6379.
  }
});*/

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/clients", clientRoutes);
app.use("/leads", leadRoutes);
app.use("/sprints", sprintRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/settings", settingRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
