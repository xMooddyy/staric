const Discord = require('discord.js');
const os = require('os');
const cpuStat = require('cpu-stat');
const { stripIndents } = require('common-tags');
const moment = require('moment');

module.exports = {
	 config: {
			 name: 'botinfo',
			 description: 'Displays the info about the bot.',
			 usage: '',
			 category: 'miscellaneous',
			 accessableby: 'Members',
			 aliases: ['bi', 'stats'],
	 cooldown: 3,
	 enabled: true,
	 },
	 run: async (bot, message, args) => {

		 const { version } = require('discord.js');

					 cpuStat.usagePercent(function(err, percent, seconds) {
						 if (err) {
							 return console.log(err);
						 }

						 function duration(ms) {
			 const sec = Math.floor((ms / 1000) % 60).toString();
			 const min = Math.floor((ms / (1000 * 60)) % 60).toString();
			 const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
			 const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
			 return `${days.padStart(1, '0')}d, ${hrs.padStart(2, '0')}h, ${min.padStart(2, '0')}m, ${sec.padStart(2, '0')}s. `;
	 }

			 function checkDays(date) {
					 const now = new Date();
					 const diff = now.getTime() - date.getTime();
					 const days = Math.floor(diff / 86400000);
					 return days + (days == 1 ? ' day' : ' days') + ' ago';
			 }


			 const inline = true;
			 const bicon = bot.user.displayAvatarURL({ dynamic: true });
			 const usersize = bot.guilds.cache.reduce((prev, val) => val.memberCount + prev, 0);
			 const chansize = bot.channels.cache.size;
			 const uptimxd = bot.uptime;
			 const servsize = bot.guilds.cache.size;
			/* const botembed = new Discord.MessageEmbed()
			 .setColor(0xADD8E6)
			 .setThumbnail(bicon)
			 .addField('Bot Name', `${bot.user.username}`, inline)
			 .addField('Bot Owner', '<@413834975347998720>', inline )
			 .addField('Servers', `${servsize}`, inline)
			 .addField('Channels', `${chansize}`, inline)
			 .addField('Users', `${usersize}`, inline)
			 .addField('Bot Library', '<:jsGreenLogo2:653712996752687114> Discord.js', inline)
			 .addField('Creation Date', `${bot.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(bot.user.createdAt)})`, true, inline)
			 .addField('RAM Usage', memory + '/512MB - ' + Math.round(((memory / 512 )) * 100) + '%')
			 .setFooter(`Developed by: ahmood`, bot.user.displayAvatarURL)
			 .setTimestamp()*/
		 /*  const botembed = new Discord.MessageEmbed()
						.setColor('RANDOM')
						.addField('• Mem Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
						.addField('• Uptime ', `${duration(bot.uptime)}`, true) //`${duration}`, true)
						.addField('• Users', `${usersize}`, true)
						.addField('• Servers', `${bot.guilds.size.toLocaleString()}`, true)
						.addField('• Channels ', `${bot.channels.size.toLocaleString()}`, true)
						.addField('• Discord.js', `v${version}`, true)
						.addField('• Node', `${process.version}`, true)
						.addField(`• Invite Link`, `[Invite me!](https://discordapp.com/oauth2/authorize/?permissions=8&scope=bot&client_id=614175460313661470)`, true)
						.addField(`• Support Server`, `[Join me!](https://discord.gg/tEX6s7Q)`, true)
						.addField('• CPU', `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
						.addField('• CPU usage', `\`${percent.toFixed(2)}%\``,true)
						.addField('• Arch', `\`${os.arch()}\``,true)
						.addField('• Platform', `\`\`${os.platform()}\`\``,true)
						.setFooter(`• Bot ID: ${bot.user.id}`, bot.user.displayAvatarURL)
						.setTimestamp()*/

			 const botm = message.guild.member(bot.user);

			 const a = {
				 linux: 'Linux',
			 };

			 const botembed = new Discord.MessageEmbed()
			 .setColor('RANDOM')
			 .setAuthor(botm.nickname || bot.user.username, bot.user.displayAvatarURL({ dynamic: true }))
			 .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
			 .addField('> Bot Information', stripIndents`**❯ Profile:** ${bot.user}
			 **❯ Bot Owner:** ahmood#0001
			 **❯ Discord.js:** v${version}
			 **❯ Node:** ${process.version}
			 **❯ Uptime:** ${duration(bot.uptime)}`)
			 .addField('> Bot Metrics', stripIndents`**❯ Servers:** ${bot.guilds.cache.size}
			 **❯ Channels:** ${bot.channels.cache.size}
			 **❯ Users:** ${usersize}
			 **❯ Shards:** ${bot.shard.count}
			 **❯ Total Commands:** ${bot.commands.size}`)
			 .addField('> OS Information', stripIndents`**❯ Platform:** ${a[os.platform()]}
			 **❯ CPU:**  \`${os.cpus().map(i => `${i.model}`)[0]}\`
			 **❯ Arch:** ${os.arch()}`)
			 .addField('> Usage', stripIndents`**❯ CPU Usage:** ${percent.toFixed(2)}%
			 **❯ Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
			 .addField('> Useful Links', stripIndents`**❯ Bot Invite:** [Click me](https://discordapp.com/oauth2/authorize?client_id=614175460313661470&permissions=8&scope=bot)
			 **❯ Support Server:** [Click me](https://discord.gg/EFxRUJU)
			 **❯ Donations:** [Donatebot.io](https://donatebot.io/checkout/601802265447235584) | [Ko-fi](https://ko-fi.com/moodymood) | [Patreon](https://www.patreon.com/moodymood)
			 **❯ Vote:** [ADL](https://abstractlist.net/bot/614175460313661470/vote) | [DBL](https://top.gg/bot/614175460313661470/vote)`)
			 .setFooter(`Bot ID: ${bot.user.id}`, bot.user.displayAvatarURL({ dyamic: true }))
			 .setTimestamp();


			 message.channel.send(botembed);
					 });
	 },
};
