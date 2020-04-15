const Config = require('../models/guildSettings.js');

module.exports = async (bot, gData) => {

  if(!gData.available) return;
	Config.findOneAndDelete({
		guildID: gData.id,
	}, (err, res) => {
		if(err) console.error(err);
	});

	bot.guilds.cache.get('601802265447235584').channels.cache.get('682313219456499732').send(`Server removed! ${gData.name} [${gData.id}] | ${gData.memberCount} Members`);
};
