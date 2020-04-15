const Discord = require('discord.js');
const Money = require('../../models/money.js');
const ms = require('parse-ms');

module.exports = {
    config: {
        name: 'daily',
        description: 'Get your daily money.',
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


      const timeout = 86400000;
      const amount = Math.floor(Math.random() * 700) + 80;
        if(!res) {
          const newRes = new Money({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            money: amount,
            daily: Date.now(),
            weekly: 0,
            hourly: 0,
            rob: 0
          });

          newRes.save();
          const embed = new Discord.MessageEmbed()
        .setAuthor('Daily', message.author.displayAvatarURL({ dynamic: true }))
        .setColor(0xadd8e6)
        .setDescription('**Daily reward**')
        .addField('Collected', amount);

        message.channel.send(embed);
        }
        else {
      const mtoadd = res.money + amount;

      const daily = await res.daily;

      if(daily !== null && timeout - (Date.now() - daily) > 0) {
        const time = ms(timeout - (Date.now() - daily));

        message.channel.send(`You already collected your daily reward, you can come back and collect it in **${time.hours}h ${time.minutes}m and ${time.seconds}s**!`);

      }
      else {
        const embed = new Discord.MessageEmbed()
        .setAuthor('Daily', message.author.displayAvatarURL({ dynamic: true }))
        .setColor(0xadd8e6)
        .setDescription('**Daily reward**')
        .addField('Collected', amount);

        message.channel.send(embed);


        Money.findOneAndUpdate({ serverID: message.guild.id, userID: message.author.id }, { $set:{ money: mtoadd } }, { new: true }, (err, doc) => {

        if(err) console.error(err);

          doc.save();

      });

        Money.findOneAndUpdate({ serverID: message.guild.id, userID: message.author.id }, { $set:{ daily: Date.now() } }, { new: true }, (err, doc) => {

        if(err) console.error(err);

          doc.save();

      });
      }
      }
      });
    }
};