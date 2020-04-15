const Discord = require('discord.js');
const Config = require('../models/guildSettings.js');

module.exports = async (bot, oldMember, newMember) => {

  if(oldMember.roles.cache.size !== newMember.roles.cache.size) {

  const res = await bot.getGuild(oldMember.guild);
  const a = [];
  await oldMember.roles.cache.forEach(role => a.push(role.name));
  await newMember.roles.cache.forEach(role => a.push(role.name));
  if(res.logs === false) return;

		if (res.logschannel.startsWith('<#') && res.logschannel.endsWith('>')) {
			res.logschannel = res.logschannel.slice(2, -1);
		}

		const lagchannel2 = newMember.guild.channels.cache.find(c => c.id === res.logschannel || c.name === res.logschannel);

  if(oldMember.roles.cache.size > newMember.roles.cache.size) {
    const difference = a.diff(newMember.roles.cache.map(c => c.name));

    const embed = new Discord.MessageEmbed()
    .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL({ dynamic: true }))
    .setColor('RED')
    .setDescription(`**${oldMember} was removed from the \`${difference.join(', ')}\` role**`)
    .setFooter(`ID: ${oldMember.user.id}`)
    .setTimestamp();

    lagchannel2.send(embed);
  }
  else if(oldMember.roles.cache.size < newMember.roles.cache.size) {
    const difference = a.diff(oldMember.roles.cache.map(c => c.name));

    const embed = new Discord.MessageEmbed()
    .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL({ dynamic: true }))
    .setColor('GREEN')
    .setDescription(`**${oldMember} was given the \`${difference.join(', ')}\` role**`)
    .setFooter(`ID: ${oldMember.user.id}`)
    .setTimestamp();

    lagchannel2.send(embed);
  };
  };
};