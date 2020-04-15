const Discord = require('discord.js');
const Money = require('../../models/money.js');
const ms = require('parse-ms');

module.exports = {
	config: {
		name: 'rob',
		description: 'Rob someone\'s money.',
		usage: '<user>',
		category: 'economy',
		accessableby: 'Members',
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

		const user = message.mentions.users.first();
		if(!user) return message.channel.send('Please specify who you want to rob.');
    if(user === message.author) return message.channel.send('You can\'t rob yourself.');


		Money.findOne({
			serverID: message.guild.id,
			userID: message.author.id,
		}, async (err, res) => {

			if(err) console.error(err);


			Money.findOne({
				serverID: message.guild.id,
				userID: user.id,
			}, async (err, res2) => {

				if(!res2) return message.channel.send(`${user.username} doesn't have any money.`);

				const targetuser = await res2.money;
				const author = await res.money;
				const timeout = 3600000;
				const daily = await res.rob;

				if(daily !== null && timeout - (Date.now() - daily) > 0) {
					const time = ms(timeout - (Date.now() - daily));

					message.channel.send(`You have already robbed someone.\n\nTry again in **${time.minutes}m ${time.seconds}s**!`);
				}
				else {

					const embed1 = new Discord.MessageEmbed()
						.setColor(0xff0000)
						.setDescription(`:x: | ${user.username} has no money!`);


					const embed2 = new Discord.MessageEmbed()
						.setColor(0xff0000)
						.setDescription(':x: | You need at least 250$ to rob someone.');


					if(!res2) return message.channel.send(embed1);

					if(!res) return message.channel.send(embed2);

					if (author < 250) return message.channel.send(embed2);

					if (targetuser <= 0) return message.channel.send(embed1);

					const random = Math.floor(Math.random() * 500) + 1;

					const mtoadd = random + res.money;
					const mtoremove = res2.money - random;

					const embed = new Discord.MessageEmbed()
						.setDescription(
							`You robbed ${user} and got away with ${random} money!`,
						)
						.setColor(0xadd8e6)
						.setTimestamp();

					message.channel.send(embed);


					Money.findOneAndUpdate({ serverID: message.guild.id, userID: user.id }, { $set:{ money: mtoremove } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});
					Money.findOneAndUpdate({ serverID: message.guild.id, userID: message.author.id }, { $set:{ money: mtoadd } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});
					Money.findOneAndUpdate({ serverID: message.guild.id, userID: message.author.id }, { $set:{ rob: Date.now() } }, { new: true }, (err, doc) => {

						if(err) console.error(err);

						doc.save();

					});
				}
			});

		});

	},
};
