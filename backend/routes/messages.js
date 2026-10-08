const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// @route   GET /api/messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'name email')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/messages
router.delete('/', async (req, res) => {
  try {
    await Message.deleteMany({});
    res.json({ message: 'All messages cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
