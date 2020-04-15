module.exports = {
	config: {
		name: 'import',
		description: 'Import your saved queue!.',
		usage: '',
		category: 'music',
		accessableby: 'Members',
		aliases: ['qsaveimport'],
		enabled: true,
	},
	run: async (bot, message, args) => {
    const queue = bot.player.getQueue(message.guild.id);
    const qsaves = bot.qsaves.get(`g${message.guild.id}me${message.author.id}`);
    if(!message.guild.me.voice.channel) return message.channel.send('I am not in a voice channel.');
    if(!message.member.voice.channel || message.guild.me.voice.channel !== message.member.voice.channel) return message.channel.send('You need to be in the same voice channel as me.');
    if(!qsaves) return message.channel.send('You don\'t have a saved queue.');
    if(queue) {
    qsaves.map(s => queue.songs.push(s));
    message.channel.send('Queue imported!');
    }
    else {
      const commandfile = require('./play.js');
      await commandfile.run(bot, message, [qsaves[0].url]);
      const newq = bot.player.getQueue(message.guild.id);
      qsaves.shift();
      qsaves.map(s => newq.songs.push(s));
    }
  },
};