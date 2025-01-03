const Team = require("../models/Team");

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find().sort({ total_score: -1 });
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve teams" });
    }
};

const createTeam = async (req, res) => {
    // console.log(req.body);
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
};

const updateTeam = async (req, res) => {
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
};

const deleteTeam = async (req, res) => {
    const teamId = req.params.id;

    try {
        const deletedTeam = await Team.findByIdAndDelete(teamId);

        if (!deletedTeam) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.status(200).json({ message: "Team successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete team", details: error.message });
    }
};

module.exports = { getTeams, createTeam, updateTeam, deleteTeam };
