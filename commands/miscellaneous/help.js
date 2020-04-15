const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const Config = require('../../models/guildSettings.js');
const { stripIndents } = require('common-tags');
const { white } = require('../../colours.json');
const ms = require('ms');

module.exports = {
    config: {
        name: 'help',
        aliases: ['h', 'halp', 'commands'],
        usage: '(command) | s!help',
        category: 'miscellaneous',
        description: 'Displays all commands that the bot has.',
        accessableby: 'Members',
        cooldown: 3,
        enabled: true
    },
    run: async (bot, message, args, db) => {

      const res = await bot.getGuild(message.guild);

      const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({ dynamic: true }))
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``);

      if(!message.guild.me.hasPermission(['MANAGE_MESSAGES'])) {
        if(!args[0]) {
        const categories = readdirSync('./commands/');

				embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``);
				embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

				categories.forEach(category => {
					const dir = bot.commands.filter(c => c.config.category === category);
					const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
					try {
						if(message.author.id === '413834975347998720') embed.addField(`> ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(' | '));
						else if(category !== 'owners') embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(' | '));
					}
					catch(e) {
						console.log(e);
					}
				});
        return message.channel.send(embed);
        }
        else {
          const stats = {
          true: 'Enabled',
          false: 'Disabled'
        };
       let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
            if(!command) return message.channel.send(embed.setTitle('Invalid Command.').setDescription(`Do \`${res.prefix}help\` for the list of the commands.`));
            command = command.config;

            embed.setDescription(stripIndents`The bot's prefix is: \`${res.prefix}\`\n<> means required and () means optional.\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || 'No Description provided.'}
            **Usage:** ${command.usage ? `\`${res.prefix}${command.name} ${command.usage}\`` : `\`${res.prefix}${command.name}\``}
            **Accessible by:** ${command.accessableby || 'Members'}
            **Aliases:** ${command.aliases ? command.aliases.join(', ') : 'None.'}
            **Cooldown:** ${command.cooldown ? ms(command.cooldown * 1000, { long: true }) : 'No cooldown specified.'}
            **State:** ${stats[command.enabled]}`);

            return message.channel.send(embed);
        }
      }
      else {

      if(!args[0]) {

    for (let i = 0; i < bot.groups.length; i++) {
      const capitalise = bot.groups[i][0].slice(0, 1).toUpperCase() + bot.groups[i][0].slice(1);
        if(message.author.id === '413834975347998720') embed.addField(`${capitalise}`, `${bot.groups[i][1]}`);
        else if(bot.groups[i][0] !== 'owners') embed.addField(`${capitalise}`, `${bot.groups[i][1]}`);
      }

    const waitembed = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription('<a:Loading:667019852925501450> Loading...');

    message.channel.send(waitembed).then(async msg => {

      await msg.react('💸');
      await msg.react('😂');
      await msg.react('⚙️');
      await msg.react('⚒️');
      await msg.react('🎶');
      if(message.author.id === '413834975347998720') await msg.react('🔒');
      await msg.react('655560830791974932');
      await msg.react('🔍');
      await msg.react('🏠');
      await msg.react('❌');

      await msg.edit(embed);

      const economy = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '💸' && user.id === message.author.id, { time: 120000 });
      const fun = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '😂' && user.id === message.author.id, { time: 120000 });
      const misc = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '⚙️' && user.id === message.author.id, { time: 120000 });
      const moderation = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '⚒️' && user.id === message.author.id, { time: 120000 });
      const roblox = msg.createReactionCollector((reaction, user) => reaction.emoji.id === '655560830791974932' && user.id === message.author.id, { time: 120000 });
      const search = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '🔍' && user.id === message.author.id, { time: 120000 });
      const home = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '🏠' && user.id === message.author.id, { time: 120000 });
      const music = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '🎶' && user.id === message.author.id, { time: 120000 });
      const owner = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '🔒' && user.id === message.author.id, { time: 120000 });
      const deletee = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id, { time: 120000 });

     economy.on('collect', (r) => {
       const dir = bot.commands.filter(c => c.config.category === 'economy' && c.config.enabled === true);
       r.users.remove(message.author);

       const economyembed = new MessageEmbed()
       .setColor('RANDOM')
       .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({ dynamic: true }))
       .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
       .setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``)
       .addField(`Economy Commands [${dir.size}]`, dir.map(c => `\`${c.config.name}\``).join(' | '));

       msg.edit(economyembed);
     });

      home.on('collect', (r) => {
        r.users.remove(message.author);
        msg.edit(embed);
      });

    fun.on('collect', (r) => {
      r.users.remove(message.author);
      const dir = bot.commands.filter(c => c.config.category === 'fun' && c.config.enabled === true);

      const funembed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({ dynamic: true }))
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``)
      .addField(`Fun Commands [${dir.size}]`, dir.map(c => `\`${c.config.name}\``).join(' | '));

      msg.edit(funembed);
    });

    misc.on('collect', (r) => {
      r.users.remove(message.author);
      const dir = bot.commands.filter(c => c.config.category === 'miscellaneous' && c.config.enabled === true);

      const miscembed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({ dynamic: true }))
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``)
      .addField(`Miscellaneous Commands [${dir.size}]`, dir.map(c => `\`${c.config.name}\``).join(' | '));

      msg.edit(miscembed);
  });

    moderation.on('collect', (r) => {
      r.users.remove(message.author);
      const dir = bot.commands.filter(c => c.config.category === 'moderation' && c.config.enabled === true);

      const modembed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({ dynamic: true }))
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``)
      .addField(`Moderation Commands [${dir.size}]`, dir.map(c => `\`${c.config.name}\``).join(' | '));

      msg.edit(modembed);
    });

    roblox.on('collect', (r) => {
      r.users.remove(message.author);
      const dir = bot.commands.filter(c => c.config.category === 'roblox' && c.config.enabled === true);

      const robloxembed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({ dynamic: true }))
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``)
      .addField(`Roblox Commands [${dir.size}]`, dir.map(c => `\`${c.config.name}\``).join(' | '));

      msg.edit(robloxembed);
    });

    search.on('collect', (r) => {
      r.users.remove(message.author);
      const dir = bot.commands.filter(c => c.config.category === 'search' && c.config.enabled === true);

      const searchembed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({ dynamic: true }))
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``)
      .addField(`Search Commands [${dir.size}]`, dir.map(c => `\`${c.config.name}\``).join(' | '));

      msg.edit(searchembed);
    });

    deletee.on('collect', (r) => {
      r.users.remove(message.author);
      msg.delete();
      home.stop();
    });

    home.on('end', () => {
      msg.delete();
    });

    music.on('collect', (r) => {
      r.users.remove(message.author);
      const dir = bot.commands.filter(c => c.config.category === 'music' && c.config.enabled === true);

      const musicembed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({ dynamic: true }))
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``)
      .addField(`Music Commands [${dir.size}]`, dir.map(c => `\`${c.config.name}\``).join(' | '));

      msg.edit(musicembed);
    });

    owner.on('collect', (r) => {
      r.users.remove(message.author);
      const dir = bot.commands.filter(c => c.config.category === 'owners' && c.config.enabled === true);

      const ownerembed = new MessageEmbed()
      .setColor('RANDOM')
      .addField(`Owner Commands [${dir.size}]`, dir.map(c => `\`${c.config.name}\``).join(' | '))
      .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL({ dynamic: true }))
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix for this server is: \`${res.prefix}\` or \`@Staric#1222\``);

      msg.edit(ownerembed);
    });
    });
      }
      else {
        const stats = {
          true: 'Enabled',
          false: 'Disabled'
        };
       let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
            if(!command) return message.channel.send(embed.setTitle('Invalid Command.').setDescription(`Do \`${res.prefix}help\` for the list of the commands.`));
            command = command.config;

            embed.setDescription(stripIndents`The bot's prefix is: \`${res.prefix}\`\n<> means required and () means optional.\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || 'No Description provided.'}
            **Usage:** ${command.usage ? `\`${res.prefix}${command.name} ${command.usage}\`` : `\`${res.prefix}${command.name}\``}
            **Accessible by:** ${command.accessableby || 'Members'}
            **Aliases:** ${command.aliases ? command.aliases.join(', ') : 'None.'}
            **Cooldown:** ${command.cooldown ? ms(command.cooldown * 1000, { long: true }) : 'No cooldown specified.'}
            **State:** ${stats[command.enabled]}`);

            return message.channel.send(embed);
      }
        }
    }
};