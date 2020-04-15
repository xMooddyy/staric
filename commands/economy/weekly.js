const Discord = require('discord.js');
const ms = require('parse-ms');
const Money = require('../../models/money.js');

module.exports = {
    config: {
        name: 'weekly',
        description: 'Get your weekly money.',
        usage: '',
        category: 'economy',
        accessableby: 'Members',
        cooldown: 3,
        enabled: true
    },
    run: async (bot, message, args) => {

      Money.findOne({
        serverID: message.guild.id,
        userID: message.author.id
      }, async (err, res) => {

      if(err) console.error(err);

      const timeout = 604800000;
      const amount = Math.floor(Math.random() * 1000) + 500;
        if(!res) {
          const newRes = new Money({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            money: amount,
            daily: 0,
            weekly: Date.now(),
            hourly: 0,
            rob: 0
          });

          newRes.save();
          const embed = new Discord.MessageEmbed()
        .setAuthor('Weekly', message.author.displayAvatarURL({ dyanmic: true }))
        .setColor(0xadd8e6)
        .setDescription('**Weekly reward**')
        .addField('Collected', amount);

        message.channel.send(embed);
        }
        else {
      const mtoadd = amount + res.money;


      const weekly = await res.weekly;

      if(weekly !== null && timeout - (Date.now() - weekly) > 0) {
        const time = ms(timeout - (Date.now() - weekly));

        message.channel.send(`You already collected your weekly reward, you can come back and collect it in **${time.days}d ${time.hours}h ${time.minutes}m and ${time.seconds}s**!`);

      }
        else {
        const embed = new Discord.MessageEmbed()
        .setAuthor('Weekly', message.author.displayAvatarURL({ dynamic: true }))
        .setColor(0xadd8e6)
        .setDescription('**Weekly reward**')
        .addField('Collected!', amount);

        message.channel.send(embed);

        Money.findOneAndUpdate({ serverID: message.guild.id, userID: message.author.id }, { $set:{ money: mtoadd } }, { new: true }, (err, doc) => {

        if(err) console.error(err);

          doc.save();

      });
        Money.findOneAndUpdate({ serverID: message.guild.id, userID: message.author.id }, { $set:{ weekly: Date.now() } }, { new: true }, (err, doc) => {

        if(err) console.error(err);

          doc.save();

      });
      }
        }
      });


    }
};