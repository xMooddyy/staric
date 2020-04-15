const Discord = require('discord.js');
const Config = require('../models/guildSettings.js');

module.exports = async (bot, guild, user) => {

	Config.findOne({
		guildID: guild.id,
	}, (err, res) => {
		if(err) console.error(err);

		if(res.logs === false) return;

		if (res.logschannel.startsWith('<#') && res.logschannel.endsWith('>')) {
			res.logschannel = res.logschannel.slice(2, -1);
		}

		const lagchannel2 = guild.channels.cache.find(c => c.id === res.logschannel || c.name === res.logschannel);

		const embed = new Discord.MessageEmbed()
			.setAuthor('Member Banned', user.displayAvatarURL({ dynamic: true }))
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.setDescription(`${user} ${user.tag}`)
			.setColor('RED')
			.setFooter(`ID: ${user.id}`);

		lagchannel2.send(embed);
	});
};
