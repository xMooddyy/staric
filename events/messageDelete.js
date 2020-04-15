const Discord = require('discord.js');
const Config = require('../models/guildSettings.js');

module.exports = async (bot, message) => {
	Config.findOne({
		guildID: message.guild.id,
	}, (err, res) => {


		if(res.logs === false) return;


		if (res.logschannel.startsWith('<#') && res.logschannel.endsWith('>')) {
			res.logschannel = res.logschannel.slice(2, -1);
		}


		const delete1 = new Discord.MessageEmbed()
			.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setColor(0xE50000)
			.setDescription(`**Message sent by ${message.author} deleted in ${message.channel}**\n${message.cleanContent}`)
			.setFooter(`Author: ${message.author.id} | Message ID: ${message.id}`)
			.setTimestamp();
		const lagchannel = message.guild.channels.cache.find(c => c.id === res.logschannel || c.name === res.logschannel);
		lagchannel.send(delete1);

	});
};
