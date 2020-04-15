const Discord = require('discord.js');
const Config = require('../../models/guildSettings.js');
const { stripIndents } = require('common-tags');


module.exports = {
	config: {
		name: 'modules',
		description: 'Show enabled/disabled modules.',
		usage: '',
		category: 'moderation',
		accessbeleby: 'Staff',
		userPermissions: ['ADMINISTRATOR'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {


		Config.findOne({
			guildID: message.guild.id,
		}, (err, ress) => {
			if(err) console.error(err);

			const status = {
				true: 'Enabled',
				false: 'Disabled',
			};


			const embed = new Discord.MessageEmbed()
				.setTitle('Modules')
				.setDescription(stripIndents`
            Modlogs: **${status[ress.modlog]}**
            Logs: **${status[ress.logs]}**
            Filter bad words: **${status[ress.filterbadwords]}**
            Welcome log: **${status[ress.welcomelog]}**
            Leave log: **${status[ress.leavelog]}**`)
				.setColor('RANDOM');

			message.channel.send(embed);

		});

	},
};
