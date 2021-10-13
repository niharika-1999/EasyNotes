const {
    createLogger,
    transports,
    format } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp({format:"MMM-DD-YYYY HH:mm:ss"}), format.json()),
    transports: [
        new transports.File({ filename: 'logs/errorLogsForDate '+new Date().toLocaleDateString().replace(/\D/g, '-')+'.log', level: 'error' }),
    ],
});

module.exports = logger; 