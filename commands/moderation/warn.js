const Discord = require('discord.js');
const warnings = require('../../models/warnings.js');
const Config = require('../../models/guildSettings.js');
const moment = require('moment');
const cases = require('../../models/case.js');
async function generateKey(length) {
		let result = '';
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

module.exports = {
	config: {
		name: 'warn',
		description: 'Warn a member in the server.',
		usage: '<user> <reason>',
		category: 'moderation',
		accessableby: 'Administrators',
		userPermissions: ['KICK_MEMBERS'],
		cooldown: 5,
		enabled: true,
	},
	run: async (bot, message, args) => {

    let ress = await cases.find({ guildID: message.guild.id });
    if(ress.length === 0) ress = [1];
    const ressorted = ress.sort((a, b) => b.caseid - a.caseid);

    const caseid = ress[0].caseid || 1;


   if(!args[0]) return message.channel.send('Provide a user to warn.');
		const warnmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!warnmember) return message.channel.send('Couldn\'t find that user.');

		const reason = args.slice(1).join(' ');
		if(!reason) return message.channel.send('Please, provide a reason.');

		if(warnmember.user.bot) return message.channel.send('You can\'t warn a bot!');

    const newCase = new cases({
      guildID: message.guild.id,
      action: 'warn',
      mUserID: message.author.id,
      wUserID: warnmember.user.id,
      reason: reason,
      caseid: caseid + 1 || 1
    });

    newCase.save();

    try {

    await message.delete();
    }
    catch(e) {

    }

    message.channel.send(`***${warnmember.user.tag} has been warned.***`);

			warnmember.send(`You have been warned in ${message.guild.name} for: ${reason}`).catch(e => { });

		Config.findOne({
			guildID: message.guild.id,
		}, async (err, res) => {
			if(err) console.error(err);


			if(res.modlogchannel.startsWith('<#') && res.modlogchannel.endsWith('>')) {
				res.modlogchannel = res.modlogchannel.slice(2, -1);
			}

			const channel = message.guild.channels.cache.find(c => c.name === res.modlogchannel || c.id === res.modlogchannel);

			const embed = new Discord.MessageEmbed()
				.setAuthor(`Case ${caseid + 1 || 1} | Warn | ${warnmember.user.tag}`, warnmember.user.displayAvatarURL({ dynamic: true }))
				.addField('User', warnmember.user.tag, true)
				.addField('Moderator', message.author, true)
				.addField('Reason', reason, true)
				.setTimestamp()
				.setColor('RANDOM')
				.setFooter(`ID: ${warnmember.id}`);


			if(res.modlog === true) channel.send(embed);
		});


	},
};
