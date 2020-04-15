const search = require('yt-search');
const Discord = require('discord.js');

module.exports = {
	config: {
		name: 'search',
		description: 'Search for a YouTube video.',
		usage: '<song>',
		category: 'music',
		accessbeleby: 'Members',
		enabled: true,
	},
	run: async (bot, message, args) => {

		if(!message.member.voice.channel) {
			const hahaha = new Discord.MessageEmbed()
				.setTitle(':bangbang: Music warning :bangbang:')
				.setColor(0xFF0000)
				.setDescription('You have to be in a voice channel in order to play music!')
				.setThumbnail(message.author.displayAvatarURL);

			message.channel.send(hahaha);
			return;
		}

		search(args.join(' '), async function(err, res) {

			if(err) return message.channel.send('Sorry, something went wrong.');

			const videos = res.videos.slice(0, 5);


			let resp = '';
			for (let i = 0; i < videos.length; i++) {
				resp += `**[${i + 1}]:** \`${videos[i].title}\`\n`;
			}

			const embed = new Discord.MessageEmbed()
				.setTitle(`Choose a number between 1-${videos.length}!`)
				.setColor('RANDOM')
				.setDescription(resp);


			message.channel.send(embed);

			const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;


			const collector = await message.channel.createMessageCollector(filter, { time: 10000, errors: ['time'] });


			collector.videos = videos;

			collector.once('collect', function(m) {


				if(m.content.toLowerCase() === 'cancel') return message.channel.send('Cancelled.');

				const commandFile = require('./play.js');
				commandFile.run(bot, message, [this.videos[parseInt(m.content) - 1].url]);
			});
		});

	},
};
