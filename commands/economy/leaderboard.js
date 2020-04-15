const Discord = require('discord.js');
const Money = require('../../models/money.js');
const ms = require('parse-ms');

module.exports = {
    config: {
        name: 'leaderboard',
        description: 'Leaderboard of top 10 users.',
        usage: '',
        category: 'economy',
        accessableby: 'Members',
        cooldown: 5,
        enabled: true
    },
    run: async (bot, message, args) => {

      Money.find({
    serverID: message.guild.id
  }).sort([
    ['money', 'descending']
  ]).exec((err, res) => {
    if (err) console.log(err);

    const embed = new Discord.MessageEmbed()
      .setTitle('Money Leaderboard | Top 10 users');

    if (res.length === 0) {
      embed.setColor('RED');
      embed.setDesciption('No data found.');
    }
    else if (res.length < 10) {
      // less than 10 results
      embed.setColor('RANDOM');
      for (let i = 0; i < res.length; i++) {
        const member = message.guild.members.cache.get(res[i].userID) || 'User Left';
        if (member === 'User Left') {
          embed.addField(`${i + 1}. ${member}`, `**Money:** ${res[i].money}`);
        }
        else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**Money:** ${res[i].money}`);
        }
      }
    }
    else {
      // More than 10 results
      embed.setColor('RANDOM');
      for (let i = 0; i < 10; i++) {
        const member = message.guild.members.cache.get(res[i].userID) || 'User Left';
        if (member === 'User Left') {
          embed.addField(`${i + 1}. ${member}`, `**Money:** ${res[i].money}`);
        }
        else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**Money:** ${res[i].money}`);
        }
      }
    }

    message.channel.send(embed);
    });
    }
};