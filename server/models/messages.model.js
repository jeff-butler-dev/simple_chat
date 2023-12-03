import { model } from "mongoose";
const Message = model("Message", {
  name: String,
  message: String,
});

export default { Message };
