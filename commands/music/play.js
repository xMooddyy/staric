const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const ops = require('../../utils/queue.js');
const queue = ops.queue;


module.exports = {
	config: {
		name: 'play',
		description: 'Plays music.',
		usage: '<song name/url>',
		category: 'music',
		accessableby: 'Members',
		enabled: true,
	},
	run: async (bot, message, args) => {

		if(!args[0]) {
			const linkprovideembed = new Discord.MessageEmbed()
				.setTitle('**:bangbang: Music Warning :bangbang:**')
				.setDescription('You need to provide a link or the song\'s name!')
				.setThumbnail(message.author.avatarURL({ dynamic: true }))
				.setColor(0xFF0000);
			message.channel.send(linkprovideembed);
			return ;
		}

		if(!message.member.voice.channel) {
			const joinvoicechannelembed = new Discord.MessageEmbed()
				.setTitle('**:bangbang: Music Warning :bangbang:**')
				.setDescription('You need to be in a voice channel in order to play music!')
				.setColor(0xFF0000)
				.setThumbnail(message.author.avatarURL({ dynamic: true }));
			message.channel.send(joinvoicechannelembed);
			return;

		}

		const validate = await ytdl.validateURL(args[0]);

		if(!validate) {
			const commandFile = require('./search.js');
			return commandFile.run(bot, message, args);
		}

		const isPlaying = bot.player.isPlaying(message.guild.id);

    if(isPlaying) {
      const song = await bot.player.addToQueue(message.guild.id, args[0]);

      message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`Added to queue: [${song.name}](${song.url})`));
    }
    else {
      const song = await bot.player.play(message.member.voice.channel, args[0]);
      song.queue.on('end', () => {
        message.channel.send('No more music in the queue!');
      })
      .on('songChanged', (old, newS, skipped, repeat) => {
        if(repeat) {
        message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`Now playing: [${newS.name}](${newS.url})`));
        }
        else {
          message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`Now playing: [${newS.name}](${newS.url})`));
        }
      }).on('channelEmpty', () => {
        message.channel.send('No members in the voice channel, leaving...');
      });
      message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`Now playing: [${song.name}](${song.url})`));
    }


	},
};
