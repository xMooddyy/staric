const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = {
	config: {
		name: 'mdn',
		description: 'Search a query in mdn document!',
		usage: '<query>',
		category: 'search',
		accessableby: 'Members',
		enabled: true,
		cooldown: 5,
	},
	run: async (bot, message, args) => {
		try {
			const a = args.join(' ');
			const query = a.replace(/#/g, '.prototype.');
			const { body } = await request
				.get('https://developer.mozilla.org/en-US/search.json')
				.query({
					q: query,
					locale: 'en-US',
					highlight: false,
				});
			if (!body.documents.length) return message.channel.send('Could not find any results.');
			const data = body.documents[0];
			const embed = new MessageEmbed()
				.setColor(0x066FAD)
				.setAuthor('MDN', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
				.setURL(`https://developer.mozilla.org/en-US/docs/${data.slug}`)
				.setTitle(data.title)
				.setDescription(data.excerpt);
			return message.channel.send(embed);
		}
		catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	},
};
