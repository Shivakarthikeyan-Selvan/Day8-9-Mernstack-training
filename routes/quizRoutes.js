const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get questions for a stream
router.get('/:stream', async (req, res) => {
  try {
    const questions = await Question.find({ stream: req.params.stream });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add single question (admin adding one question at a time)
router.post('/add', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.json({ message: 'Question added successfully ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/stream/:stream', async (req, res) => {
  try {
    const stream = req.params.stream;
    const questionsWithStream = req.body.questions.map((q) => ({
      ...q,
      stream: stream,
    }));
    await Question.deleteMany({ stream });
    await Question.insertMany(questionsWithStream);
    res.json({ message: `Questions for ${stream} updated successfully ✅` });
  } catch (err) {
    console.error('Error saving questions:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
