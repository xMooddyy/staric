const { RichEmbed } = require('discord.js');
const Config = require('../../models/guildSettings.js');

module.exports = {
	config: {
		name: 'softban',
		description: 'Softbans a user from the guild!',
		usage: '<user> (reason)',
		category: 'moderation',
		accessableby: 'Administrators',
		aliases: ['sb', 'sbanish', 'sremove'],
		userPermissions: ['BAN_MEMBERS'],
		botPermissions: ['BAN_MEMBERS'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args, db) => {

    if(!args[0]) return message.channel.send('Provide a user to ban.');

		const banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!banMember) return message.channel.send('Couldn\'t find that user.');

		let reason = args.slice(1).join(' ');
		if(!reason) reason = 'No reason given!';

		banMember.ban({ days: 1, reason: reason }).then(() => setTimeout(() => { message.guild.members.unban({ reason: 'Softban' }).catch(err => console.log(err));}, 86400000));

		message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete(5000));

    const ress = await cases.find({ guildID: message.guild.id });
      let caseid;

    for (let i = 0; i < ress.length; i++) {
      caseid = ress[i].caseid;
    }

    const newCase = new cases({
      guildID: message.guild.id,
      action: 'softban',
      mUserID: message.author.id,
      wUserID: banMember.user.id,
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
				.setAuthor(`Case ${caseid + 1 || 1} | Softban | ${banMember.user.tag}`, banMember.user.displayAvatarURL({ dynamic: true }))
				.addField('User', banMember.user.tag, true)
				.addField('Moderator', message.author, true)
				.addField('Reason', reason, true)
				.setTimestamp()
				.setColor('RANDOM')
				.setFooter(`ID: ${banMember.id}`);

			if(res.modlog === true) channel.send(embed);
		});


	},
};
