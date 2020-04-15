const mongoose = require("mongoose");

const blacklistedUsers = new mongoose.Schema({
    userID: String,
    reason: String
})

module.exports = mongoose.model("blacklistedUsers", blacklistedUsers)