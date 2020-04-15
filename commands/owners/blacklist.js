const users = require('../../models/blacklistedusers.js');


module.exports = {
	config: {
		name: 'blacklist',
		description: 'Blacklist a user from using the bot.',
		accessableby: 'Owners',
		category: 'owners',
		usage: '<user>',
		ownerOnly: true,
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

		const user = message.mentions.users.first();
		if(!user) return message.channel.send('Provide a user to blacklist.');

		let reason = args.slice(1).join(' ');
		if(!reason) reason = 'No reason given.';

		if(user.id === '413834975347998720') return message.channel.send('No.');

		const newusers = new users({
			userID: user.id,
			reason: reason,
		});

		newusers.save();

		message.channel.send(`Successfully blacklisted ${user.tag}!`);


	},
};
