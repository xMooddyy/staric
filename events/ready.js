const chalk = require('chalk');
const mongoose = require('mongoose');
const { logger } = require('../utils/logger.js');

/* mongoose.connect('mongodb://moody:moody@mycluster-shard-00-00-5z0ha.mongodb.net:27017 ,mycluster-shard-00-01-5z0ha.mongodb.net:27017 ,mycluster-shard-00-02-5z0ha.mongodb.net:27017/StaricDatabase?ssl=true&replicaSet=mycluster-shard-0&authSource=admin&retryWrites=true', {
	useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, autoIndex: false }, (err) => {
	if(err) logger.log('error', err);

	logger.log('info', 'Connected to MongoDB database!');
}); */
const Config = require('../models/guildSettings.js');
module.exports = async bot => {
	logger.log('info', `${bot.user.username} is ready to watch ${bot.guilds.cache.reduce((prev, val) => val.memberCount + prev, 0)} users and ${bot.guilds.cache.size} servers!`);

	const statuses = [
		`${bot.guilds.cache.size} servers!`,
		's!help | Made by ahmood#0001',
		`over ${bot.guilds.cache.reduce((prev, val) => val.memberCount + prev, 0)} users!`,
	];

	const status = statuses.random();
	bot.user.setActivity(status, { type: 'WATCHING' });

	bot.dbl.postStats(bot.guilds.cache.size, bot.shard.id, bot.shard.count);

	setInterval(function() {

		bot.user.setActivity(status, { type: 'WATCHING' });

	}, 120000);

	const adlapi = require('adlapi.js');
	bot.adl = new adlapi('Nz18JOpf3m9B7EWrQJ9Uu9AMh3bBxSPZ', 'staric', {
		universal: {
			users: () => bot.guilds.cache.reduce((prev, val) => val.memberCount + prev, 0),
			guilds: () => bot.guilds.cache.size,
			shards: () => bot.shard.count,
		},
	});

	bot.adl.on('posted', res => {
		logger.log('info', 'Posted stats: ', res);
	});

	bot.adl.on('error', err => {
		logger.log('error', 'An error occured: ', err);
	});

	bot.adl.postStats();
	setInterval(async () => {
    await bot.adl.postStats();
		await bot.dbl.postStats(bot.guilds.cache.size, bot.shard.id, bot.shard.count);
		await bot.boats.postStats(bot.guilds.cache.size, bot.user.id);
		logger.log('info', 'Posted stats');
	}, 1000 * 60 * 30);

	await bot.guilds.cache.keyArray().forEach(id => {

		Config.findOne({
			guildID: id,
		}, (err, guild) => {
			if(err) logger.log('error', err);

			if(!guild) {
				const newConfig = new Config({
					guildID: id,
					prefix: 's!',
					welcomelog: false,
					welcomechannel: 'Not set.',
					modlog: false,
					modlogchannel: 'Not set.',
					leavelog: false,
					leavechannel: 'Not set.',
					logs: false,
					logschannel: 'Not set.',
					announcechannel: 'Not set.',
					filterbadwords: false,
					commandsused: 0,
				});

				return newConfig.save();
			}
		});
	});


};
