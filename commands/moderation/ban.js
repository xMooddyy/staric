const { MessageEmbed } = require('discord.js');
const { redlight } = require('../../colours.json');
const Config = require('../../models/guildSettings.js');
const cases = require('../../models/case.js');

module.exports = {
	config: {
		name: 'ban',
		description: 'Bans a user from the guild!',
		usage: '<user> (reason)',
		category: 'moderation',
		accessableby: 'Administrators',
		aliases: ['b', 'banish', 'remove'],
		userPermissions: ['BAN_MEMBERS'],
		botPermissions: ['BAN_MEMBERS'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {


		Config.findOne({
			guildID: message.guild.id,
		}, async (err, res) => {
			if(err) console.error(err);

      const ress = await cases.find({ guildID: message.guild.id });
      let caseid;

    for (let i = 0; i < ress.length; i++) {
      caseid = ress[i].caseid;
    }

			if(res.modlogchannel.startsWith('<#') && res.modlogchannel.endsWith('>')) {
				res.modlogchannel = res.modlogchannel.slice(2, -1);
			}

      if(!args[0]) return message.channel.send('Provide a user to ban.');
			const banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			if(!banMember) return message.channel.send('Couldn\'t find the user.');

			let reason = args.slice(1).join(' ');
			if(!reason) reason = 'No reason given.';

			if (!message.guild.member(banMember).bannable) return message.channel.send('I can\'t ban that user.');

			banMember.ban({ reason: reason }).catch(err => console.error(err));
			message.channel.send(`***${banMember.user.tag} has been banned.***`).then(m => m.delete({ timeout: 5000 }));

      const newCase = new cases({
      guildID: message.guild.id,
      action: 'ban',
      mUserID: message.author.id,
      wUserID: banMember.user.id,
      reason: reason,
      caseid: caseid + 1 || 1
    });

    newCase.save();

			const embed = new MessageEmbed()
				.setAuthor(`Case ${caseid + 1 || 1} | Ban | ${banMember.user.tag}`, banMember.user.displayAvatarURL({ dynamic: true }))
				.addField('User', banMember.user.tag, true)
				.addField('Moderator', message.author, true)
				.addField('Reason', reason, true)
				.setTimestamp()
				.setColor('RANDOM')
				.setFooter(`ID: ${banMember.id}`);

			const sChannel = message.guild.channels.cache.find(c => c.name === res.modlogchannel || c.id === res.modlogchannel);
			if(res.modlog === true) return sChannel.send(embed);

		});
	},
};
