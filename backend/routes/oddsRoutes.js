const express = require("express");
const router = express.Router();

const { getOdds } = require("../controllers/oddsController");

router.get("/:matchId", getOdds);

module.exports = router;