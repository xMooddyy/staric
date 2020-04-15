const Discord = require('discord.js');
const Config = require('../models/guildSettings.js');
const cases = require('../models/case.js');

module.exports = async (bot, gData) => {
	Config.findOne(
		{
			guildID: gData.id,
		},
		(err, res) => {
			if (err) console.error(err);

			if (!res) {
				const newConfig = new Config({
					guildID: gData.id,
					prefix: 's!',
					welcomelog: false,
					welcomechannel: 'Not set.',
					modlog: false,
					modlogchannel: 'Not set.',
					leavelog: false,
					leavechannel: 'Not set.',
					logs: false,
					logschannel: 'Not set.',
					announcechannel: 'Not set.',
					filterbadwords: false,
					commandsused: 0,
				});

				newConfig.save();
			}

			bot.guilds.cache.get('601802265447235584').channels.cache.get('682313219456499732').send(`Server added! ${gData.name} [${gData.id}] | ${gData.memberCount} Members`);
			console.log(`Server added! ${gData.name} [${gData.id}] | ${gData.memberCount} Members`);
		},
	);
};
