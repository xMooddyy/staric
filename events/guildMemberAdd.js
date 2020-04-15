const Discord = require('discord.js');
const Config = require('../models/guildSettings.js');
const welcomemessages = require('../assets/welcome.json');

module.exports = async (bot, member) => {
	Config.findOne({
		guildID: member.guild.id,
	}, (err, res) => {

		if(err) console.error(err);

		if(!res) return;

		if(res.welcomelog === false) return;


		if (res.welcomechannel.startsWith('<#') && res.welcomechannel.endsWith('>')) {
			res.welcomechannel = res.welcomechannel.slice(2, -1);
		}

		const channel6 = member.guild.channels.cache.find(c => c.id === res.welcomechannel || c.name === res.welcomechannel);
		if(!channel6) return;


		const wlecome =
    welcomemessages[Math.floor(Math.random() * welcomemessages.length)];

		const welembed = new Discord.MessageEmbed()
		// .setTitle('New member!')
			.setColor('GREEN')
		// .setThumbnail(member.user.displayAvatarURL)
			.setDescription(wlecome.replace(/\{\{user\}\}/g, member.user.username));

		channel6.send(welembed);


	});


};
