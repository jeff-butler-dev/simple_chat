import express from "express";
import path from "path";

const indexRouter = express.Router();

indexRouter.get("/", (req:any,res?:any) => {
  res.sendFile(path.join(process.cwd(),"server","index.html"));
});

export default indexRouter