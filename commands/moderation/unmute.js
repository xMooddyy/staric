const { MessageEmbed } = require('discord.js');
const Config = require('../../models/guildSettings.js');

module.exports = {
	config: {
		name: 'unmute',
		description: 'Unmutes a member in the discord!',
		usage: '<user>',
		category: 'moderation',
		accessableby: 'Staff',
		aliases: ['unm', 'speak'],
		userPermissions: ['MANAGE_ROLES'],
		botPermissions: ['MANAGE_ROLES'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

    if(!args[0]) return message.channel.send('Provide a user to unnmute.');
		const mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!mutee) return message.channel.send('Couldn\'t find that user.');
    let reason = args.slice(1).join(' ');
    if(!reason) reason = 'No reason given.';

		const muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
		if(!mutee.roles.cache.has(muterole.id)) return message.channel.send('This user isn\'t muted.');

		mutee.roles.remove(muterole.id).then(() => {
			message.delete();
			message.channel.send(`***${mutee.user.username} has been unmuted.***`);
		});

    const ress = await cases.find({ guildID: message.guild.id });
      let caseid;

    for (let i = 0; i < ress.length; i++) {
      caseid = ress[i].caseid;
    }

    const newCase = new cases({
      guildID: message.guild.id,
      action: 'unmute',
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
				.setAuthor(`Case ${caseid + 1 || 1} | Unmute | ${mutee.user.tag}`, mutee.user.displayAvatarURL({ dynamic: true }))
				.addField('User', mutee.user.tag, true)
				.addField('Moderator', message.author, true)
				.setTimestamp()
				.setColor('RANDOM')
				.setFooter(`ID: ${mutee.id}`);


			if(res.modlog === true) channel.send(embed);
		});

	},
};
