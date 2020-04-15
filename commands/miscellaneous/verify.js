const Discord = require('discord.js');
const Jimp = require('jimp');
const query = new Map();
const guilds = ['601802265447235584', '684776882109022213'];

module.exports = {
	config: {
		name: 'verify',
		description: 'Verify using captcha.',
		usage: '',
		category: 'miscellaneous',
		accessableby: 'Members',
		cooldown: 3,
		enabled: true,
	},
	run: async (bot, message, args) => {

		if(!guilds.includes(message.guild.id)) {
			const embeded = new Discord.MessageEmbed()
				.setDescription('This command is made only for Staric\'s [Support Server](https://discord.gg/EFxRUJU)\nFeel free to join the server to test the command!')
				.setColor('RANDOM');

			return message.channel.send(embeded);
		}


		let verifyRole = message.guild.roles.cache.find(r => r.name === 'Mood Gang' || r.id === '601803581560979457');

		if(message.guild.id === '684776882109022213') {
			verifyRole = message.guild.roles.cache.find(r => r.name === 'Members' || r.id === '684777832366473257');
		}

		if(message.member.roles.cache.has(verifyRole.id)) return message.channel.send('You are already verified.');

		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const stringLength = 4;
		function pickRandom() {
			return possible[Math.floor(Math.random() * possible.length)];
		}
		const captcha = Array.apply(null, Array(stringLength)).map(pickRandom).join('');
		// No arguments provided


		const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
		const image = await Jimp.read(
			'https://cdn.glitch.com/b0aa5a88-a548-4566-8d92-145fada35740%2F48549e1f-f225-4ef3-b71a-b2ed54c05cd0.image.png?v=1580650047641',
		);
		const image2 = await Jimp.read('https://cdn.glitch.com/b0aa5a88-a548-4566-8d92-145fada35740%2F0ed96416-f888-4603-a7dd-9e7ccefbc81e.image.png?v=1580650604120');

		image2.opacity(0.5);

		image.resize(256, 90);
		image.print(font, 15, 0, captcha);
		image.composite(image2, 0, 0);


		const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Verification')
			.setDescription('Please solve this captcha by sending the code in this channel.\nExpires in 30 seconds.')
			.attachFiles([{ attachment: buffer, name: 'captcha.jpeg' }])
			.setImage('attachment://captcha.jpeg');
		await message.channel.send(embed);

		query.set(message.author.id, captcha);

		// Arguments provided

		if (!query.has(message.author.id)) return message.reply('⛔ | Please request a captcha by sending s!verify');

		const captcha2 = query.get(message.author.id);

		const filter = m => m.author.id === message.author.id;

		//  const m = message.channel.createMessageCollector(filter, { time: 15000 });

		// m.on('collect', c => console.log(c));
		message.channel
			.awaitMessages(filter, {
				max: 1,
				time: 60000,
			})
			.then(collected => {
				if (collected.first().content === 'cancel') {
					message.channel.send('Cancelled.');
					query.delete(message.author.id);
				}
				else if (collected.first().content !== captcha2) {
					message.channel.send('⛔ | Invalid captcha!');
					query.delete(message.author.id);
				}
				else {

					if(!verifyRole) return message.channel.send(' cannot find the role \'Mood Gang\'');

					message.member.roles.add(verifyRole).then(() => {


						message.channel.send('✅ | Successfully verified!');
						query.delete(message.author.id);

					}).catch(console.error);

				}
			}).catch(e => {
				message.channel.send('Time expired!');
			});
	},

};
