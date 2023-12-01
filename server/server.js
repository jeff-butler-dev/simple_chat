//DOTENV and PORT import
require("dotenv").config();
const PORT = process.env.PORT;

//Server specific imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// IO Export and Listen
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const server = createServer(app);
const io = new Server(server);

//Routes
const messagesRouter = require("./routes/messages.routes");
const indexRouter = require("./routes/index.routes");
app.use("/messages", messagesRouter);
app.use("/", indexRouter);

//Main worker function
async function main() {
  //awaiting successful connection to mongodb
  await mongoose.connect(process.env.DBURL);

  io.on("connection", async (socket) => {
    console.log("io on");
  });

  server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}

main();

module.exports = {
  io,
};
