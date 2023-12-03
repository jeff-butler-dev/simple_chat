import { model } from "mongoose";
export const Message = model("Message", {
  name: String,
  message: String,
});
