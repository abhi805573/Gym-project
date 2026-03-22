const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  membershipId: { type: String, required: true, unique: true },
  contact: { type: String, default: '', match: /^\+?\d{10,15}$/ },
  feesPaid: { type: Boolean, default: false },
  joiningDate: { type: Date, default: Date.now },
  endingDate: { type: Date },
  startTime: { type: String },
  endTime: { type: String },
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  assignedTrainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', default: null }
});

module.exports = mongoose.model('Member', memberSchema);