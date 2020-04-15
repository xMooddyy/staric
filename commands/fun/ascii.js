const ascii = require('ascii-art');


module.exports = {
    config: {
        name: 'ascii',
        description: 'Prints a word.',
        usage: '<message>',
        category: 'fun',
        accessableby: 'Members',
        aliases: ['as', 'draw'],
        cooldown: 3,
        enabled: true,
        voterOnly: true
    },
    run: async (bot, message, args, tools) => {

        ascii.font(args.join(' '), 'Doom', function(rendered) {

            rendered = rendered.trimRight();

            if(rendered.length > 2000) return message.channel.send('Sorry, that message is too long!');

            message.channel.send(rendered, {
                code: 'md'
            });

        });

    }
};