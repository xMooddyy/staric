const { readdirSync } = require('fs');
const { exec } = require('child_process');

module.exports = {
	config: {
		name: 'reload',
		description: 'Reloads a bot command!',
		usage: '<command>',
		category: 'owners',
		accessableby: 'Owners',
		aliases: ['creload'],
		enabled: true,
		ownerOnly: true,
	},
	run: async (bot, message, args) => {


		/* let commandName = args[1].toLowerCase()
    let category = args[0].toLowerCase()
    let command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));

    try {
        delete require.cache[require.resolve(`../${category}/${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`../${category}/${commandName}.js`)
        bot.commands.set(commandName, pull)

    } catch(e) {

        return message.channel.send(`Could not reload: \`${args[1].toUpperCase()}\``)
    }

    message.channel.send(`The command \`${args[1].toUpperCase()}\` has been reloaded!`)
    */
		if(args[0] === 'c' || args[0] === 'commands' || args[0] === '-c') {
			try {
				['miscellaneous', 'moderation', 'owners', 'roblox', 'music', 'economy', 'fun', 'search'].forEach(x => bot.commandHandler(x));
			}
			catch(e) {
				message.channel.send(`Couldn\'t reload commands: ${e}`);
				console.log(e);
			}
			message.channel.send('Reloaded all commands!');
		}
		else if(args[0] === '-a' || args[0] === 'all' || args[0] === 'bot') {
			try {
				message.channel.send('Restarting bot...');
				exec('refresh', (err, stdout, stderr) => {
					if (stderr) return message.channel.send({ embed: { description: stderr } });
				});
			}
			catch(e) {
				console.log(e);
			}
		}
	},
};
