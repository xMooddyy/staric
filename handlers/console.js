module.exports = (bot) => {
	const prompt = process.openStdin();
	prompt.addListener('data', res => {
		const x = res.toString().trim().split(/ +/g);
		bot.channels.get('601802265447235586').send(x.join(' '));
	});
};
