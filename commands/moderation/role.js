const { MessageEmbed } = require('discord.js');
const Config = require('../../models/guildSettings.js');
const cases = require('../../models/case.js');

module.exports = {
	config: {
		name: 'role',
		description: 'Adds/removes a role to/from a member of the server!',
		usage: '<user> <role>',
		category: 'moderation',
		accessableby: 'Moderators',
		aliases: ['removerole', 'addrole'],
		userPermissions: ['MANAGE_ROLES'],
		botPermissions: ['MANAGE_ROLES'],
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

    if(!args[0]) return message.channel.send('Provide a user to add/remove the role to/from.');
		const rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]);
		if(!rMember) return message.channel.send('Couldn\'t find that user.');
    if(!args.slice(1).join(' ')) return message.channel.send('Provide a role to give/remove.');
		const noob = args.slice(1).join(' ');
		const role = message.guild.roles.cache.find(r => r.name == noob) || message.guild.roles.cache.find(r => r.id == noob) || message.mentions.roles.first();
		if(!role) return message.channel.send('Couldn\'t find that role.');


		Config.findOne({
			guildID: message.guild.id,
		}, async (err, res) => {


			if(rMember.roles.cache.has(role.id)) {
				await rMember.roles.remove(role.id).catch(e => console.log(e.message));
				message.channel.send(`The role **${role.name}** has been removed from **${rMember.user.username}**.`);
				if(res.modlogchannel.startsWith('<#') && res.modlogchannel.endsWith('>')) {
					res.modlogchannel = res.modlogchannel.slice(2, -1);
				}

			}
			else {
				await rMember.roles.add(role.id).catch(e => console.log(e.message));
				message.channel.send(`The role **${role.name}** has been added to **${rMember.user.username}**.`);

      }

		});

	},
};
