const { MessageEmbed } = require('discord.js');
const Config = require('../../models/guildSettings.js');


module.exports = {
	config: {
		name: 'unban',
		description: 'Unban a user from the guild!',
		usage: '<user>',
		category: 'moderation',
		accessableby: 'Administrators',
		aliases: ['ub', 'unbanish'],
		userPermissions: ['BAN_MEMBERS'],
		botPermissions: ['BAN_MEMBERS'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

    if(!args[0]) return message.channel.send('Provide a user ID to unban.');
    if(isNaN(args[0])) return message.channel.send('You need to provide an ID.');
		const bannedMember = await bot.users.fetch(args[0]);
		if(!bannedMember) return message.channel.send('Couldn\'t find that user.');
    let reason = args.slice(1).join(' ');
    if(!reason) reason = 'No reason given.';

		message.delete();
		try {
			message.guild.unban(bannedMember);
			message.channel.send(`***${bannedMember.tag} has been unbanned.***`);
		}
		catch(e) {
			console.log(e.message);
		}

    const ress = await cases.find({ guildID: message.guild.id });
      let caseid;

    for (let i = 0; i < ress.length; i++) {
      caseid = ress[i].caseid;
    }

    const newCase = new cases({
      guildID: message.guild.id,
      action: 'unban',
      mUserID: message.author.id,
      wUserID: mutee.user.id,
      reason: reason,
      caseid: caseid + 1 || 1
    });

    newCase.save();

		Config.findOne({
			guildID: message.guild.id,
		}, (err, res) => {
			if(err) console.error(err);


			if(res.modlogchannel.startsWith('<#') && res.modlogchannel.endsWith('>')) {
				res.modlogchannel = res.modlogchannel.slice(2, -1);
			}

			const channel = message.guild.channels.cache.find(c => c.name === res.modlogchannel || c.id === res.modlogchannel);

			const embed = new MessageEmbed()
				.setAuthor(`${caseid + 1 || 1} | Unban | ${bannedMember.tag}`, bannedMember.displayAvatarURL({ dynamic: true }))
				.addField('User', bannedMember.tag, true)
				.addField('Moderator', message.author, true)
				.setTimestamp()
				.setColor('RANDOM')
				.setFooter(`ID: ${bannedMember.id}`);


			if(res.modlog === true) return channel.send(embed);
		});

	},
};
