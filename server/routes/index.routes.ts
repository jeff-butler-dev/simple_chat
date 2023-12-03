import * as express from "express";
import * as path from "path";
const router = express.Router();


router.get("/", (res: any) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

module.exports = router;
