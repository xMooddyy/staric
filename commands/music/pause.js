const Discord = require('discord.js');

module.exports = {
	config: {
		name: 'pause',
		description: 'Pause the music.',
		usage: '',
		category: 'music',
		accessableby: 'Members',
		enabled: true,
	},
	run: async (bot, message, args) => {

    const playing = bot.player.isPlaying(message.guild.id);
    if(!playing) return message.channel.send('No songs currently playing!');

    const queue = await bot.player.getQueue(message.guild.id);

    if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel.');

		if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send('Sorry, you aren\'t in the voice channel as me.');

		if(!queue.playing) return message.channel.send('This music is already paused.');

    await bot.player.pause(message.guild.id);

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setDescription(`Successfully paused **${queue.songs[0].name}**`);

		message.channel.send(embed);
	},

};
