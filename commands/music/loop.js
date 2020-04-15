const Discord = require('discord.js');

module.exports = {
	config: {
		name: 'loop',
		description: 'Enable/disable music loop.',
		usage: '',
		category: 'music',
		accessbeleby: 'Members',
		enabled: true,
	},
	run: async (bot, message, args) => {

		if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use this commandl.');
		if (!message.guild.me.voice.channel) return message.channel.send('I am not in a voice channel.');
		if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send('You need to be in the same voice channel as me to use this command.');

    const isPlaying = await bot.player.isPlaying(message.guild.id);
    if(!isPlaying) return message.channel.send('There\'s no music in the queue.');

    const queue = await bot.player.getQueue(message.guild.id);

    if(queue.repeatMode === true) {
      bot.player.setRepeatMode(message.guild.id, false);
      message.channel.send('Disabled loop!');
    }
    else {
      bot.player.setRepeatMode(message.guild.id, true);
      message.channel.send('Enabled loop!');
    }

	},
};
