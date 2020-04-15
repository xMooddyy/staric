const users = require('../models/blacklistedusers.js');
const Config = require('../models/guildSettings.js');
const Discord = require('discord.js');
const talked = new Set();
const {
	permissions,
} = require('../utils/permissions.js');
const ms = require('ms');
const swearWords = ['darn', 'shucks', 'frak', 'shite', 'shit', 'fuck', 'cunt', 'nigga', 'bitch', 'fuck', 'nigg', 'fuk', 'cnut', 'dick', 'd1ck', 'pussy', 'asshole', 'b1tch', 'b!tch', 'blowjob', 'cock', 'c0ck'];
const cooldowns = new Discord.Collection();

const ownerID = '413834975347998720';

module.exports = async (bot, message) => {

	if (message.author.bot) return;

  if(message.author.id === '413834975347998720') message.author.isOwner = true;
  else message.author.isOwner = false;

	let res;

	if (message.channel.type !== 'dm') {
		res = await bot.getGuild(message.guild);
	}
	else {
		res = null;
	}

	const cd = new Set();
	const cdseconds = 5;

	const prefixMention = new RegExp(`^<@!?${bot.user.id}> `);
	let prefix2;
	if (!res) prefix2 = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : 's!';
	else prefix2 = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : res.prefix;


	const args = message.content.slice(prefix2.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();


	if (res !== null && res.filterbadwords === true) {
		//  if(message.author.id !== '413834975347998720') {
		if (swearWords.some(word => message.content.includes(word))) {
			message.delete();
			message.reply('no swearing!').then(msg => msg.delete({timeout: 5000 }));
			//  }
		}
	}


	if (!message.content.startsWith(prefix2)) return;

	users.findOne({
		userID: message.author.id,
	}, async (err, user) => {

		const voted = await bot.dbl.hasVoted(message.author.id);

		const commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
		if (commandfile) {


			if (commandfile.config.voterOnly && commandfile.config.voterOnly === true && voted === false) return message.channel.send(new Discord.MessageEmbed().setDescription('This command is for voters only, vote [here](https://top.gg/bot/614175460313661470/vote) to use this command!').setColor('RANDOM'));

			if (commandfile.config.userPermissions && !message.member.hasPermission(commandfile.config.userPermissions)) return message.channel.send(`The \`${commandfile.config.name}\` command requires you to have the '${permissions[commandfile.config.userPermissions[0]]}' permission(s).`);

			if (commandfile.config.botPermissions && !message.guild.me.hasPermission(commandfile.config.botPermissions)) return message.channel.send(`The \`${commandfile.config.name}\` command requires me to have the '${permissions[commandfile.config.botPermissions[0]]}' permission(s).`);

			if (commandfile.config.ownerOnly && commandfile.config.ownerOnly === true && message.author.id !== process.env.OWNER) return message.channel.send(`The \`${commandfile.config.name}\` command can only be used by the bot owner`);
			if (message.author.id !== '413834975347998720' && commandfile.config.enabled === false) return message.channel.send(`The command\`${commandfile.config.name}\` is disabled.`);

		 Config.findOneAndUpdate({ guildID: message.guild.id }, { $inc: { commandsused: 1 } }).then(a => {
       a.save();
     });

		}


		if (!cooldowns.has(commandfile.config.name)) cooldowns.set(commandfile.config.name, new Discord.Collection());

		const now = Date.now();
		const timestamps = cooldowns.get(commandfile.config.name);
		const cooldownAmount = (commandfile.config.cooldown) * 1000;


		if (!timestamps.has(message.author.id) && message.author.id !== '413834975347998720') {
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}
		else {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime && message.author.id !== '413834975347998720') {
				const timeLeft = (expirationTime - now) / 1000;
				return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${commandfile.config.name}\` command. ${message.author}`);
			}

			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		}

		try {

			if (!user) commandfile.run(bot, message, args);
			else if (user.userID === message.author.id) return message.channel.send(new Discord.MessageEmbed().setDescription(`You're blacklisted from using the bot for: ${user.reason}\nFor more information, please contact the bot owner [here](https://discord.gg/EFxRUJU).`));
		}
		catch (e) {
			console.log(e);
			message.channel.send(`There was an error while trying to run this command! The error has been reported to the developers. ${e}`);
		}


	});


};
