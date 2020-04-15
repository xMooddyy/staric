const { Schema, model } = require('mongoose');

const queue = new Schema({
  guildID: String,
  looping: { type: Boolean, default: false },
  pb: { type: Boolean, default: true },
  queue: { type: Boolean, default: [] },
  dispatcher: Object,
  connection: Object,
});

module.exports = model('queue', queue);