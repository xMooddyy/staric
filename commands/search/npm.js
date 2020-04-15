const moment = require('moment');
const request = require('node-superfetch');
const Discord = require('discord.js');

function trimArray(arr, maxLen = 10) {
	if (arr.length > maxLen) {
		const len = arr.length - maxLen;
		arr = arr.slice(0, maxLen);
		arr.push(`${len} more...`);
	}
	return arr;
}

module.exports = {
	config: {
		name: 'npm',
		description: 'Search a query in npm!',
		usage: '<query>',
		category: 'search',
		accessableby: 'Members',
		enabled: true,
		cooldown: 5,
	},
	run: async (bot, message, args) => {


		const pkg = args.join('-');

		if(!pkg) return message.channel.send('Cannot find package: `air`');

		try {
			const { body } = await request.get(`https://registry.npmjs.com/${pkg}`);
			if (body.time.unpublished) return message.channel.send('This package no longer exists.');
			const version = body.versions[body['dist-tags'].latest];
			const maintainers = trimArray(body.maintainers.map(user => user.name));
			const dependencies = version.dependencies ? trimArray(Object.keys(version.dependencies)) : null;
			const embed = new Discord.MessageEmbed()
				.setColor(0xCB0000)
				.setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
				.setTitle(body.name)
				.setURL(`https://www.npmjs.com/package/${pkg}`)
				.setDescription(body.description || 'No description.')
				.addField('❯ Version', body['dist-tags'].latest, true)
				.addField('❯ License', body.license || 'None', true)
				.addField('❯ Author', body.author ? body.author.name : '???', true)
				.addField('❯ Creation Date', moment.utc(body.time.created).format('MM/DD/YYYY'), true)
				.addField('❯ Modification Date', moment.utc(body.time.modified).format('MM/DD/YYYY'), true)
				.addField('❯ Main File', version.main || 'index.js', true)
				.addField('❯ Dependencies', dependencies && dependencies.length ? dependencies.join(', ') : 'None')
				.addField('❯ Maintainers', maintainers.join(', '));
			return message.channel.send(embed);
		}
		catch (err) {
			if (err.status === 404) return message.channel.send('Could not find any results.');
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}

	},
};
