const Discord = require('discord.js');

module.exports = {
	config: {
		name: 'resume',
		description: 'Resume the paused music.',
		usage: '',
		category: 'music',
		accessableby: 'Members',
		enabled: true,
	},
	run: async (bot, message, args) => {

		const playing = bot.player.isPlaying(message.guild.id);
    if(!playing) return message.channel.send('No songs currently playing!');

		if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send('Sorry, you aren\'t in the voice channel as the bot.');

    const queue = await bot.player.getQueue(message.guild.id);

		if(queue.playing) return message.channel.send('This music isn\'t paused.');

		await bot.player.resume(message.guild.id);

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setDescription(`Successfully resumed **${queue.songs[0].name}**`);

		message.channel.send(embed);

	},
};
