const Discord = require('discord.js');
const jimp = require('jimp');
const Xp = require('../../models/xp.js');
const fetch = require('node-superfetch');
const sources = ['akairo', 'akairo-master', 'commando'];

module.exports = {
	config: {
		name: 'docs',
		description: 'Search a query in discord.js docs!',
		usage: '<query> (--source)',
		category: 'search',
		accessableby: 'Members',
		enabled: true,
		cooldown: 5,
	},
	run: async (bot, message, args) => {


		let query = args.join('');
		if(!query) return message.channel.send('Please specify something to search.');
		if(query.includes('--')) query = query.split('--')[0];
		let type = args.join(' ').split('--')[1] || 'stable';
		if(!sources.includes(type)) type = `https://raw.githubusercontent.com/discordjs/discord.js/docs/${type}.json`;
		fetch.get(`https://djsdocs.sorta.moe/v2/embed?src=${type}&q=${query.replace(/#/g, '.')}`)
			.then((res) => {
				if(!res.body) return message.channel.send('Could not fetch any search results');
				return message.channel.send({ embed: res.body });
			}).catch(() => message.channel.send('Could not fetch any search results. Invalid source'));

	},
};
