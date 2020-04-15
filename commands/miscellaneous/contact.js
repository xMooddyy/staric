const Discord = require('discord.js');
const Trello = require('trello');
const trello = new Trello('e24423b99a54f7e0bc7b6ae074e2af03', '6d2599fa1ee5ac35d255ee42928d7b88ad72734c0033c19b80f49441b5b0a4c4');


module.exports = {
    config: {
        name: 'contact',
        description: 'Contact the bot owners, please only contact if there\'s an issue.',
        usage: '<title> <info>',
        category: 'miscellaneous',
        accessableby: 'Members',
        aliases: ['cn'],
        cooldown: 60,
        enabled: true
    },
    run: async (bot, message, args) => {

    const Sender = message.author;
    const info = args.join(' ');
    if(!info) return message.channel.send('Please give us reason for contacting').then(msg => { msg.delete(5000); });

 /*  const contact = new Discord.RichEmbed()
   .setColor('#add8e6')
   .setThumbnail(Sender.displayAvatarURL)
   .setDescription(`Contact message from [${message.guild.name}](${Invite.url})`)
   .setTitle('Message from contact command!')
   .addField('User', Sender, true)
   .addField('User ID: ', Sender.id, true)
   .addField('Message: ', sayMessage)
   .setTimestamp();

   bot.users.get('413834975347998720').send(contact);*/

      trello.addCard(`${Sender.tag} | Issue`, info, '5e603b184e25254dbb2be8df', (err, card) => {
        if(err) console.error(err);


       trello.getCard(card.idBoard, card.id, (err, res) => {

    const embed = new Discord.MessageEmbed()
    .setColor('#add8e6')
    .setTitle('Contact sent!')
    .setDescription(`Your contact message has been sent into [this card](${res.shortUrl})!`)
    .addField('Reqested by ', Sender)
    .setFooter('Thanks you for contacting with the Staric support!');

    message.channel.send(embed);

        message.delete();
       });
      });

      }

    };
