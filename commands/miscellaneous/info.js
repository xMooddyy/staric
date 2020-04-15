const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = {
    config: {
        name: 'info',
        description: 'Pulls the userinfo of yourself or a user!',
        usage: '(user)',
        category: 'miscellaneous',
        accessableby: 'Members',
        aliases: ['ui', 'userinfo'],
    cooldown: 3,
    enabled: true
    },
    run: async (bot, message, args) => {


      const status = {
        online: '<a:plexiOnline:478870259944783873> Online',
        idle: '<a:plexiAway:478870515730087939> Idle',
        dnd: '<a:plexiDnd:478869699455746049> DND',
        offline: '<a:plexiOffline:478870457848823818> Offline'
      };


        function checkDays(date) {
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const days = Math.floor(diff / 86400000);
            return days + (days == 1 ? ' day' : ' days') + ' ago';
        };

      let u = args[0] || message.mentions.users.first() || message.author.id;
      if(u.endsWith('>')) {
        u = u.slice(3, -1);
      }

          const user = bot.users.cache.get(u);
          if(!user) return message.channel.send('Couldn\'t find that user.');

    function getJoinRank(ID, guild) {
 if (!guild.member(ID)) return;

 const arr = guild.members.cache.array();
 arr.sort((a, b) => a.joinedAt - b.joinedAt);

 for (let i = 0; i < arr.length; i++) {
 if (arr[i].id == ID) return i + 1;
 }
};

          /*  const embed = new Discord.RichEmbed()
                .setColor(0xADD8E6)
                .setThumbnail(member.user.avatarURL)
                .setTitle(member.user.tag)

                .addField(`Profile:`, `${member}`, true)
                .addField('Status:', member.presence.status === 'online' ? '<a:plexiOnline:478870259944783873> Online' : member.presence.status === 'dnd' ? '<a:plexiDnd:478869699455746049> DND' : member.presence.status === 'idle' ? '<a:plexiAway:478870515730087939> Idle' : '<a:plexiOffline:478870457848823818> Offline')
                .addField('ID:', `${member.id}`, true)
                .addField('Game:', `${member.presence.game ? member.presence.game.name : 'None'}`, true)
                .addField('Joined', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY')} (${checkDays(member.joinedAt)})`, true)
                .addField('Registered', `${moment.utc(member.user.createdAt).format('dddd, MMMM Do YYYY')} (${checkDays(member.user.createdAt)})`, true)
                .addField(`Roles [${member.roles.size}]:`, member.roles.map(roles => `${roles}`).join(', '), true)
                .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`, bot.user.displayAvatarURL)
                .setTimestamp()*/

      if(!message.guild.member(user)) {
        const embed = new Discord.MessageEmbed()
        .setDescription(user.bot ? `**${user.username}#${user.discriminator} | <:bott:680787042153791510>**` : `**${user.username}#${user.discriminator}**`)
        .setColor('RANDOM')
        .setThumbnail(user.avatarURL({ dynamic: true }))
        .addField('> User Information', stripIndents`**❯ Profile:** ${user} [${user.username}#${user.discriminator}]
        **❯ Status:** ${user.presence.status === 'online' ? '<a:plexiOnline:478870259944783873> Online' : user.presence.status === 'dnd' ? '<a:plexiDnd:478869699455746049> DND' : user.presence.status === 'idle' ? '<a:plexiAway:478870515730087939> Idle' : '<a:plexiOffline:478870457848823818> Offline'}
        **❯ ID:** ${user.id}
        **❯ Game:** ${user.presence.game ? user.presence.game.name : 'None.'}
        **❯ Registered:** ${moment.utc(user.createdAt).format('L')} (${checkDays(user.createdAt)})`);

        message.channel.send('The user is not in the server, that\'s all I got:', embed);
      }
      else {

        const member = message.guild.member(user) || message.guild.member(message.author);

            const embed = new Discord.MessageEmbed()
            .setDescription(member.user.bot ? `**${member.user.tag} | <:bott:680787042153791510>**` : `**${member.user.tag}**`)
            .setColor(member.displayHexColor === '#000000' ? '#add8e6' : member.displayHexColor)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .addField('> User Information', stripIndents`**❯ Profile:** ${member} [${member.user.tag}]
            **❯ Status:** ${member.presence.status === 'online' ? '<a:plexiOnline:478870259944783873> Online' : member.presence.status === 'dnd' ? '<a:plexiDnd:478869699455746049> DND' : member.presence.status === 'idle' ? '<a:plexiAway:478870515730087939> Idle' : '<a:plexiOffline:478870457848823818> Offline'}
            **❯ ID:** ${member.id}
            **❯ Game:** ${member.presence.activities[0] ? member.presence.activities[0].name : 'None'}
            **❯ Registered:** ${moment.utc(member.user.createdAt).format('L')} (${checkDays(member.user.createdAt)})`)
            .addField('> Member Information', stripIndents`**❯ Nickname:** ${member.nickname ? member.nickname : 'None.'}
            **❯ Joined:** ${moment.utc(member.joinedAt).format('L')} (${checkDays(member.joinedAt)})
            **❯ Join Position:** ${getJoinRank(member.user.id, message.guild)}
            **❯ Highest Role:** ${member.roles.highest} [${member.roles.highest.id}]
            **❯ Roles: [${member.roles.cache.size}]**
            ${member.roles.cache.sort((a, b) => b.position - a.position).map(roles => `${roles}`).join(', ')}`)
            .setTimestamp();

            message.channel.send(embed);
      }

            }
};