const Discord = require('discord.js');

module.exports = {
	config: {
		name: 'join',
		description: 'Make the bot join a voice channel.',
		usage: '',
		category: 'music',
		accessableby: 'Members',
		aliases: ['come', 'connect'],
		enabled: true,
	},
	run: async (bot, message, args) => {

		if(!message.member.voice.channel) return message.channel.send('You have to be in a voice channel.');

//		if(message.guild.me.voice.channel.id == message.member.voice.channel.id) return message.channel.send('I am already in a voice channel.');

		message.member.voice.channel.join();

		message.channel.send('**Successfully joined!**');

	},
};
