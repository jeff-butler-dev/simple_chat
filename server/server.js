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
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DBURL);
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

//Routes
const messagesRouter = require("./routes/messages.routes");
const indexRouter = require("./routes/index.routes");
app.use("/messages", messagesRouter);
app.use("/", indexRouter);

//Main worker function
async function main() {
  try {
    //awaiting successful connection to mongodb
    await mongoose.connect(process.env.DBURL);
    await client.connect();
    const database = client.db("test");
    const messages = database.collection("messages");

    io.on("connection", (socket) => {
      console.log("io on");

      // open a Change Stream on the "messages" collection
      changeStream = messages.watch();

      // set up a listener when change events are emitted
      changeStream.on("change", (next) => {
        io.emit("chat message", next.fullDocument.message);
      });
    });

    server.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (error) {
    await client.close();
  }
}

main();
