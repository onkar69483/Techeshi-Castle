const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true,
        unique: true
    },
    college: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    challenge_1_score: {
        type: Number,
        required: true,
        default: 0
    },
    challenge_2_score: {
        type: Number,
        required: true,
        default: 0
    },
    challenge_3_score: {
        type: Number,
        required: true,
        default: 0
    },
    total_score: {
        type: Number,
        required: true
    },
    players: {
        type: [String],
        required: true,
        validate: {
            validator: function (players) {
                return players.length <= 4;
            },
            message: "A team can have at most 4 players"
        }
    }
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
