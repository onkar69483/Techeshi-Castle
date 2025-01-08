const Circuit = require("../models/circuitSteps"); 

const getCircuitStep = async (req, res) => {
    try {
        const { circuit_number } = req.query;

        const circuit = circuit_number
            ? await Circuit.findOne({ circuit_number })
            : await Circuit.findOne();

        if (!circuit) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json(circuit);
    } catch (error) {
        console.error("Error fetching circuit:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getCircuitStep };
