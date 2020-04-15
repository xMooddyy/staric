const Discord = require('discord.js');
const Money = require('../../models/money.js');
const ms = require('parse-ms');
const replies = ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'];
const result = Math.floor((Math.random() * replies.length));

module.exports = {
  config: {
    name: 'work',
    description: 'Work.',
    usage: '',
    category: 'economy',
    accessableby: 'Members',
    cooldown: 3,
    enabled: true
  },
  run: async (bot, message, args) => {
    Money.findOne(
      {
        serverID: message.guild.id,
        userID: message.author.id
      },
      async (err, res) => {
        if (err) console.error(err);

        const timeout = 3600000;
        const amount = Math.floor(Math.random() * 500) + 80;
        if (!res) {
          const newRes = new Money({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            money: amount,
            daily: 0,
            weekly: 0,
            hourly: Date.now(),
            rob: 0
          });

          newRes.save();
          const embed = new Discord.MessageEmbed()
              .setTitle('Work')
              .setDescription(`You worked as a ${replies[result]} and earned ${amount}$!`)
              .setColor('RANDOM');

            message.channel.send(embed);
        }
        else {

          const mtoadd = res.money + amount;

          const daily = await res.hourly;

          if (daily !== null && timeout - (Date.now() - daily) > 0) {
            const time = ms(timeout - (Date.now() - daily));

            message.channel.send(
              `You already worked recently.\n\nTry again in **${time.minutes}m and ${time.seconds}s**!`
            );
          }
          else {


            const embed = new Discord.MessageEmbed()
              .setTitle('Work')
              .setDescription(`You worked as a ${replies[result]} and earned ${amount}$!`)
              .setColor('RANDOM');

            message.channel.send(embed);

            Money.findOneAndUpdate(
              { serverID: message.guild.id, userID: message.author.id },
              { $set: { money: mtoadd } },
              { new: true },
              (err, doc) => {
                if (err) console.error(err);

                doc.save();
              }
            );

            Money.findOneAndUpdate(
              { serverID: message.guild.id, userID: message.author.id },
              { $set: { hourly: Date.now() } },
              { new: true },
              (err, doc) => {
                if (err) console.error(err);

                doc.save();
              }
            );
          }
        }
      }
    );
  }
};
