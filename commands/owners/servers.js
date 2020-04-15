const fetch = require('node-fetch');


module.exports = {
	config: {
		name: 'servers',
		description: 'Tells you what servers the bot is in.',
		usage: '',
		category: 'owners',
		accessableby: 'Owners',
		cooldown: 3,
		ownerOnly: true,
		enabled: true,
	},
	run: async (bot, message, args) => {

		const body = bot.guilds.cache.map(g => g.available && `${g.name} [${g.id}] - ${g.memberCount} Members`).join('\n');

		const options = {
			method: 'POST',
			body: body,
			headers: {
				'Content-Type': 'text/plain',
			},
		};

		let res = await fetch('https://hasteb.in/documents', options);
		res = await res.json();

		message.channel.send(`https://hasteb.in/${res.key}`);

	},
};
