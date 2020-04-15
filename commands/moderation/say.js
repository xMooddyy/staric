module.exports = {
    config: {
        name: 'say',
        description: 'Sends a message that was inputted to a channel.',
        usage: '(channel) <message>',
        category: 'moderation',
        accessableby: 'Staff',
        userPermissions: ['MANAGE_MESSAGES'],
        cooldown: 3,
        enabled: true
    },
    run: async (bot, message, args) => {

    let argsresult;
    const mChannel = message.mentions.channels.first();


    message.delete();
    if(mChannel) {
        argsresult = args.slice(1).join(' ');
        mChannel.send(argsresults.replace(/@/g, '@' + String.fromCharCode(8203)));
    }
    else {
        argsresult = args.join(' ');
        message.channel.send(argsresult.replace(/@/g, '@' + String.fromCharCode(8203)));

    }


    }

    };
