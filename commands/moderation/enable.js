const Discord = require('discord.js');
const Config = require('../../models/guildSettings.js');
const { stripIndents } = require('common-tags');

module.exports = {
	config: {
		name: 'enable',
		description: 'Enable modules for your server.',
		usage: '<logs | welcomelog | leavelog | modlogs | filter>',
		category: 'moderation',
		accessbeleby: 'Staff',
		userPermissions: ['MANAGE_GUILD'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

		Config.findOne(
			{
				guildID: message.guild.id,
			},
			(err, res) => {

				if (args[0] === 'logs') {

					if(res.logs === true) return message.channel.send('The module `logs` is already enabled.');

					Config.findOneAndUpdate({ guildID: message.guild.id }, { $set:{ logs: true } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});


					message.channel.send('Sucessfully enabled `logs` module.');
				}
				else if(args[0] === 'modlogs') {

					if(res.modlog === true) return message.channel.send('The module `modlogs` is already enabled.');

					Config.findOneAndUpdate({ guildID: message.guild.id }, { $set:{ modlog: true } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});


					message.channel.send('Sucessfully enabled `modlogs` module.');

				}
				else if(args[0] === 'welcomelog') {

					if(res.welcomelog === true) return message.channel.send('The module `welcomelog` is already enabled.');

					Config.findOneAndUpdate({ guildID: message.guild.id }, { $set:{ welcomelog: true } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});

					message.channel.send('Sucessfully enabled `welcomelog` module.');
				}
				else if(args[0] === 'leavelog') {

					if(res.leavelog === true) return message.channel.send('The module `leavelog` is already enabled.');

					Config.findOneAndUpdate({ guildID: message.guild.id }, { $set:{ leavelog: true } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});

					message.channel.send('Sucessfully enabled `leavelog` module.');
				}
				else if(args[0] === 'filter') {

					if(res.filterbadwords === true) return message.channel.send('The module `filter` is already enabled.');

					Config.findOneAndUpdate({ guildID: message.guild.id }, { $set:{ filterbadwords: true } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});

					message.channel.send('Successfully enabled `filter` module.');


				}
			});
	},
};
