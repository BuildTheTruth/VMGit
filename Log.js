const [getDate, getTime] = require('./Date');

class Log {
    constructor(msg, files) {
        this.msg = msg;
        this.files = files;
        this.date = getDate();
        this.time = getTime();
    }
}

module.exports = Log;