const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Team = require("./models/Team");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get("/teams", async (req, res) => {
    try {
        const teams = await Team.find().sort({ total_score: -1 }); 
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve teams" });
    }
});

app.post("/teams", async (req, res) => {
    try {
        const {
            team_name,
            college,
            contact,
            challenge_1_score,
            challenge_2_score,
            challenge_3_score,
            total_score,
            players,
        } = req.body;

        if (!team_name || !college || !contact || !players || !total_score) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newTeam = new Team({
            team_name,
            college,
            contact,
            challenge_1_score,
            challenge_2_score,
            challenge_3_score,
            total_score,
            players,
        });

        const savedTeam = await newTeam.save();
        res.status(201).json(savedTeam);
    } catch (error) {
        res.status(500).json({ error: "Failed to create team", details: error.message });
    }
});

app.put("/teams/:id", async (req, res) => {
    const teamId = req.params.id;
    const updates = req.body;

    try {
        const updatedTeam = await Team.findByIdAndUpdate(teamId, updates, { new: true, runValidators: true });

        if (!updatedTeam) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.status(200).json(updatedTeam);
    } catch (error) {
        res.status(400).json({ error: "Failed to update team details", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
