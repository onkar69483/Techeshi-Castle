const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    question: {
        type: [String],
        required: true,
    },
});

const question = mongoose.model("Question", questionSchema);

module.exports = question;
