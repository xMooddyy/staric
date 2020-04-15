const Discord = require('discord.js');
const { NovelCovid } = require('novelcovid');
const covid = new NovelCovid();
const moment = require('moment');
require('moment-duration-format');
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: 'covid',
        description: 'Get information about the Covid-19 in a specific country or all.',
        usage: '(country)',
        category: 'fun',
        accessableby: 'Members',
        aliases: ['cov'],
        cooldown: 3,
        enabled: true
    },
    run: async (bot, message, args) => {

      if(!args[0] || args[0].toLowerCase() === 'all') {
        const all = await covid.all();

        const embed = new Discord.MessageEmbed()
        .setTitle('COVID-19 Stats')
        .setColor('RANDOM')
        .addField('Cases', all.cases, true)
        .addField('Deaths', all.deaths, true)
        .addField('Recovered', all.recovered, true)
        .setFooter(`Last updated: ${moment.utc(all.updated).format('L, h:mm A UTC')}`);

        message.channel.send(embed);
      }
      else if(args[0].toLowerCase() === 'list') {
        const list = await covid.countryNames();
        const embed = new Discord.MessageEmbed()
        .setTitle('Country list')
        .setColor('RANDOM')
        .setDescription(list.join(' - ').slice(1264, 2529));

        const msg = await message.channel.send(embed);
        await msg.react('◀️');
        await msg.react('▶️');
        const forward = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id, { time: 60000 });
        const backward = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '◀️' && user.id === message.author.id, { time: 60000 });

        forward.on('collect', r => {

          r.users.remove(message.author);

          const embed2 = new Discord.MessageEmbed()
          .setTitle('Country list')
          .setColor('RANDOM')
          .setDescription(list.join(' - ').slice(0, 1264));

          msg.edit(embed2);
        });

        backward.on('collect', r => {
          r.users.remove(message.author);
          msg.edit(embed);
        });
      }
      else {
        const country = args.join(' ').toLowerCase();
        let res = await fetch('https://corona.lmao.ninja/countries');
        res = await res.json();
        const result = await res.find(c => c.country.toLowerCase().includes(country));
        if(!result) return message.channel.send('That country doesn\'t exist, or the virus is not there yet.');

        const embed = new Discord.MessageEmbed()
        .setTitle(result.country)
        .setColor('RANDOM')
        .addField('Cases', result.cases, true)
        .addField('Today cases', result.todayCases, true)
        .addField('Deaths', result.deaths, true)
        .addField('Today deaths', result.todayDeaths, true)
        .addField('Recovered', result.recovered, true)
        .addField('Active cases', result.active, true)
        .addField('Critical', result.critical, true);

        message.channel.send(embed);
      }
    },
};