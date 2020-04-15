const winston = require('winston');

module.exports.logger = winston.createLogger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`)
});