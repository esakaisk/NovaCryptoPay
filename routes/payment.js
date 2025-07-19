const express = require("express");
const router = express.Router();
const { createSession, getStatus } = require("../controllers/paymentController");

router.post("/session", createSession);
router.get("/status/:id", getStatus);

module.exports = router;
