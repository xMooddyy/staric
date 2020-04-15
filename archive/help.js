const { RichEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const Config = require('../../models/guildSettings.js');
const { stripIndents } = require('common-tags');
const { white } = require('../../colours.json');
const ms = require('ms');

module.exports = {
	config: {
		name: 'help',
		aliases: ['h', 'halp', 'commands'],
		usage: '(command) | s!help',
		category: 'miscellaneous',
		description: 'Displays all commands that the bot has.',
		accessableby: 'Members',
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args, db) => {
		Config.findOne({
			guildID: message.guild.id,
		}, (err, res) => {

			if(err) console.error(err);

			const stats = {
				true: 'Enabled',
				false: 'Disabled',
			};

			const inline = true;

			const embed = new RichEmbed()
				.setColor('RANDOM')
				.setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
				.setThumbnail(bot.user.displayAvatarURL);

			if(!args[0]) {
				const categories = readdirSync('./commands/');

				embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``);
				embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

				categories.forEach(category => {
					const dir = bot.commands.filter(c => c.config.category === category);
					const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
					try {
						if(message.author.id === '413834975347998720') embed.addField(`> ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(' | '));
						else if(category !== 'owners') embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(' | '));
					}
					catch(e) {
						console.log(e);
					}
				});

				return message.channel.send(embed);
			}
			else {
				let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
				if(!command) return message.channel.send(embed.setTitle('Invalid Command.').setDescription(`Do \`${res.prefix}help\` for the list of the commands.`));
				command = command.config;

				embed.setDescription(stripIndents`The bot's prefix is: \`${res.prefix}\`\n<> means required and () means optional.\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || 'No Description provided.'}
            **Usage:** ${command.usage ? `\`${res.prefix}${command.name} ${command.usage}\`` : `\`${res.prefix}${command.name}\``}
            **Accessible by:** ${command.accessableby || 'Members'}
            **Aliases:** ${command.aliases ? command.aliases.join(', ') : 'None.'}
            **Cooldown:** ${command.cooldown ? ms(command.cooldown * 1000, { long: true }) : 'No cooldown specified.'}
            **State:** ${stats[command.enabled]}`);

				return message.channel.send(embed);
			}


		});
	},
};
