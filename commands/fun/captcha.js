const Discord = require('discord.js');
const Jimp = require('jimp');
const query = new Map();

module.exports = {
	config: {
		name: 'captcha',
		description: 'Sends a captcha image.',
		usage: '',
		category: 'fun',
		accessableby: 'Members',
		voterOnly: true,
		enabled: true,
	},
	run: async (bot, message, args) => {

		//  if(message.author.id !== '413834975347998720') return errors.ownerOnly(message, 'BOT_OWNER')

		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const stringLength = 4;
		function pickRandom() {
			return possible[Math.floor(Math.random() * possible.length)];
		}

		const captcha = Array.apply(null, Array(stringLength)).map(pickRandom).join('');
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
			.setDescription('Please solve this captcha by sending the code in this channel.\nExpires in 30 seconds. (Test command)')
			.attachFile({ attachment: buffer, name: 'captcha.jpeg' })
			.setImage('attachment://captcha.jpeg');
		message.channel.send(embed);

		query.set(message.author.id, captcha);

		// Arguments provided

		if (!query.has(message.author.id))return message.reply('⛔ | Please request a captcha by sending s!verify');

		const captcha2 = query.get(message.author.id);

		const filter = m => m.author.id === message.author.id;
		message.channel
			.awaitMessages(filter, {
				max: 1,
				time: 30000,
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


					message.channel.send('✅ | Correct!');
					query.delete(message.author.id);


				}
			}).catch(e => {
				message.channel.send('Time expired!');
			});


	},
};
