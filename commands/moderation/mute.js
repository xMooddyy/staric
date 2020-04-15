const { MessageEmbed } = require('discord.js');
const Config = require('../../models/guildSettings.js');
const cases = require('../../models/case.js');


module.exports = {
	config: {
		name: 'mute',
		description: 'Mutes a member in the discord!',
		usage: '<user> (reason)',
		category: 'moderation',
		accessableby: 'Staff',
		aliases: ['m', 'nospeak'],
		userPermissions: ['MANAGE_ROLES'],
		botPermissions: ['MANAGE_ROLES'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

    if(!args[0]) return message.channel.send('Provide a user to mute.');

		const mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!mutee) return message.channel.send('Couldn\'t find that user.');
    if(mutee.user.bot) return message.channel.send('You can\'t mute a bot.');

		let reason = args.slice(1).join(' ');
		if(!reason) reason = 'No reason given.';

		// define mute role and if the mute role doesnt exist then create one
		let muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
		if(!muterole) {
			try{
				muterole = await message.guild.roles.create({
					name: 'Muted',
					color: '#514f48',
					permissions: [],
				});
				message.guild.channels.cache.forEach(async (channel, id) => {
					await channel.overwritePermissions(muterole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
						SEND_TTS_MESSAGES: false,
						ATTACH_FILES: false,
						SPEAK: false,
					});
				});
			}
			catch(e) {
				console.log(e.stack);
			}
		}

		// add role to the mentioned user and also send the user a dm explaing where and why they were muted
    if(mutee.roles.cache.has(muterole.id)) return message.channel.send('This user is already muted.');
		mutee.roles.add(muterole.id).then(() => {
			message.delete();
			mutee.send(`Hello, you have been muted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err));
			message.channel.send(`***${mutee.user.tag} has been muted.***`);
		});

    const ress = await cases.find({ guildID: message.guild.id });
      let caseid;

    for (let i = 0; i < ress.length; i++) {
      caseid = ress[i].caseid;
    }

    const newCase = new cases({
      guildID: message.guild.id,
      action: 'mute',
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
				.setAuthor(`Case ${caseid + 1 || 1} | Mute | ${mutee.user.tag}`, mutee.user.displayAvatarURL({ dynamic: true }))
				.addField('User', mutee.user.tag, true)
				.addField('Moderator', message.author, true)
				.addField('Reason', reason, true)
				.setTimestamp()
				.setColor('RANDOM')
				.setFooter(`ID: ${mutee.id}`);

			if(res.modlog === true) channel.send(embed);
		});


	},
};
