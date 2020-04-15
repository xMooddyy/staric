const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
function convertMs(milliseconds) {
		const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
		const days = roundTowardsZero(milliseconds / 86400000),
		hours = roundTowardsZero(milliseconds / 3600000) % 24,
		minutes = roundTowardsZero(milliseconds / 60000) % 60;
		let seconds = roundTowardsZero(milliseconds / 1000) % 60;
		if(seconds === 0) {
			seconds++;
		}
		const isDays = days > 0,
		isHours = hours > 0,
		isMinutes = minutes > 0;
		const pattern =
		(!isDays ? '' : (isMinutes || isHours) ? '{days} days, ' : '{days} days and ') +
		(!isHours ? '' : (isMinutes) ? '{hours} hours, ' : '{hours} hours and ') +
		(!isMinutes ? '' : '{minutes} minutes and ') +
		('{seconds} seconds');
		const sentence = pattern
			.replace('{duration}', pattern)
			.replace('{days}', days)
			.replace('{hours}', hours)
			.replace('{minutes}', minutes)
			.replace('{seconds}', seconds);
		return sentence;
	}

module.exports = {
	config: {
		name: 'nowplaying',
		description: 'Displays what the bot is currently playing.',
		usage: '',
    aliases: ['np', 'now'],
		category: 'music',
		accessbeleby: 'Members',
		enabled: true,
	},
	run: async (bot, message, args) => {

    const playing = bot.player.isPlaying(message.guild.id);
    if(!playing) return message.channel.send('No songs currently playing!');

    const queue = await bot.player.nowPlaying(message.guild.id);

    const embed = new Discord.MessageEmbed()
    .setAuthor('Now Playing', message.author.displayAvatarURL({ dynamic: true }))
    .setColor('RANDOM')
    .setThumbnail(queue.thumbnail)
    .setDescription(stripIndents`[${queue.name}](${queue.url})

            \`Looping:\` **${queue.repeatMode ? 'Enabled' : 'Disabled'}**

            \`Duration:\` **${convertMs(queue.duration)}**

            \`Author:\` **${queue.author}**
`);

    message.channel.send(embed);
  },
};