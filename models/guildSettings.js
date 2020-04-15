const mongoose = require('mongoose');

const config = new mongoose.Schema({
  guildID: String,
  prefix: { type: String, default: 's!' },
  welcomelog: { type: Boolean, default: false },
  welcomechannel: { type: String, default: 'Not set.' },
  modlog: Boolean,
  modlogchannel: String,
  leavelog: Boolean,
  leavechannel: String,
  logs: Boolean,
  logschannel: String,
  announcechannel: String,
  filterbadwords: Boolean,
  commandsused: Number,
});

module.exports = mongoose.model('guildSettings', config);