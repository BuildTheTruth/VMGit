const [getDate, getTime] = require('./date');

const Repository = class {
    constructor(name, location) {
        this.name = name;
        this.location = location;
        this.date = getDate();
        this.time = getTime();
        this.files = [];
    }
}

module.exports = Repository;