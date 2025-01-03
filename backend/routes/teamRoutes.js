const express = require("express");
const { getTeams, createTeam, updateTeam, deleteTeam , searchTeams } = require("../controllers/teamController");

const router = express.Router();

router.get("/", getTeams);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);
router.get("/search" , searchTeams );

module.exports = router;
