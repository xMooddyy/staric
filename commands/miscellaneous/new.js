const Discord = require('discord.js');
const userTickets = new Map();

module.exports = {
  config: {
    name: 'new',
    description: 'Create a new ticket.',
    usage: '<subject>',
    category: '',
    accessbeleby: 'members',
    aliases: ['createticket'],
    cooldown: 3,
    enabled: false
  },

  run: async (bot, message, args) => {

    const errembed2 = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setDescription(`:x: | You already have a ticket open, **${message.author.username}**.`);

    if(userTickets.has(message.author.id) || message.guild.channels.some(channel => channel.name.toLowerCase() === message.author.username + '-ticket')) {
      message.channel.send(errembed2);
    }
    else {

    const guild = message.guild;

    guild.createChannel(`${message.author.username}-ticket-${args}`, {
      type: 'text',
      permissionOverwrites: [
        {
          allow: 'VIEW_CHANNEL',
          id: message.author.id
        },
        {
          deny: 'VIEW_CHANNEL',
          id: guild.id
        },
        {

          allow: 'VIEW_CHANNEL',
          id: message.guild.roles.find(r => r.name === 'Support').id

        }

      ]


    });

    const done = new Discord.RichEmbed()
    .setColor(0x00ff00)
    .setDescription(`:white_check_mark: | Sucessfully created a ticket for you, **${message.author.username}**.`);


    const errembed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setDescription(`:x: | Include the reason for your ticket, **${message.author.username}**.`);

    if(!args[0]) {

      return message.channel.send(errembed);

  }
  else {

    message.channel.send(done);
  }


  }
  }
};