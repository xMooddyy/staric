const Discord = require('discord.js');
const Config = require('../../models/guildSettings.js');

module.exports = {
	config: {
		name: 'disable',
		description: 'Disable modules for your server..',
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

				if(!args[0]) return message.channel.send('Please, provide a key to disable.');
				if (args[0] === 'logs') {

					if(res.logs === false) return message.channel.send('The module `logs` is already disabled.');


					Config.findOneAndUpdate({ guildID: message.guild.id }, { $set:{ logs: false } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});


					message.channel.send('Sucessfully disabled `logs` module.');
				}
				else if(args[0] === 'modlogs') {

					if(res.modlog === false) return message.channel.send('The module `modlogs` is already disabled.');

					Config.findOneAndUpdate({ guildID: message.guild.id }, { $set:{ modlog: false } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});


					message.channel.send('Sucessfully disabled `modlogs` module.');

				}
				else if(args[0] === 'welcomelog') {

					if(res.welcomelog === false) return message.channel.send('The module `welcomelog` is already disabled.');

					Config.findOneAndUpdate({ guildID: message.guild.id }, { $set:{ welcomelog: false } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});
					message.channel.send('Sucessfully disabled `welcomelog` module.');
				}
				else if(args[0] === 'leavelog') {

					if(res.leavelog === false) return message.channel.send('The module `leavelog` is already disabled.');

					Config.findOneAndUpdate({ guildID: message.guild.id }, { $set:{ leavelog: false } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});

					message.channel.send('Sucessfully disabled `leavelog` module.');
				}
				else if(args[0] === 'filter') {

					if(res.filterbadwords === false) return message.channel.send('The module `filter` is already disabled.');

					Config.findOneAndUpdate({ guildID: message.guild.id }, { $set:{ filterbadwords: false } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});

					message.channel.send('Successfully disabled `filter` module.');


				}
			});
	},
};
