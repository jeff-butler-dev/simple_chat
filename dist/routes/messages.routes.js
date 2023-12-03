import { Router } from "express";
const messagesRouter = Router();
// @ts-ignore
import { Message } from "../models/messages.model.js";
messagesRouter.get("/", (req, res) => {
    Message.find({})
        .then((result) => {
        res.send(result);
    })
        .catch((err) => {
        console.log("Failed due to", err);
    });
});
messagesRouter.post("/", async (req, res) => {
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
messagesRouter.delete("/:id", async (req, res) => {
    async function deleteMessage(_id) {
        await Message.findByIdAndDelete(req.params.id);
    }
    await deleteMessage(req.body.id)
        .then(() => {
        res.status(200).send(req.body);
    })
        .catch((err) => {
        return err;
    });
});
messagesRouter.get("/:id", async (req, res) => {
    try {
        const messageToReturn = await Message.findOne({ _id: req.params.id });
        res.status(200).send(messageToReturn);
    }
    catch (error) {
        res.send(error);
    }
});
export default messagesRouter;
//# sourceMappingURL=messages.routes.js.map