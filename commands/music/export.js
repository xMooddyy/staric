module.exports = {
	config: {
		name: 'export',
		description: 'Save the queue to use it later.',
		usage: '',
		category: 'music',
		accessableby: 'Members',
		aliases: ['qsave'],
		enabled: true,
	},
	run: async (bot, message, args) => {
    const queue = bot.player.getQueue(message.guild.id);
    if(!message.guild.me.voice.channel) return message.channel.send('I am not in a voice channel.');
    if(!message.member.voice.channel || message.guild.me.voice.channel !== message.member.voice.channel) return message.channel.send('You need to be in the same voice channel as me.');
    if(!queue || !queue.songs || queue.songs.length < 2) return message.channel.send('Maybe you should fill the queue.');
    for (let i = 0; i < queue.songs.length; i++) {
      queue.songs[i].queue = null;
    }
    await bot.qsaves.set(`g${message.guild.id}me${message.author.id}`, queue.songs);
    message.channel.send('Saved!');
  },
};