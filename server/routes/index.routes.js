"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var router = express.Router();
router.get("/", function (res) {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});
module.exports = router;
