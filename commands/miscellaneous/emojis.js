const Discord = require('discord.js');

module.exports = {
  config: {
    name: 'emojis',
    description: 'A list of the emojis in the server..',
    usage: '',
    category: 'miscellaneous',
    accessableby: 'Members',
    aliases: ['serveremojis', 'se'],
    cooldown: 5,
    enabled: true
  },
  run: async (bot, message, args, tools) => {

     const aemojis = [];
    if (message.guild.emojis.cache.size !== 0) {
      message.guild.emojis.cache.filter(c => c.animated).forEach((r) => {
        const emoji = bot.emojis.resolve(r.id);
        aemojis.push(emoji);
      });
    };

    const aemojisembed = [];
    if (aemojis.length === 0) {
      aemojisembed.push('None.');
    }
    else if (aemojis.join(' ').length > 1024) {
      for (let i = 0; i < aemojis.length; i += 1) {
        if (aemojisembed.join(' ').length < 980) {
          aemojisembed.push(aemojis[i]);
        }
      }
      aemojisembed.push('...');
    }
    else {
      aemojisembed.push(aemojis.join(' '));
    };
    
    const emojis = [];
    if (message.guild.emojis.cache.size !== 0) {
      message.guild.emojis.cache.filter(c => !c.animated).forEach((r) => {
        const emoji = bot.emojis.resolve(r.id);
        emojis.push(emoji);
      });
    };

    const emojisembed = [];
    if (emojis.length === 0) {
      emojisembed.push('None.');
    }
    else if (emojis.join(' ').length > 1024) {
      for (let i = 0; i < emojis.length; i += 1) {
        if (emojisembed.join(' ').length < 980) {
          emojisembed.push(emojis[i]);
        }
      }
      emojisembed.push('...');
    }
    else {
      emojisembed.push(emojis.join(' '));
    };

    const emoji = message.guild.emojis;
    if (!emoji.cache.size) return message.channel.send('There are no emojis on this server.');
    const embed = new Discord.MessageEmbed()
      .setTitle('Server Emojis')
      .setColor('RANDOM')
      .addField(`Animated [${message.guild.emojis.cache.filter(a => a.animated).size}]`, aemojisembed.join(' '))
      .addField(`Not animated [${message.guild.emojis.cache.filter(a => !a.animated).size}]`, emojisembed.join(' '));
    message.channel.send({ embed });
  }
};
