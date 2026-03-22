const express = require('express');
const router = express.Router();
const Member = require('../models/Member.model.js');
const Trainer = require('../models/Trainer.model.js'); 

router.get('/', async (req, res) => {
  try {
    const members = await Member.find().populate('assignedTrainer', 'name _id');
    console.log('Fetched members with assignedTrainer:', members);
    res.json(members);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/add-member', async (req, res) => {
  const { name, membershipId, contact, feesPaid, joiningDate, endingDate, startTime, endTime, weight, height, assignedTrainer } = req.body;
  const member = new Member({ 
    name, 
    membershipId, 
    contact, 
    feesPaid, 
    joiningDate, 
    endingDate, 
    startTime, 
    endTime, 
    weight, 
    height,
    ...(assignedTrainer && assignedTrainer !== 'none' && { assignedTrainer })
  });
  try {
    const savedMember = await member.save();
    if (assignedTrainer && assignedTrainer !== 'none') {
      const trainer = await Trainer.findById(assignedTrainer);
      if (!trainer) throw new Error('Trainer not found');
      if (!trainer.assignedUsers.some(id => id.toString() === savedMember._id.toString())) {
        trainer.assignedUsers.push(savedMember._id);
        await trainer.save({ validateBeforeSave: false });
      }
      console.log(`Added member ${savedMember._id} to trainer ${assignedTrainer}'s assignedUsers, Trainer assignedUsers:`, trainer.assignedUsers);
    }
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/update-member/:membershipId', async (req, res) => {
  try {
    const member = await Member.findOne({ membershipId: req.params.membershipId });
    if (!member) return res.status(404).json({ message: 'Member not found' });

    const { assignedTrainer, ...updateData } = req.body;
    const originalTrainerId = member.assignedTrainer?.toString();

    console.log('Updating member - Original Data:', { membershipId: req.params.membershipId, originalTrainerId, assignedTrainer, ...updateData });

    // Update member fields first
    Object.assign(member, updateData);
    if (assignedTrainer && assignedTrainer !== 'none') {
      member.assignedTrainer = assignedTrainer;
    } else if (assignedTrainer === 'none' || !assignedTrainer) {
      member.assignedTrainer = null;
    }

    // Save member to get the updated document
    const updatedMember = await member.save();
    console.log('Member saved with assignedTrainer:', updatedMember.assignedTrainer);

    // Handle trainer updates
    if (assignedTrainer && assignedTrainer !== 'none' && assignedTrainer !== originalTrainerId) {
      // Remove from previous trainer if it exists and differs
      if (originalTrainerId) {
        const prevTrainer = await Trainer.findById(originalTrainerId);
        if (prevTrainer) {
          prevTrainer.assignedUsers = prevTrainer.assignedUsers.filter(id => id.toString() !== member._id.toString());
          await prevTrainer.save({ validateBeforeSave: false });
          console.log(`Removed member ${member._id} from trainer ${originalTrainerId}'s assignedUsers, Remaining:`, prevTrainer.assignedUsers);
        }
      }
      // Add to new trainer
      const newTrainer = await Trainer.findById(assignedTrainer);
      if (newTrainer) {
        if (!newTrainer.assignedUsers.some(id => id.toString() === member._id.toString())) {
          newTrainer.assignedUsers.push(member._id);
          await newTrainer.save({ validateBeforeSave: false });
        }
        console.log(`Added member ${member._id} to trainer ${assignedTrainer}'s assignedUsers, Updated assignedUsers:`, newTrainer.assignedUsers);
      } else {
        console.log(`Trainer ${assignedTrainer} not found for assignment`);
      }
    } else if ((!assignedTrainer || assignedTrainer === 'none') && originalTrainerId) {
      // Remove from previous trainer if unassigned
      const prevTrainer = await Trainer.findById(originalTrainerId);
      if (prevTrainer) {
        prevTrainer.assignedUsers = prevTrainer.assignedUsers.filter(id => id.toString() !== member._id.toString());
        await prevTrainer.save({ validateBeforeSave: false });
        console.log(`Removed member ${member._id} from trainer ${originalTrainerId}'s assignedUsers, Remaining:`, prevTrainer.assignedUsers);
      }
    }

    res.json(updatedMember);
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ message: error.message });
  }
});

router.delete('/delete-member/:membershipId', async (req, res) => {
  try {
    const member = await Member.findOne({ membershipId: req.params.membershipId });
    if (!member) return res.status(404).json({ message: 'Member not found' });

    if (member.assignedTrainer) {
      const trainer = await Trainer.findById(member.assignedTrainer);
      if (trainer) {
        trainer.assignedUsers = trainer.assignedUsers.filter(id => id.toString() !== member._id.toString());
        await trainer.save({ validateBeforeSave: false });
        console.log(`Removed member ${member._id} from trainer ${member.assignedTrainer}'s assignedUsers, Remaining:`, trainer.assignedUsers);
      }
    }

    // Use deleteOne instead of remove
    await Member.deleteOne({ membershipId: req.params.membershipId });
    res.json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;