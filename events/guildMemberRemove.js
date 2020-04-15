const Discord = require('discord.js');
const Config = require('../models/guildSettings.js');
const leavemessages = require('../assets/leave.json');

module.exports = async (bot, member) => {


	Config.findOne({
		guildID: member.guild.id,
	}, (err, res) => {

		if(err) console.error(err);

		if(res.leavelog === false) return;

		if (res.leavechannel.startsWith('<#') && res.leavechannel.endsWith('>')) {
			res.leavechannel = res.leavechannel.slice(2, -1);
		}

		const channel2 = member.guild.channels.cache.find(c => c.id === res.leavechannel || c.name === res.leavechannel);
		if(!channel2) return;

		const leave = leavemessages[Math.floor(Math.random() * leavemessages.length)];

		const leavembed = new Discord.MessageEmbed()
			.setColor('RED')
			.setDescription(leave.replace(/\{\{user\}\}/g, member.user.tag));

		channel2.send(leavembed);


	});
};
