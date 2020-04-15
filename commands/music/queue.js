const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const ops = require('../../utils/queue.js');
const queue = ops.queue;


module.exports = {
	config: {
		name: 'queue',
		description: 'View the current queue.',
		usage: '',
		category: 'music',
		accessableby: 'Members',
		aliases: ['q'],
		enabled: true,
	},
	run: async (bot, message, args) => {

		const playing = bot.player.isPlaying(message.guild.id);
    if(!playing) return message.channel.send('No songs currently playing!');

    const fetched = await bot.player.getQueue(message.guild.id);

		const nowPlaying = fetched.songs[0];

		let resp = '\n';

		for (let i = 0; i < fetched.songs.length; i++) {

			resp += `**${i + 1}.** [${fetched.songs[i].name}](${fetched.songs[i].url})\n`;

		}

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setDescription(resp);

		message.channel.send(embed);

	},
};
