require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const io = require("socket.io");
const path = require("path");
const messagesRouter = require("./routes/messages.routes");

async function main() {
  await mongoose.connect(process.env.DBURL);
  app.use(express.static(path.join("..", "index.html")));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/messages", messagesRouter);

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}

main();
