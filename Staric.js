String.prototype.toProperCase = function() {
	return this.toLowerCase().replace(/(^|[\s.])[^\s.]/gm, (s) => s.toUpperCase());
};

String.prototype.chars = function(max) {
  return ((this.length > max) ? `${this.slice(0, max)}...` : `${this}`);
};

Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.findDuplicates = function() {
    const sorted_arr = this.slice().sort();
    const results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
};

Array.prototype.diff = function(a) {
 return this.filter((i) => {
 return a.indexOf(i) === -1;
 });
};

const chart = require('chartjs');
const { Collection } = require('discord.js');
const Client = require('./base/Client.js');
const users = require('./models/blacklistedusers.js');
const bot = new Client({ fetchAllMembers: true });
const express = require('express');
const keepalive = require('express-glitch-keepalive');
const app = express();
const md = require('marked');
const token = process.env.TOKEN;
const path = require('path');
const Discord = require('discord.js');
const Config = require('./models/guildSettings.js');
const { logger } = require('./utils/logger.js');
const DBL = require('dblapi.js');
const BOATS = require('boats.js');
bot.boats = new BOATS('NFu9fZkkeKvyhTG6H0Yx0PsS9ra1Fx92iDkcGHalKZ6mmMKFB6IVcmA7z1e20xxw1WVVTg7PpgpCCoBkTUJGDZ52Jxh1mANrwlVwC9k9B0m4uFlH62dk6ztEvTZD1T7IcTh1RMA4TFSCqoy2JmOIWlrZKUC');
bot.dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDE3NTQ2MDMxMzY2MTQ3MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg1MjI1NzU1fQ.jyxQRNNeieJ1qFkhmQauywNQZlJsuO9IhFwDHD5Rn0Q', bot);

const renderTemplate = (res, req, template, data = {}) => {
	const baseData = {
		bot: bot,
		path: req.path,
	};
	res.render(path.resolve(`public/${template}`), Object.assign(baseData, data));
};

bot.groups = [
	['economy', 'Economy commands, rob or work to gain money! 💸'],
	['fun', 'Fun commands. 😂'],
	['miscellaneous', 'Miscellaneous commands or utility commands. ⚙️'],
	['moderation', 'Moderation commands to keep your server safe! ⚒️'],
	['music', 'Music commands to listen for some music. 🎶'],
	['owners', 'Owner commands, for the bot owners only. 🔒'],
	['roblox', 'Roblox commands, find and learn more about a Roblox user! <:roblox:655560830791974932>'],
	['search', 'Search the internet for some useful information! 🔍'],
];

bot.dbl.on('posted', () => {
	logger.log('info', 'Server count posted!');
});

bot.dbl.on('error', e => {
	console.log(`Oops! ${e}`);
});

app.use(keepalive);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile('public/index.html', { root: __dirname });
});

app.get('/welcome', (req, res) => {
	renderTemplate(res, req, 'welcome.php', { md });
});

app.get('/commands', (req, res) => {
	renderTemplate(res, req, 'commands.ejs', { md });
});

app.get('/stats', (req, res) => {
	const duration = require('ms')(bot.uptime, { long: true });
	const members = bot.guilds.reduce((prev, val) => val.memberCount + prev, 0);
	const textChannels = bot.channels.filter(c => c.type === 'text').size;
	const voiceChannels = bot.channels.filter(c => c.type === 'voice').size;
	const guilds = bot.guilds.size;
	renderTemplate(res, req, 'stats.ejs', {
		stats: {
			servers: guilds,
			members: members,
			text: textChannels,
			voice: voiceChannels,
			uptime: duration,
			memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
			dVersion: Discord.version,
			nVersion: process.version,
		},
	});
});

app.get('/test', (req, res) => {
	renderTemplate(res, req, 'test.ejs', { md });
});

app.get('/guild/:guildID/stats', async (req, res) => {
	const guild = bot.guilds.get(req.params.guildID);
	if (!guild) return res.sendStatus(404);
	renderTemplate(res, req, 'guild/stats.ejs', {
		guild: guild,
	});
});

app.get('/', (request, response) => {
	response.sendStatus(200);
});

app.listen(process.env.PORT);

['console', 'command', 'event'].forEach(x => require(`./handlers/${x}`)(bot));

bot.on('uncaughtException', (err) => {
	console.log('Uncaught Exception', err);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

bot.on('error', (err) => {
	console.log('Error:', err);
});

bot.on('shardReady', (id, guilds) => {
  console.log(`Shard ${id} is ready!`);
});

bot.mongoose.init();
bot.login(token);
