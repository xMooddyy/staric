const Discord = require('discord.js');
const replies = require('../../assets/8ball.json');

module.exports = {
    config: {
        name: '8ball',
        description: 'Ask the 8ball some questions!.',
        usage: '<question>',
        category: 'fun',
        accessableby: 'Members',
        cooldown: 3,
        enabled: true
    },
    run: async (bot, message, args) => {

      if(!args[0]) return message.channel.send('What\'s your question?');

    const result = Math.floor((Math.random() * replies.length));
    const question = args.join(' ');

    const embed = new Discord.MessageEmbed()
    .setTitle(message.author.username)
    .setColor('RANDOM')
    .addField('Question:', question)
    .addField('Answer:', replies[result]);

    message.channel.send(embed);

    }
};