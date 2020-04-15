const mongoose = require('mongoose');

const cases = new mongoose.Schema({
  guildID: String,
  action: String,
  mUserID: String,
  wUserID: String,
  mUserTag: String,
  wUserTag: String,
  reason: String,
  caseid: { type: Number, default: 0 }
});

module.exports = mongoose.model('case', cases);