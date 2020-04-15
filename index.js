const { ShardingManager } = require('discord.js');
const { logger } = require('./utils/logger.js');
const manager = new ShardingManager('./Staric.js', { token: process.env.TOKEN, shardArgs: ['--ansi', '--color', '--trace-warnings'] });

manager.spawn();
manager.on('shardCreate', shard => logger.log('info', `Launched shard ${shard.id} [ ${shard.id + 1} of ${manager.totalShards}]`));