const Discord = require('discord.js');
const voteSkips = [];

module.exports = {
	config: {
		name: 'skip',
		description: 'Skip the current playing song.',
		usage: '',
		category: 'music',
		accessbeleby: 'Members',
		aliases: ['s'],
		enabled: true,
	},
	run: async (bot, message, args) => {

		const playing = bot.player.isPlaying(message.guild.id);
    if(!playing) return message.channel.send('No songs currently playing!');

		if(message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send('Sorry, you aren\'t in the voice channel as the bot.');

			const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setDescription('Successfully skipped the song!');

			message.channel.send(embed);

			bot.player.skip(message.guild.id);

	},
};
