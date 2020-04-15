const cases = require('../../models/case.js');
const { MessageEmbed } = require('discord.js');


module.exports = {
	config: {
		name: 'reason',
		description: 'Find the reason of a warning.',
		usage: '<id>',
		category: 'moderation',
		accessableby: 'Moderators',
//		userPermissions: ['KICK_MEMBERS'],
		cooldown: 5,
		enabled: true,
	},
	run: async (bot, message, args) => {

    if(!args[0]) return message.channel.send('Provide a case ID.');
    const res = await cases.findOne({ guildID: message.guild.id, caseid: args[0] });
    if(!res) return message.channel.send('Couldn\'t find a case.');

    if(!args[1]) {

    const embed = new MessageEmbed()
    .setTitle(`Case ID: ${res.caseid}`)
    .setColor('RANDOM')
  .setDescription(`Action: ${res.action.toProperCase()}\nModerator: <@${res.mUserID}>\nUser: <@${res.wUserID}>\n${res.reason === 'Doesn\'t require a reason.' ? '' : `Reason: ${res.reason}`}`);

    message.channel.send(embed);

    }
    else {
      const reason = args.slice(1).join(' ');

      await bot.updateCase(message.guild, args[0], { reason: reason });
     message.channel.send(`Updated Case #${args[0]}.`);
    }

  },
};