const Discord = require('discord.js');
const ops = require('../../utils/queue.js');
const queue = ops.queue;


module.exports = {
	config: {
		name: 'stop',
		description: 'Stop the current queue.',
		usage: '',
		category: 'music',
		accessableby: 'Members',
		aliases: ['fuckoff', 'bye', 'goaway', 'disconnect'],
		enabled: true,
	},
	run: async (bot, message, args) => {

		if(!message.member.voice.channel) return message.channel.send('Please, connect to a voice channel.');

		if(!message.guild.me.voice.channel) return message.channel.send('Sorry, the bot isn\'t connected to a voice channel.');

		if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send('Sorry, you aren\'t connected to the same voice channel as me.');

		message.guild.me.voice.channel.leave();
		await bot.player.stop(message.guild.id);

		message.channel.send('**Successfully disconnected!**');

	},
};
