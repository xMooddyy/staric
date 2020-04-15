const Discord = require('discord.js');


module.exports = {
	config: {
		name: 'support',
		description: 'Support.',
		usage: '',
		category: 'miscellaneous',
		accessableby: 'Members',
		aliases: ['sp'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

		const bicon = bot.user.displayAvatarURL({ dynamic: true });
		const embed = new Discord.MessageEmbed()
			.setColor('#ADD8E6')
			.setThumbnail(bicon)
			.setTitle('Support Info')
			.addField('To see the bot commands use', '`s!help`')
			.addField('To report a bug use', '`s!contact`')
			.addField('Add the bot to your server', '[Click Here!](https://discordapp.com/oauth2/authorize?client_id=614175460313661470&permissions=8&scope=bot)')
			.addField('If you need help with something else', '[Support Sever](https://discord.io/staric)');

		message.channel.send(embed);


	},
};
