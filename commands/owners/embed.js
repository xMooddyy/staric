const Discord = require('discord.js');


module.exports = {
	config: {
		name: 'embed',
		description: 'Sends an embed.',
		usage: '<title> <color> <description>',
		category: 'owners',
		accessableby: 'Owners',
		aliases: ['emb'],
		enabled: true,
		ownerOnly: true,
	},
	run: async (bot, message, args, tools) => {

		const cmd = args.join(' ').split(' / ');


		const emb = new Discord.MessageEmbed()
			.setTitle(cmd[0])
			.setColor(cmd[1])
			.setDescription(cmd[2])
			.setFooter('Developed by: ahmood')
			.setTimestamp();

		message.channel.send(emb);


	},
};
