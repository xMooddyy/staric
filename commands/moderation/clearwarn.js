const Discord = require('discord.js');
const cases = require('../../models/case.js');
const Config = require('../../models/guildSettings.js');

module.exports = {
	config: {
		name: 'clearwarn',
		description: 'Clearn an user\'s warnings.',
		usage: '<user>',
		category: 'moderation',
		accessableby: 'Administrators',
		aliases: ['cw'],
		userPermissions: ['KICK_MEMBERS'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {
		if(!args[0]) return message.channel.send('Provide a user to clearwarn.');
		const userl = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!userl) return message.channel.send('The user doesn\'t exist, please try again.');

		const ress = await cases.find({ guildID: message.guild.id });
    const resssssss = await cases.find({ guildID: message.guild.id, action: 'warn' });
    if(resssssss.length === 0) return message.channel.send(`No warnings found for ${userl.user.tag}.`);
		const ressorted = ress.sort((a, b) => b.caseid - a.caseid);

		const caseid = ress[0].caseid;

		const newCase = new cases({
			guildID: message.guild.id,
			action: 'clearwarn',
			mUserID: message.author.id,
			wUserID: userl.user.id,
			reason: 'Doesn\'t require a reason.',
			caseid: caseid + 1 || 1,
		});

		newCase.save();

		const res = await cases.deleteMany({ guildID: message.guild.id, wUserID: userl.user.id, action: 'warn' });

		message.channel.send(`Cleared ${res.deletedCount} warnings for ${userl.user.tag}.`);

		const resss = await Config.findOne({ guildID: message.guild.id });

		if(resss.modlogchannel.startsWith('<#') && resss.modlogchannel.endsWith('>')) {
			resss.modlogchannel = resss.modlogchannel.slice(2, -1);
		}

		const channel = message.guild.channels.cache.find(c => c.name === resss.modlogchannel || c.id === resss.modlogchannel);

		const embed = new Discord.MessageEmbed()
			.setAuthor(`Case ${caseid + 1 || 1} | Clearwarn | ${userl.user.tag}`, userl.user.displayAvatarURL({ dynamic: true }))
			.addField('User', userl.user.tag, true)
			.addField('Moderator', message.author, true)
			.setTimestamp()
			.setColor('RANDOM')
			.setFooter(`ID: ${userl.id}`);


		if(resss.modlog === true) channel.send(embed);
	},
};
