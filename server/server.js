require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

async function main() {
  await mongoose.connect(process.env.DBURL);

  const Message = mongoose.model("Message", {
    name: String,
    message: String,
  });

  app.use(express.static(path.join("..", "index.html")));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/messages", (req, res) => {
    Message.find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log("Failed due to", err);
      });
  });

  async function newMessage(name, message) {
    const newMessage = new Message({
      name: name,
      message: message,
    });
    await newMessage.save().then(console.log(newMessage));
  }

  app.post("/messages", async (req, res) => {
    const name = req.body.name;
    const message = req.body.message;
    await newMessage(name, message);
  });

  io.on("connection", () => {
    console.log("a user is connected");
  });

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}

main();
