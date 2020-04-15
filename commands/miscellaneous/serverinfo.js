const { MessageEmbed } = require('discord.js');
const { cyan } = require('../../colours.json');
const Config = require('../../models/guildSettings.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const { features } = require('../../utils/utils.js');

module.exports = {
	config: {
		name: 'serverinfo',
		description: 'Pulls the serverinfo of the guild!',
		usage: '',
		category: 'miscellaneous',
		accessableby: 'Members',
		aliases: ['si', 'serverdesc'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

		Config.findOne({
			guildID: message.guild.id,
		}, async (err, res) => {

			if(err) console.error(err);

			function checkDays(date) {
				const now = new Date();
				const diff = now.getTime() - date.getTime();
				const days = Math.floor(diff / 86400000);
				return days + (days == 1 ? ' day' : ' days') + ' ago';
			}
			const verifLevels = ['None', 'Low', 'Medium', 'High', 'Insane'];
			const region = {
				'brazil': ':flag_br: Brazil',
				'europe': 'Europe',
				'eu-central': ':flag_eu: Central Europe',
				'singapore': ':flag_sg: Singapore',
				'us-central': ':flag_us: U.S. Central',
				'sydney': ':flag_au: Sydney',
				'us-east': ':flag_us: U.S. East',
				'us-south': ':flag_us: U.S. South',
				'us-west': ':flag_us: U.S. West',
				'eu-west': ':flag_eu: Western Europe',
				'vip-us-east': ':flag_us: VIP U.S. East',
				'london': ':flag_gb: London',
				'amsterdam': ':flag_nl: Amsterdam',
				'hongkong': ':flag_hk: Hong Kong',
				'russia': ':flag_ru: Russia',
				'southafrica': ':flag_za:  South Africa',
			};
			//  message.guild.fetchMembers().then((guild) => {
			/* const embed = new RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setColor('RANDOM')
            .addField('Name', message.guild.name, true)
            .addField('ID', message.guild.id, true)
            .addField('Owner', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
            .addField('Region', region[message.guild.region], true)
            .addField('Total | Humans | Bots', `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
            .addField('Features', message.guild.features.join(' - ') || 'None.')
            .addField('Verification Level', verifLevels[message.guild.verificationLevel], true)
            .addField('Channels', message.guild.channels.size, true)
            .addField('Creation Date', `${message.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.guild.createdAt)})`, true)
            .addField('Statuses', `<a:plexiOnline:478870259944783873> ${guild.members.filter(c => c.presence.status === 'online').size} | <a:plexiAway:478870515730087939> ${guild.members.filter(c => c.presence.status === 'idle').size} | <a:plexiDnd:478869699455746049> ${guild.members.filter(c => c.presence.status === 'dnd').size} | <a:plexiOffline:478870457848823818> ${guild.members.filter(c => c.presence.status === 'offline').size} | <a:plexiLive:478870308430938113> ${guild.members.filter(c => c.presence.game && c.presence.game.type === 1).size}`)
            .addField(`Total Commands Used`, res.commandsused, true)
            .setThumbnail(message.guild.iconURL)
            .setFooter(`Replying to: ${message.author.username}`, bot.user.displayAvatarURL)
            .setTimestamp()*/

			const embed = new MessageEmbed()
				.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
				.setColor('RANDOM')
				.setThumbnail(message.guild.iconURL({ dynamic: true }))
				.addField('> Guild Information', stripIndents`**❯ Guild Name:** ${message.guild.name}
        **❯ Guild ID:** ${message.guild.id}
        **❯ Guild Owner:** ${message.guild.owner.user.tag}
        **❯ Guild Region:** ${message.guild.region ? region[message.guild.region] : 'None'}
        **❯ Guild Verification Level:** ${verifLevels[message.guild.verificationLevel] || 'None'}
        **❯ Guild Creation Date:** ${moment.utc(message.guild.createdAt).format('L')} (${checkDays(message.guild.createdAt)})`)
				.addField('> Member Counts', stripIndents`**❯ Total:** ${message.guild.memberCount}
        **❯ Humans:** ${message.guild.members.cache.filter(member => !member.user.bot).size}
        **❯ Bots:** ${message.guild.members.cache.filter(member => member.user.bot).size}
        **❯ User Statuses:** <a:plexiOnline:478870259944783873> ${message.guild.members.cache.filter(c => c.presence.status === 'online').size} | <a:plexiAway:478870515730087939> ${message.guild.members.cache.filter(c => c.presence.status === 'idle').size} | <a:plexiDnd:478869699455746049> ${message.guild.members.cache.filter(c => c.presence.status === 'dnd').size} | <a:plexiOffline:478870457848823818> ${message.guild.members.cache.filter(c => c.presence.status === 'offline').size} | <a:plexiLive:478870308430938113> ${message.guild.members.cache.filter(c => c.presence.activities[0] && c.presence.activities[0].type === 'STREAMING').size}`)
				.addField('> Guild Metrics', stripIndents`**❯ Channels:** ${message.guild.channels.cache.size}
        **❯ Roles:** ${message.guild.roles.cache.size}
        **❯ Nitro Boosts:** ${message.guild.premiumSubscriptionCount ? message.guild.premiumSubscriptionCount : 0}
        **❯ Total Commands Used:** ${res.commandsused}
        **❯ Guild Features:**
        \`\`\`${message.guild.features.join(', ') || 'None'}\`\`\``)
				.setTimestamp();
			message.channel.send({ embed });
		});
		// })
	},
};
