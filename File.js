const [getDate, getTime] = require('./date');

const File = class {
    constructor(name) {
        this.name = name;
        this.date = getDate();
        this.time = getTime();
        this.status = 'untracked';
    }
}

module.exports = File;