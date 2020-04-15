const { readdirSync } = require('fs');

module.exports = (bot) => {

	['miscellaneous', 'moderation', 'owners', 'roblox', 'music', 'economy', 'fun', 'search'].forEach(x => bot.commandHandler(x));


};
