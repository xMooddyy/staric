const Discord = require('discord.js');
const ms = require('ms');
const moment = require('moment');
const { exec } = require('child_process');
const fetch = require('node-fetch');

module.exports = {
	config: {
		name: 'exec',
		description: 'Execute a command in console.',
		usage: '',
		category: 'owners',
		accessableby: 'Owners',
		ownerOnly: true,
		enabled: true,
	},
	run: async (bot, message, args) => {
		try {
			exec(args.join(' '), (err, stdout, stderr) => {
				if (stderr) return message.channel.send({ embed: { description: stderr } });
				message.channel.send(`\`\`\`${stdout}\`\`\``);
			});
		}
		catch (err) {
			console.log(err);
		}
	},
};
