const mongoose = require('mongoose');

const warnings = new mongoose.Schema({
    wUserID: String,
    serverID: String,
    mUserID: String,
    reason: String,
    Date: String,
});

module.exports = mongoose.model('warnings', warnings);