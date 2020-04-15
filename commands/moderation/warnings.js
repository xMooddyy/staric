const Discord = require('discord.js');
const cases = require('../../models/case.js');
const mongoose = require('mongoose');

module.exports = {
	config: {
		name: 'warnings',
		description: 'Show how many warnings an user have.',
		usage: '<user>',
		category: 'moderation',
		accessableby: 'Administrators',
		userPermissions: ['KICK_MEMBERS'],
		aliases: ['we'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM');

    if(!args[0]) return message.channel.send('Provide a user to show the warnings for.');

		const userl = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!userl) return message.channel.send('Couldn\'t find that user.');

			const guild = await cases.find({ guildID: message.guild.id, wUserID: userl.user.id, action: 'warn' });

        if(!guild[0]) return message.channel.send(`There are no warnings for ${userl.user.tag}.`);


				for (let i = 0; i < guild.length; i++) {

					const wUser = message.guild.members.cache.get(guild[i].wUserID);
					if(!wUser) return message.channel.send('That user isn\'t in the server.');
					const mUser = message.guild.members.cache.get(guild[i].mUserID);
					if(!mUser) return message.channel.send('The moderator isn\'t in the server.');

					if(!wUser.id) return message.channel.send(`There's no warnings for ${userl.user.username}`);

          embed.setAuthor(`${guild.length} Warnings for ${wUser.user.tag} (${wUser.user.id})`, wUser.user.displayAvatarURL({ dynamic: true }));
					embed.addField(`ID: ${guild[i].caseid} | Moderator: ${wUser.user.tag}`, guild[i].reason);

				}

				message.channel.send(null, embed, { split: true });

	},
};
