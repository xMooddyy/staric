const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const util = require('util');
const Config = require('../models/guildSettings.js');
const cases = require('../models/case.js');
const { Player } = require('discord-player');
const db = require('quick.db');

module.exports = class StaricClient extends Client {
	constructor(options) {
		super(options);

		this.commands = new Collection();
		this.aliases = new Collection();
		this.wait = util.promisify(setTimeout);
    this.player = new Player(this, process.env.YT_SIMPLE_KEY, {
      leaveOnEnd: true,
      leaveOnStop: true,
      leaveOnEmpty: true,
    });
    this.qsaves = new db.table('qsaves');
    this.mongoose = require('./mongoose.js');
    this.defaultSettings = {
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
    };
	}

	commandHandler(dirs) {
		const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
		for (const file of commands) {
			delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
			this.commands.delete(file);
			const pull = require(`../commands/${dirs}/${file}`);
			this.commands.set(pull.config.name, pull);
			if (pull.config.aliases) pull.config.aliases.forEach(a => this.aliases.set(a, pull.config.name));
		}
	}

	async getGuild(guild) {
		const res = await Config.findOne({ guildID: guild.id });

		if(res) return res;
	}
	async updateGuild(guild, settings) {
		let data = await this.getGuild(guild);

		if (typeof data !== 'object') data = {};
		for (const key in settings) {
			if (data[key] !== settings[key]) data[key] = settings[key];
			else return;
		}

		console.log(`Guild "${guild.name}" updated settings: ${Object.keys(settings)}`);
		return await data.updateOne(settings);
	}

  async createGuild() {
        const defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, this.defaultSettings);
        const merged = Object.assign(defaults, settings);

        const newGuild = await new Config(merged);
        return newGuild.save()
            .then(console.log(`Default settings saved for guild "${merged.guildName}" (${merged.guildID})`));
    };

  async getCase(guild, caseid) {
    const res = await cases.findOne({ guildID: guild.id, caseid: caseid });

    if(res) return res;
    else return false;
  }
  async updateCase(guild, caseid, settings) {
    let data = await cases.findOne({ guildID: guild.id, caseid: caseid });

    if(typeof data !== 'object') data = {};
    for (const key in settings) {
      if(data[key] !== settings[key]) data[key] = settings[key];
      else return;
    }

    console.log(`Guild '${guild.name} updated case: ${Object.keys(settings)}`);
    return await data.updateOne(settings);
  }
	generateKey(length) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
};