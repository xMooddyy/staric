const Discord = require('discord.js');

module.exports = {
	config: {
		name: 'volume',
		description: 'Change the volume!.',
		usage: '<number>',
		category: 'music',
		accessbeleby: 'Members',
		aliases: ['vol'],
		enabled: false,
	},
	run: async (bot, message, args) => {

    const playing = bot.player.isPlaying(message.guild.id);
    if(!playing) return message.channel.send('No songs currently playing!');

		const queue = await bot.player.getQueue(message.guild.id);

		if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send('Sorry, you aren\'t in the voice channel as me.');

		if(isNaN(args[0]) || args[0] > 100 || args[0] < 0) return message.channel.send('Input a number between `1-100`');

		bot.player.setVolume(args[0] / 100);

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setDescription(`**Volume:** Volume is now ${args[0]}/100%`);

		message.channel.send(embed);

	},
};
