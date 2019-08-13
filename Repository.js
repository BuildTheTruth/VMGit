const [getDate, getTime] = require('./Date');

const REPOSITORY_LOCATION = {
    LOCAL : 0,
    REMOTE : 1
}

const Repository = class {
    constructor(name, location) {
        this.name = name;
        this.location = location;
        this.date = getDate();
        this.time = getTime();
        this.files = [];
    }
}

module.exports = [Repository, REPOSITORY_LOCATION];
