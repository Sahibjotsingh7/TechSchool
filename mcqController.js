// mcqController.js

const mongoose = require('mongoose');
const mcqSchema = require('../Models/McqModel'); 

exports.getRandomMCQs = async (req, res) => {
    const collectionName = req.params.collection; 
    const collections = ['codemcqs', 'devmcqs', 'basemcqs']; 

    if (!collections.includes(collectionName)) {
        return res.status(400).json({ message: 'Invalid collection name' });
    }

    try {
        const MCQModel = mongoose.model(collectionName, mcqSchema, collectionName);

        const count = await MCQModel.countDocuments();
        const mcqs = await MCQModel.find();
        const finalMcqs = [];

        let i = 0;

        while (i < 10) {
            const randomIndex = Math.floor(Math.random() * count);
            if (!finalMcqs.includes(mcqs[randomIndex])) {
                finalMcqs.push(mcqs[randomIndex]);
                i++;
            }
        }

        
        const filteredMcqs = finalMcqs.map(mcq => ({
            _id: mcq._id,
            ques: mcq.ques,
            aoptions: mcq.aoptions
        }));

        res.json(filteredMcqs);
    } catch (error) {
        console.error('Error fetching MCQs:', error); 
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.checkAnswers = async (req, res) => {
    const answers = req.body.answers; 
    const collectionName = req.body.collection; 

    if (!Array.isArray(answers) || !answers.length) {
        return res.status(400).json({ message: 'Invalid answers format' });
    }

    const collections = ['codemcqs', 'devmcqs', 'basemcqs']; 

    if (!collections.includes(collectionName)) {
        return res.status(400).json({ message: 'Invalid collection name' });
    }

    try {
        const questionIds = answers.map(answer => answer.id);  

        const MCQModel = mongoose.model(collectionName, mcqSchema, collectionName);
        
        
        const mcqs = await MCQModel.find({ _id: { $in: questionIds } }).select();

        // Match answers with questions and include all questions, even those not attempted
        const results = answers.map(answer => {
            const question = mcqs.find(mcq => mcq._id.toString() === answer.id);
            if (!question) return null;

            const isCorrect = question.ans === answer.option;
            return {
                question,
                chosenOption: answer.option, 
                correctAnswer: question.ans, // The correct answer
                isCorrect: answer.option === "not attempted" ? false : isCorrect, // Whether the answer was correct
            };
        });

        
        const summary = {

            correct: results.filter(result => result.isCorrect).length,
            incorrect: results.filter(result => !result.isCorrect && result.chosenOption !== "not attempted").length,
            notAttempted: results.filter(result => result.chosenOption === "not attempted").length,
        };

        res.json({ results, summary });
    } catch (error) {
        console.error('Error checking answers:', error); 
        res.status(500).json({ message: 'Server error', error });
    }
};
