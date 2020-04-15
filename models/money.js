const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
    userID: String,
    username: String,
    serverID: String,
    money: Number,
    daily: String,
    weekly: String,
    hourly: String,
    rob: String
});

module.exports = mongoose.model("Money", moneySchema)