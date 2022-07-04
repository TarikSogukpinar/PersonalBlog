const express = require("express");
const router = express.Router();
const indexController = require("../controller/indexController");

router.get("/", indexController.IndexPage);

module.exports = router;
