const mongoose = require("mongoose");

const circuitSchema = new mongoose.Schema({
    circuit_number: {
        type: Number,
        required: true,
    },
    circuit_step: {
        type: String,
        required: true,
    }
})

const Circuit = mongoose.model("circuitSchema", circuitSchema);

module.exports = Circuit;


