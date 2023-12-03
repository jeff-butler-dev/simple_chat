//DOTENV and PORT import
import dotEnv from "dotenv";
dotEnv.config();
const PORT = process.env.PORT;

//Server specific imports
import express from "express";
import { connect } from "mongoose";
import parser from "body-parser";
const { json, urlencoded } = parser;

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

// IO Export and Listen
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.DBURL);
import { Server } from "socket.io";
import { createServer } from "node:http";
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

//Routes
import messagesRouter from "./routes/messages.routes.js";
import indexRouter from "./routes/index.routes.js";
app.use("/messages", messagesRouter);
app.use("/", indexRouter);

//Main worker function
async function main() {
  try {
    //awaiting successful connection to mongodb
    await connect(process.env.DBURL);
    await client.connect();
    const database = client.db("test");
    const messages = database.collection("messages");

    // open a Change Stream on the "messages" collection
    const changeStream = messages.watch();

    // set up a listener when change events are emitted
    changeStream.on("change", (next) => {
      io.emit("chat message", next.fullDocument.message);
    });

    //notifying when a new user connects
    io.on("connection", (socket) => {
      console.log("used logged on");
    });

    server.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (error) {
    await client.close();
  }
}

main();
