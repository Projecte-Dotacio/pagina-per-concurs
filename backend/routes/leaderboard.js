const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');

// Endpoint to submit a new score
router.post('/submit-score', async (req, res) => {
    try {
        const { username, score } = req.body;
        const newScore = new Leaderboard({
            username,
            score
        });

        await newScore.save();

        // Respond with the created score entry
        res.status(201).json(newScore);
    } catch (error) {
        console.error('Failed to submit score:', error);
        // Respond with an error status and message
        res.status(500).json({ message: 'Failed to submit score' });
    }
});

// Endpoint to get the leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const scores = await Leaderboard.find().sort({ score: -1 }).limit(25); //Top 25
        res.json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
