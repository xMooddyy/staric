const Discord = require('discord.js');

module.exports = {
    config: {
        name: 'icon',
        description: 'The discord server\'s icon.',
        usage: '',
        category: 'miscellaneous',
        accessableby: 'Members',
        aliases: ['pfp'],
    cooldown: 3,
    enabled: true
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send('Generating icon...');

if(!message.guild.iconURL()) return msg.edit('No icon found!');

const iconembed = new Discord.MessageEmbed()
.setColor(0xADD8E6)
.setFooter('Searched by ' + message.author.tag, bot.user.displayAvatarURL({ dynamic: true }))
.setImage(message.guild.iconURL({ dynamic: true }))
.setTitle('Icon')
.setDescription('[Icon URL link](' + message.guild.iconURL({ dyanmic: true }) + ')')
.setTimestamp();

message.channel.send(iconembed);

    msg.delete();
 }


    };