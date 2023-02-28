const { on } = require('nodemon');
const { log } = require('winston');
const winston = require('winston');


let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all: false
    }),
    winston.format.label({
        label: '[LOGGER]'
    }),
    winston.format.timestamp({
        format: "YY-MM-DD HH:MM:SS"
    }),
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )



);
winston.addColors({
    info: 'bold blue', // fontStyle color
    warn: 'italic yellow',
    error: 'bold red',
    debug: 'green',

});
module.exports = function () {

    const files = new winston.transports.File({ filename: 'logfile.log', maxsize: '20mb' });
    const console = new winston.transports.Console({ format: winston.format.combine(alignColorsAndTime) })

    winston.add(console);
    winston.add(files);

}