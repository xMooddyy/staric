const Discord = require('discord.js');

module.exports = {
	config: {
		name: 'purge',
		description: 'Clears the provided amount of messages.',
		usage: '<number>',
		category: 'moderation',
		accessableby: 'Moderators',
		aliases: ['p', 'clear'],
		userPermissions: ['MANAGE_MESSAGES'],
		botPermissions: ['MANAGE_MESSAGES'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

		if (!args[0]) return message.channel.send('Please provide how many messages you want to clear.');
		const amount = parseInt(args[0]) + 1;
		if(isNaN(amount)) return message.channel.send('You need to provide a valid number.');
		else if(amount <= 1 || amount > 100) return message.channel.send('You need to input a number between `1-99`');
		message.channel.bulkDelete(amount, true).then(() => {
			message.delete();
		}).catch(err => console.error(err));
	},
};
