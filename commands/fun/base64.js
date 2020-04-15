const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'base64',
        description: 'Encode or decode a text.!',
        usage: '<encode | decode> <text>',
        category: 'fun',
        accessableby: 'Members',
        cooldown: 5,
        enabled: true
    },
    run: async (bot, message, args) => {

      const regex = /decode|encode/g;
      if(!regex.test(args[0])) return message.channel.send('Choose between encode or decode.');
      const mode = args[0];
      const text = args.slice(1).join(' ');

      if(!mode) return message.channel.send('Choose between encode or decode');
      if(!text) return message.channel.send('What text do you want to encode/decode?');

      const embed = new MessageEmbed()
      .setColor('RANDOM');

      if(mode === 'encode') {
        embed.setDescription(Buffer.from(text).toString('base64'));

        message.channel.send(embed);
      }
      else if(mode === 'decode') {
        embed.setDescription(Buffer.from(text, 'base64').toString('ascii'));

        message.channel.send(embed);

      }
      else {
        message.channel.send('Choose between encode or decode');
      }

    }
};