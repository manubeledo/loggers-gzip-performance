require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const serverRoutes = require("./routes/index");
const compression = require("compression");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const modo_cluster = process.argv[2] == "CLUSTER";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views/layouts");
app.use(compression());

if (modo_cluster && cluster.isMaster) {
  console.log(`Master --> PID: ${process.pid}`);

  console.log("CPUS:", numCPUs);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Se termino el subproceso: ${worker.process.pid}`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    if (modo_cluster) {
      console.log(
        `Server Working on: http://localhost:${PORT} || MODE: CLUSTER || Worker ${
          process.pid
        } started!, date: ${new Date()}`
      );
    } else {
      console.log(
        `Server Working on: http://localhost:${PORT} || MODE: FORK || Worker ${
          process.pid
        } started!, date: ${new Date()}`
      );
    }
  });
}

serverRoutes(app);