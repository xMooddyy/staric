const mongoose = require("mongoose");

const XpSchema = mongoose.Schema({
    userID: String,
    username: String,
    serverID: String,
    xp: Number,
    level: Number
})

 module.exports = mongoose.model("Xp", XpSchema)