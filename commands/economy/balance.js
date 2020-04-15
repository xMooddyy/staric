const Discord = require('discord.js');
const Money = require('../../models/money.js');

module.exports = {
    config: {
        name: 'balance',
        description: 'Shows your current balance.',
        usage: '',
        category: 'economy',
        accessableby: 'Members',
        aliases: ['bal'],
        cooldown: 3,
        enabled: true
    },
    run: async (bot, message, args) => {

      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

        Money.findOne({
            userID: user.id,
            serverID: message.guild.id
        }, (err, res) => {
            if(err) console.error(err);

            if(!res) {

              message.channel.send(`${user.username} doesn't have any money.`);

            }
          else {


                message.channel.send(`${user.username}'s balance is ${res.money}$`);

            }

        });


    }
};