const Discord = require('discord.js');
const Config = require('../models/guildSettings.js');
const { evalcol } = require('../utils/eval.js');
const { evalset } = require('../utils/eval.js');
const { inspect } = require('util');
const includes = ['s!ev', 's!eval'];

module.exports = async (bot, oldMessage, newMessage) => {


	if(oldMessage.author.bot) return;


	Config.findOne({
		guildID: oldMessage.guild.id,
	}, (err, res) => {


		if(res.logs === false) return;


		if (res.logschannel.startsWith('<#') && res.logschannel.endsWith('>')) {
			res.logschannel = res.logschannel.slice(2, -1);
		}

		if(oldMessage.content.startsWith('s!ev') || oldMessage.content.startsWith('s!eval')) {
			const a = evalset.get(oldMessage.id);
			const b = evalcol.get(a);
			oldMessage.channel.messages.fetch(b).then(msg => {
				const args = msg.content.slice(5).trim().split(/ +/g);
				require('../archive/eval.js').run(bot, msg, args);

				/* let embed = new Discord.RichEmbed()
      .addField("📥 Input:", `\`\`\`js\n${msg.content.slice(5)}\`\`\``)
      .addField("📤 Output:", `\`\`\`js\n${c}\n\`\`\``)
      .setColor("RANDOM")
      .setFooter(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.`)
       oldMessage.channel.fetchMessage(a).then(m => m.edit(embed));

       }
       catch(e) {
       oldMessage.channel.send(`Error while evaluating: \`${e}\``)
       }*/
			});
		}

		const lagchannel2 = oldMessage.guild.channels.cache.find(c => c.id === res.logschannel || c.name === res.logschannel);

		if(oldMessage.content !== newMessage.content) {

			const embeda = new Discord.MessageEmbed()
				.setAuthor(`${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ dynamic: true }))
				.setColor(0xadd8e6)
				.setDescription(`**Message edited in ${oldMessage.channel}** [Jump to message](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})`)
				.addField('Before', oldMessage)
				.addField('After', newMessage)
				.setFooter(`User ID: ${oldMessage.author.id}`)
				.setTimestamp();

			lagchannel2.send(embeda);
		}


	});

};
