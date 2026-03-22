const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer.model.js'); // Updated import path

router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add-trainer', async (req, res) => {
  const { name, salary, salaryPaid, assignedUsers, contact } = req.body;
  const trainer = new Trainer({ name, salary, salaryPaid, assignedUsers, contact });
  try {
    const savedTrainer = await trainer.save();
    res.status(201).json(savedTrainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/update-trainer/:id', async (req, res) => {
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTrainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/delete-trainer/:id', async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trainer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;