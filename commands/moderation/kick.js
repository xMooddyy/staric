const { MessageEmbed } = require('discord.js');
const Config = require('../../models/guildSettings.js');
const cases = require('../../models/case.js');

module.exports = {
	config: {
		name: 'kick',
		description: 'Kick a user from the guild!',
		usage: '<user> (reason)',
		category: 'moderation',
		accessableby: 'Moderator',
		aliases: ['k'],
		userPermissions: ['KICK_MEMBERS'],
		botPermissions: ['KICK_MEMBERS'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {


		// if(!message.member.hasPermission(["KICK_MEMBERS"])) return errors.usernoPerms(message, "KICK_MEMBERS")

    if(!args[0]) return message.channel.send('Provide a user to kick.');

		const kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!kickMember) return message.channel.send('Couldn\'t find that user.');

		let reason = args.slice(1).join(' ');
		if(!reason) reason = 'No reason given.';

		if (!message.guild.member(kickMember).kickable) return message.channel.send('I can\'t kick that user.');

		kickMember.kick().catch(err => console.error(err));

		message.channel.send(`***${kickMember.user.tag} has been kicked.***`).then(m => m.delete({ timeout: 5000 }));

    const ress = await cases.find({ guildID: message.guild.id });
      let caseid;

    for (let i = 0; i < ress.length; i++) {
      caseid = ress[i].caseid;
    }

    const newCase = new cases({
      guildID: message.guild.id,
      action: 'kick',
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
				.setAuthor(`Case ${caseid + 1 || 1} | Kick | ${kickMember.user.tag}`, kickMember.user.displayAvatarURL({ dynamic: true }))
				.addField('User', kickMember.user.tag, true)
				.addField('Moderator', message.author, true)
				.addField('Reason', reason, true)
				.setTimestamp()
				.setColor('RANDOM')
				.setFooter(`ID: ${kickMember.id}`);

			if(res.modlog === true) return channel.send(embed);
		});


	},
};
