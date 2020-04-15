const Discord = require('discord.js');
const matcher = require('matcher');

module.exports = {
    config: {
        name: 'avatar',
        description: 'Displays the avatar for the specified user.',
        usage: '(user)',
        category: 'fun',
        accessableby: 'Members',
    cooldown: 3,
    enabled: true
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send('Generating avatar...');

      const members = message.guild.members.cache.map(c => c.user.username);

      const matchedUser = matcher(members, [`${args[0]}*`]);
      let member = message.guild.members.cache.find(c => c.user.username === matchedUser[0]);
      if(!member) member = message.mentions.members.first() || message.member;

    const mentionedUser = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;

       const embed = new Discord.MessageEmbed()
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setColor(0xADD8E6)
        .setTitle('Avatar');


        msg.edit(null, embed);


    }
};