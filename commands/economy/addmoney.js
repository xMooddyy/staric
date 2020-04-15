const Discord = require('discord.js');
const Money = require('../../models/money.js');

module.exports = {
  config: {
    name: 'addmoney',
    description: 'Add money to the selected user.',
    usage: '<amount> (user)',
    category: 'economy',
    accessableby: 'Staff',
    aliases: ['give'],
    userPermissions: ['MANAGE_GUILD'],
    cooldown: 3,
    enabled: true
  },
  run: async (bot, message, args) => {

     const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
        if(!member) return message.channel.send('That user doesn\'t exist.');

        const amount = parseInt(args[1]);
        if(!amount) return message.channel.send('You need to provide a valid amount of money to give.');

        Money.findOne({
            serverID: message.guild.id,
            userID: member.id
        }, (err, res) => {
            if(err) console.error(err);

            if(!res) {
                const newRes = new Money({
                    serverID: message.guild.id,
                    userID: member.id,
                    username: member.user.username,
                    money: amount
                });

                newRes.save();
            }
          else {
                res.money = res.money + amount;

                res.save();
            }

            message.channel.send(`Successfully gave ${member.user.username} ${amount}$!`);
        });


  }
};