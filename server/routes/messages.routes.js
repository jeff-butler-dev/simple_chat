const express = require("express");
const router = express.Router();
const { Message } = require("../models/messages.model");

router.get("/", (req, res) => {
  Message.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Failed due to", err);
    });
});

router.post("/", async (req, res, next) => {
  const name = req.body.name;
  const message = req.body.message;
  await newMessage(name, message)
    .then(() => {
      res.status(200).send(req.body);
    })
    .catch((err) => {
      return err;
    });
});

async function newMessage(name, message) {
  const newMessage = new Message({
    name: name,
    message: message,
  });
  await newMessage.save().then(console.log(newMessage));
}

module.exports = router;
