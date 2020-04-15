module.exports = {
	config: {
		name: 'lmgtfy',
		description: 'Search a query in lmgtfy!',
		usage: '<query>',
		category: 'search',
		accessableby: 'Members',
		enabled: true,
		cooldown: 5,
	},
	run: async (bot, message, args) => {
		const query = args.join(' ');
		if(!query) return message.channel.send('What do you want to search?');

		const search = encodeURI(query);
    if(search >= 1950) return message.channel.send('Invalid query, your query is too long.');

		message.channel.send(`https://lmgtfy.com/?q=${search}`);
	},
};
