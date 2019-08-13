const [getDate, getTime] = require('./Date');

const FILE_STATUS = {
    UNTRACKED: 0,
    MODIFIED: 1,
    STAGED: 2,
    UNMODIFIED: 3
}

const File = class {
    constructor(name) {
        this.name = name;
        this.date = getDate();
        this.time = getTime();
        this.status = FILE_STATUS.UNTRACKED;
    }
}

module.exports = [File, FILE_STATUS];
