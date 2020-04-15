const Discord = require('discord.js');
const Config = require('../models/guildSettings.js');

module.exports = async (bot, role) => {

	Config.findOne({
		guildID: role.guild.id,
	}, (err, res) => {
		if(err) console.error(err);

		if(res.logs === false) return;

		if (res.logschannel.startsWith('<#') && res.logschannel.endsWith('>')) {
			res.logschannel = res.logschannel.slice(2, -1);
		}

		const lagchannel2 = role.guild.channels.cache.find(c => c.id === res.logschannel || c.name === res.logschannel);

		const embed = new Discord.MessageEmbed()
			.setAuthor(`${role.guild.name}`, role.guild.iconURL({ dynamic: true }))
			.setDescription(`**Role Deleted: ${role.name}**`)
			.setFooter(`ID: ${role.id}`)
			.setColor('RED')
			.setTimestamp();

		lagchannel2.send(embed);
	});
};
