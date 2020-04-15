const { inspect } = require('util');
const Discord = require('discord.js');
const Config = require('../models/guildSettings.js');
const momey = require('../models/money.js');
const fetch = require('node-fetch');
const { evalset } = require('../utils/eval.js');
const { evalcol } = require('../utils/eval.js');

module.exports = {
	config: {
		name: 'eval',
		description: 'Evaluate codes',
		accessableby: 'Owners',
		category: 'owners',
		usage: '<input>',
		aliases: ['ev'],
		ownerOnly: true,
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args, tools, redisc) => {

		this.bot = bot;

		try {
			let toEval;
			const av = '(async () => {' + toEval + '})();';
			let evaluated;
      const hrStart = process.hrtime();
      let mode = 0;

			if(args[0] === '-a') {
				toEval = args.slice(1).join(' ');
        evaluated = await eval(`(async () => {\n${toEval}\n})();`);
			}
			else {
				toEval = args.join(' ');
        if(toEval.includes('--')) mode = toEval.split('--')[1];
        toEval = toEval.split('--')[0];
				evaluated = await inspect(eval(toEval), { depth: mode });
			}

      const hrDiff = process.hrtime(hrStart);
			const a = evalset.get(message.id);
			const b = evalcol.get(a);

			message.channel.messages.fetch(a).then(async massage => {

				const options = {
					method: 'POST',
					body: evaluated,
					headers: {
						'Content-Type': 'application/json',
					},
				};


				let res = await fetch('https://hasteb.in/documents', options);
				res = await res.json();

				if (!toEval) {
					return message.channel.send('Error while evaluating: `air`');
				}
				else {

					if(evaluated.includes(process.env.TOKEN)) return message.channel.send('No.');
					if(evaluated.length >= 1024) {

						const embed = new Discord.MessageEmbed()
							.addField('📥 Input:', `\`\`\`js\n${toEval}\`\`\``)
							.addField('📤 Output:', `https://hasteb.in/${res.key}`)
							.setColor('RANDOM')
							.setFooter(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.`);

						return massage.edit(embed).then(async msg => {

							await msg.react('❌');
							evalcol.set(msg.id, message.id);
							evalset.set(message.id, msg.id);

							msg.awaitReactions((reaction, user) => user.id == message.author.id && reaction.emoji.name == '❌',
								{ max: 1 }).then(collected => {
								if(collected.first().emoji.name == '❌') {

									msg.delete();
								}
							});
						});
					}
					else {
						const embed = new Discord.MessageEmbed()
							.addField('📥 Input:', `\`\`\`js\n${toEval}\`\`\``)
							.addField('📤 Output:', `\`\`\`js\n${evaluated}\n\`\`\``)
							.setColor('RANDOM')
							.setFooter(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.`);


						massage.edit(embed).then(async msg => {

							await msg.react('❌');
							evalcol.set(msg.id, message.id);
							evalset.set(message.id, msg.id);

							msg.awaitReactions((reaction, user) => user.id == message.author.id && reaction.emoji.name == '❌',
								{ max: 1 }).then(collected => {
								if(collected.first().emoji.name == '❌') {

									msg.delete();
								}
							});
						});


					}
				}

			});
		}
		catch (e) {
			await message.channel.send(`Error while evaluating: \`${e.message}\``);
			console.log(e);

		}


	},
};
