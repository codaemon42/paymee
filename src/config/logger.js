const { createLogger, transports } = require('winston');

const infoLogger = createLogger({
	transports: new transports.File({
		level: 'info',
		filename: './logs/infoLogs.log'
	})
});

infoLogger.stream = {
	write: (message, encoding) => {
		infoLogger.info(message);
	}
}

module.exports = infoLogger;