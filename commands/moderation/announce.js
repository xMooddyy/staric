const Discord = require('discord.js');
const Config = require('../../models/guildSettings.js');

module.exports = {
	config: {
		name: 'announce',
		description: 'Post an announcement to the announcement channel.',
		usage: '(everyone / here) <message>',
		category: 'moderation',
		accessableby: 'Administrators',
		aliases: ['acc'],
		userPermissions: ['ADMINISTRATOR'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

		Config.findOne({
			guildID: message.guild.id,
		}, async (err, res) => {
			if(err) console.error(err);


			if(res.announcechannel.startsWith('<#') && res.announcechannel.endsWith('>')) {
				res.announcechannel = res.announcechannel.slice(2, -1);
			}

			// const announcementchannel = message.guild.channels.find(c => c.name === res.announcechannel || c.id === res.announcechannel)

			const announcementchannel = message.guild.channels.cache.find(c => c.name === res.announcechannel || c.id === res.announcechannel);

			// if(announcementchannel.startsWith('<#') && announcementchannel.endsWith('>')) {
			//   announcementchannel = announcementchannel.slice(2, -1)
			// }

			if(args[0] === 'everyone') {

				const announcement = args.slice(1).join(' ');

				const embed = new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setTitle('Announcement!')
					.setDescription(announcement)
					.setThumbnail(message.guild.iconURL({ dynamic: true }))
					.setFooter(`Announcement from: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
					.setTimestamp();

				await announcementchannel.send('@everyone');
				await announcementchannel.send(embed);

			}
			else if(args[0] === 'here') {

				const announcement1 = args.slice(1).join(' ');

				const embed3 = new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setTitle('Announcement!')
					.setDescription(announcement1)
					.setThumbnail(message.guild.iconURL({ dynamic: true }))
					.setFooter(`Announcement from: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
					.setTimestamp();

				await announcementchannel.send('@here');
				await announcementchannel.send(embed3);
			}
			else {
				const announcement2 = args.join(' ');

				const embed4 = new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setTitle('Announcement!')
					.setDescription(announcement2)
					.setThumbnail(message.guild.iconURL({ dynamic: true }))
					.setFooter(`Announcement from: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
					.setTimestamp();

				await announcementchannel.send(embed4);
			}


			const embed2 = new Discord.MessageEmbed()
				.setColor(0x00ff00)
				.setDescription('Announcement sent successfully!');

			message.channel.send(embed2).then((msg) => {
				msg.delete(5000);
			});

		});
	},
};
