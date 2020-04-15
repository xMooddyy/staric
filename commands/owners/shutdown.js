module.exports = {
	config: {
		name: 'shutdown',
		description: 'Shuts down the bot!',
		usage: '',
		category: 'owners',
		accessableby: 'Owners',
		aliases: ['botstop'],
		ownerOnly: true,
		enabled: true,
	},
	run: async (bot, message, args) => {

		try {
			await message.channel.send('Bot is shutting down...');
			process.exit(1);
		}
		catch(e) {
			message.channel.send(`ERROR: ${e.message}`);
		}


	},
};
