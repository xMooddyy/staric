const { inspect } = require('util');
const Discord = require('discord.js');
const Config = require('../../models/guildSettings.js');
const momey = require('../../models/money.js');
const fetch = require('node-fetch');
const { evalset } = require('../../utils/eval.js');
const { evalcol } = require('../../utils/eval.js');
const cases = require('../../models/case.js');
const AsciiTable = require('ascii-table');
const table = new AsciiTable('A');
table.setHeading('Case', 'Action', 'User', 'Reason').addRow(1, 'Warn', 'ahmood', 'yes');

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
	run: async (bot, message, args, tools) => {

		try {
			let toEval;
			const av = '(async () => {' + toEval + '})();';
			let evaluated;
      const hrStart = process.hrtime();
      let mode = 0;

			if(args[0] === '-a') {
				toEval = args.join(' ');
        if(toEval.includes('--')) mode = toEval.split('--')[1];
        toEval = toEval.split('--')[0].slice(3);
        evaluated = await eval(`(async () => {\n${toEval}\n})();`);
			}
			else {
				toEval = args.join(' ');
        if(toEval.includes('--')) mode = toEval.split('--')[1];
        toEval = toEval.split('--')[0];
				evaluated = inspect(eval(toEval), { depth: mode });
			}

      const hrDiff = process.hrtime(hrStart);


			const options = {
				method: 'POST',
				body: evaluated,
				headers: {
					'Content-Type': 'application/json',
				},
			};


			let res = await fetch('https://hasteb.in/documents', options);
			res = await res.json();

			if (!toEval) return message.channel.send('Error while evaluating: `air`');

        if(evaluated !== undefined && evaluated !== null && evaluated.length >= 1024) {

					const embed = new Discord.MessageEmbed()
						.addField('📥 Input:', `\`\`\`js\n${toEval}\`\`\``)
            .addField('📤 Output:', `\`\`\`js\n${evaluated.chars(1014)}\`\`\``)
						.addField('📤 Full Output:', `https://hasteb.in/${res.key}`)
						.setColor('RANDOM')
						.setFooter(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.`);

					return message.channel.send(embed).then(async msg => {

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

					message.channel.send(embed).then(async msg => {

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
		catch (e) {
			console.log(e);
			await message.channel.send(`Error while evaluating: \`${e.message}\``);

		}


	},

};
