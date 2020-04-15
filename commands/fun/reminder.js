const Discord = require('discord.js');
const ms = require('ms');
const hasreminder = new Map();

module.exports = {
    config: {
        name: 'reminder',
        description: 'Set a reminder!',
        usage: '<time> <reason>',
        category: 'fun',
        accessableby: 'Members',
        enabled: true
    },
    run: async (bot, message, args) => {

    if(args[0] === 'remove') {
        hasreminder.delete(message.author.id);
        message.channel.send('Removed reminder.');
      }
      else {

      if(hasreminder.has(message.author.id)) return message.channel.send('You already have a reminder set.');

      const yes = ms(args[0]);

      if(!yes) return message.channel.send('When do you want me to remind you? Use the command again like this: `s!reminder <time> <reason>`');

      const reason = args.slice(1).join(' ');

      if(!reason) return message.channel.send('Include a reason.');

      message.channel.send(`Set a reminder for ${ms(yes, { long: true })}`);

      hasreminder.set(message.author.id);


      setTimeout(() => {

        try{
        message.author.send(`${message.author}, reminder for \`${reason}\` ended!`);
        }
        catch(err) {
          message.channel.send(`${message.author}, reminder for \`${reason}\` ended!`);
        }
        hasreminder.delete(message.author.id);
      }, yes);

      }

      }

};