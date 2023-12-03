import { Router } from "express";
const router = Router();
import Message from "../models/messages.model.js";

router.get("/", (req, res) => {
  Message.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Failed due to", err);
    });
});

router.post("/", async (req, res) => {
  async function newMessage(name, message) {
    const newMessage = new Message({
      name: name,
      message: message,
    });
    await newMessage.save().then(console.log(newMessage));
  }

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

router.delete("/:id", async (req, res) => {
  async function deleteMessage(_id) {
    await Message.findByIdAndDelete(req.params.id);
  }

  await deleteMessage()
    .then(() => {
      res.status(200).send(req.body);
    })
    .catch((err) => {
      return err;
    });
});

router.get("/:id", async (req, res) => {
  try {
    const messageToReturn = await Message.findOne({ _id: req.params.id });
    res.status(200).send(messageToReturn);
  } catch (error) {
    res.send(error);
  }
});

export default router;
