const Discord = require('discord.js');
const send = require('quick.hook');
const moment = require('moment');


module.exports = {
	config: {
		name: 'suggest',
		description: 'Add a suggest for the server.',
		usage: '<suggestion>',
		category: 'miscellankeous',
		accessableby: 'Members',
		aliases: ['sg'],
		cooldown: 3,
		enabled: false,
	},
	run: async (bot, message, args) => {
		const guild = message.guild;
		const cnl = message.guild.channels.find(c => c.name === 'suggestions');

		const errembed = new Discord.RichEmbed()
			.setColor(0xff0000)
			.setDescription('There was an error while trying to submit your suggestion, please try again later.');

		if(!cnl) return message.channel.send(errembed);

		const thxembed = new Discord.RichEmbed()
			.setColor(0x00ff00)
			.setDescription(`Thanks for submitting a suggestion, **${message.author.username}**! Your suggestion is now on process.`);


		message.channel.send(thxembed);
		const embed = new Discord.RichEmbed()
			.setAuthor(`Suggestion from ${message.author.tag}`, message.author.displayAvatarURL)
			.addField('Suggestion:', `${args.join(' ')}`)
			.setThumbnail(message.author.displayAvatarURL)
			.setColor(0xadd8e6)
			.setTimestamp();

		message.delete(5000);

		cnl.send(embed).then(async sentEmbed => {

			await sentEmbed.react('✅');
			await sentEmbed.react('❌');
		})


			.catch(e => bot.logger.error(e));


	},
};
