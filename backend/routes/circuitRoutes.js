const express = require("express");
const router = express.Router();
const { getCircuitStep } = require("../controllers/circuitsController");

router.get("/", getCircuitStep);

module.exports = router;
