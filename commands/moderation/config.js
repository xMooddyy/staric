const Discord = require('discord.js');
const Config = require('../../models/guildSettings.js');
const { stripIndents } = require('common-tags');


module.exports = {
	config: {
		name: 'config',
		description: 'Setup the configuration for your server.',
		usage: ' | <logs | modlogs | leavelog | welcomelog | announcechannel | prefix> <new key>',
		category: 'moderation',
		accessbeleby: 'Staff',
		aliases: ['cfg'],
		userPermissions: ['MANAGE_GUILD'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

		const res = await bot.getGuild(message.guild);

		if (args[0] === 'prefix') {
			if (!args[1].length === 0) {
				message.channel.send('Missing prefix');
			}
			else if (args[1].length >= 4) {
				message.channel.send('Prefix can be only `3` characters long.');
			}
			else if (args[1].length >= 1) {

				const nPrefix = args[1];

				await bot.updateGuild(message.guild, { prefix: nPrefix });

				const embed = new Discord.MessageEmbed()
					.setColor(0x00ff00)
					.setTitle('Prefix set!')
					.setDescription(`Prefix set to \`${nPrefix}\``);

				message.channel.send(embed);

			}
		}
		else if (args[0] === 'logs') {
			if (!args[1]) {
				message.channel.send('Please, specify a channel.');


			}
			else if (args[1]) {


				const nLogchannel = args[1];


				await bot.updateGuild(message.guild, { logschannel: nLogchannel });
				const embed2 = new Discord.MessageEmbed()
					.setColor(0x00ff00)
					.setTitle('Log channel set!')
					.setDescription(`Log channel set to ${nLogchannel}!`);

				message.channel.send(embed2);

			}

		}
		else if (args[0] === 'announcechannel') {
			if (!args[1]) {
				message.channel.send(
					'Please, specify a channel.',
				);
			}
			else if (args[1]) {
				const nAnnounceChannel = args[1];

				await bot.updateGuild(message.guild, { announcechannel: nAnnounceChannel });
				const embed3 = new Discord.MessageEmbed()
					.setTitle('Annnouncement channel set!')
					.setColor(0x00ff00)
					.setDescription(
						`Announcement channel set to ${nAnnounceChannel}!`,
					);

				message.channel.send(embed3);
			}
		}
		else if (args[0] === 'welcomelog') {
			if (!args[1]) {
				message.channel.send('Please, specify a channel.');
			}
			else if (args[1]) {
				const nWelcomeChannel = args[1];


				await bot.updateGuild(message.guild, { welcomechannel: nWelcomeChannel });
				const embed4 = new Discord.MessageEmbed()
					.setColor(0x00ff00)
					.setTitle('Welcome channel set!')
					.setDescription(
						`Welcome channel set to ${nWelcomeChannel}`,
					);
				message.channel.send(embed4);

			}
		}
		else if (args[0] === 'leavelog') {
			if (!args[1]) {
				message.channel.send('Please, specify a channel.');
			}
			else if (args[1]) {
				const nLeaveChannel = args[1];


				await bot.updateGuild(message.guild, { leavechannel: nLeaveChannel });
				const embed5 = new Discord.MessageEmbed()
					.setColor(0x00ff00)
					.setTitle('Leave channel set!')
					.setDescription(`Leave channel set to ${nLeaveChannel}!`);

				message.channel.send(embed5);


			}

		}
		else if(args[0] === 'modlogs') {

			if (!args[1]) {
				message.channel.send('Please, specify a channel.');
			}
			else if (args[1]) {
				const nModlogs = args[1];


				await bot.updateGuild(message.guild, { modlogchannel: nModlogs });
				const embed5 = new Discord.MessageEmbed()
					.setColor(0x00ff00)
					.setTitle('Modlogs channel set!')
					.setDescription(`Modlogs set to ${nModlogs}!`);

				message.channel.send(embed5);

			}


		}
		else if (!args[0]) {

			const ress = await bot.getGuild(message.guild);

			const status = {
				true: 'Enabled.',
				false: 'Disabled',
			};


			const embed6 = new Discord.MessageEmbed()
				.setColor(0xadd8e6)
				.setTitle('Server configuration')
				.setDescription(stripIndents`
               Prefix: **${ress.prefix}**
               Announce channel: ${ress.announcechannel}
               Log channel: ${ress.logschannel}
               Welcome channel: ${ress.welcomechannel}
               Leave channel: ${ress.leavechannel}
               Modlogs channel: ${ress.modlogchannel}
               `)
				.setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
				.setTimestamp();

			message.channel.send(embed6);
		}
	},
};
