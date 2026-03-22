const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  salary: { type: Number, required: true },
  salaryPaid: { type: Boolean, default: false },
  assignedUsers: [{ type: String }],
  contact: { type: String, default: '', match: /^\+?\d{10,15}$/ }
});

module.exports = mongoose.model('Trainer', trainerSchema);