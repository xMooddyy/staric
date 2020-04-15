const Discord = require('discord.js');
const Config = require('../models/guildSettings.js');

module.exports = async (bot, channel) => {

	if(channel.type === 'dm') return;

	Config.findOne({
		guildID: channel.guild.id,
	}, (err, res) => {
		if(err) console.error(err);

		if(!res) return;

		if(res.logs === false) return;

		if (res.logschannel.startsWith('<#') && res.logschannel.endsWith('>')) {
			res.logschannel = res.logschannel.slice(2, -1);
		}

		const lagchannel2 = channel.guild.channels.cache.find(c => c.id === res.logschannel || c.name === res.logschannel);

		const embed = new Discord.MessageEmbed()
			.setAuthor(`${channel.guild.name}`, channel.guild.iconURL({ dynamic: true }))
			.setDescription(`**Channel Created: #${channel.name}**`)
			.setFooter(`ID: ${channel.id}`)
			.setColor('GREEN')
			.setTimestamp();

		lagchannel2.send(embed);
	});
};
