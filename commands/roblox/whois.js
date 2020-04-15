const Discord = require('discord.js');
const fs = require('fs');
const roblox = require('noblox.js');

module.exports = {
	config: {
		name: 'whois',
		description: 'Shows a player\'s roblox profile.',
		usage: '<user>',
		category: 'roblox',
		accessableby: 'Members',
		aliases: ['rblx', 'roblox'],
		enabled: true,
	},
	run: async (bot, message, args) => {

		if(!args[0]) {


			const filter = m => m.author.id === message.author.id;
			message.channel.send('Type the player\'s username!\nRespond with `cancel` to cancel the command. The command will automatically be cancelled in 10 seconds.');
			message.channel.awaitMessages(filter, {
				max: 1,
				time: 10000,
			}).then(collected => {
				if(collected.first().content === 'cancel') {
					return message.channel.send('Cancelled command!');

				}


				const username = collected.first().content;
				if (username) {
					roblox.getIdFromUsername(username).then(id => {
						if (id) {
							roblox.getPlayerInfo(parseInt(id)).then(function(info) {

								const rolecolor = message.member.roles.highest.hexColor;

								const date = new Date(info.joinDate);
								const embed = new Discord.MessageEmbed()
									.setURL(`https://roblox.com/users/${id}/profile`)
									.setTimestamp()
									.setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
									.addField('Username', info.username || 'Unresolvable', true)
									.addField('User ID', id || 'Unresolvable', true)
									.addField('Bio', info.blurb || 'Nothing', true)
									.addField('Status', info.status || 'Nothing', true)
									.addField('Account Age', `${info.age} days old` || 'Unresolvable')
									.addField('User Link', `https://roblox.com/users/${id}/profile`)
									.setFooter('Developed by: ahmood', bot.user.avatarURL({ dynamic: true }))
									.setColor(rolecolor || 0xadd8e6);
								message.channel.send(embed);


							});
						}

					}).catch(function(err) {
						message.channel.send('Sorry, that user doesn\'t seem to exist, double check your spelling and try again!');
					});

				}


			}).catch(err => {
				message.channel.send('**Cancelled prompt.**');
			});

		}
		else if(args[0]) {

			const username = args[0];
			if (username) {
				roblox.getIdFromUsername(username).then(id => {
					if (id) {
						roblox.getPlayerInfo(parseInt(id)).then(function(info) {

							const rolecolor = message.member.roles.highest.hexColor;
							const date = new Date(info.joinDate);
							const embed = new Discord.MessageEmbed()

								.setColor(rolecolor || 0xadd8e6)
								.setURL(`https://roblox.com/users/${id}/profile`)
								.setTimestamp()
								.setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
								.addField('Username', info.username || 'Unresolvable', true)
								.addField('User ID', id || 'Unresolvable', true)
								.addField('Bio', info.blurb || 'Nothing', true)
								.addField('Status', info.status || 'Nothing', true)
								.addField('Account Age', `${info.age} days old` || 'Unresolvable')
								.addField('User Link', `https://roblox.com/users/${id}/profile`)
								.setFooter('Developed by: ahmood', bot.user.avatarURL({ dynamic: true }));
							message.channel.send(embed);


						});
					}

				}).catch(function(err) {
					message.channel.send('Sorry, that user doesn\'t seem to exist, double check your spelling and try again!');
				});


			}
		}
	},


};
