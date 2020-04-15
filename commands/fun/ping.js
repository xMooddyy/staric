const Discord = require('discord.js')

module.exports = { 
    config: {
        name: 'ping',
        description: 'PONG! Displays the api & bot latency',
        usage: '',
        category: 'fun',
        accessableby: 'Members',
    cooldown: 3,
    enabled: true
    },
    run: async (bot, message, args) => {

      const lang = require('../../languages/english.json');

      await message.channel.send('<a:Loading:667019852925501450> Pinging...').then(async m => {
        const ping = m.createdTimestamp - message.createdTimestamp;
        const choices = ['Is this really my ping?', 'Is it okay? I can\'t look', 'I hope it isn\'t bad'];
        const response = choices[Math.floor(Math.random() * choices.length)];

        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .addField('Bot Latency', `${ping}ms`, true)
        .addField('API Latency', `${Math.round(bot.ws.ping)}ms`, true);

        await m.edit(null, embed);
    });
  }
};