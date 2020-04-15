const Discord = require('discord.js');
const cases = require('../../models/case.js');
const AsciiTable = require('ascii-table');
const table = new AsciiTable();
table.setHeading('Case', 'Action', 'User IDD', 'Reason');

module.exports = {
	config: {
		name: 'test',
		description: 'A test command that the bot owner uses!',
		usage: '',
		category: 'owners',
		accessableby: 'Owners',
		ownerOnly: true,
		enabled: true,
	},
	run: async (bot, message, args) => {

    const user = message.mentions.users.first() || bot.users.fetch(args[0]) || message.author;
    const usercases = await cases.find({ guildID: message.guild.id, wUserID: user.id });
   /* const embed = new Discord.MessageEmbed()
    .setAuthor(`Infractions for ${user.tag}`, user.displayAvatarURL({ dyanmic: true }))
    .setColor('RANDOM')
    .setFooter(`${usercases.length} total infractions.`);

    for(let i = 0; i < usercases.length; i++) {
      const mod = bot.users.fetch(usercases[i].mUserID);
      embed.addField(`Case ${usercases[i].caseid}`, `**Moderator:** ${mod.username}\n**Reason:** ${usercases[i].reason}`);
    }; */
    for (let i = 0; i < usercases.length; i++) {
      table.addRow(`${usercases[i].caseid}`, `${usercases[i].action}`, `${usercases[i].wUserID}`, `${usercases[i].reason}`);
    }

    message.channel.send(`\`\`\`${table}\`\`\``);
  },
};
