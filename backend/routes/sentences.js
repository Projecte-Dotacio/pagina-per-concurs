const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');
const Sentence = require('../models/Sentence');
const mongoose = require('mongoose');


// Route to get a random sentence
router.post('/random', async (req, res) => {
    const { displayedSentenceIds } = req.body; // IDs of sentences already displayed

    try {
        // Convert string IDs to MongoDB ObjectId instances
        const excludedObjectIds = displayedSentenceIds.map(id => mongoose.Types.ObjectId.createFromHexString(id));

        const randomSentence = await Sentence.aggregate([
            { $match: { _id: { $nin: excludedObjectIds } } }, // Exclude already displayed sentences
            { $sample: { size: 1 } } // Randomly select one sentence
        ]);

        if (randomSentence.length > 0) {
            res.json({
                _id: randomSentence[0]._id,
                sentence: randomSentence[0].sentence,
            });
        } else {
            res.status(404).json({ message: 'No more sentences available.' });
        }
    } catch (error) {
        console.error('Error fetching random sentence:', error);
        res.status(500).json({ message: error.message });
    }
});


// Endpoint to verify the user's answer for a sentence
router.post('/verify/:sentenceId', [
    param('sentenceId').isMongoId(), 
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { sentenceId } = req.params;

        const sentence = await Sentence.findById(sentenceId);
        if (!sentence) {
            return res.status(404).json({ message: 'Sentence not found' });
        }

        res.json({
            isCorrect: sentence.isCorrect,
            explanation: sentence.explanation || 'Aquesta frase era correcte'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;