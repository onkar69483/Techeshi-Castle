const question = require("../models/question");

const getRandomQuestions = async (req, res) => {
    try {
        const {type} = req.query;
        if(!type){
            return res.status(400).json({ error: 'Invalid input'});
        }
        const questions = await question.aggregate([{ $match: {type}}, { $sample: {size: 1}},]);

        if(!questions.length){
            return res.status(404).json({error: "No questions found for the specified type."});
        }

        res.status(200).json(questions);
    } catch (error) {

        console.error('Error fetching random questions:', error);
        res.status(500).json({ error: "Failed to fetch questions" });
    }
};

module.exports = { getRandomQuestions };




