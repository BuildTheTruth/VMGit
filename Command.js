const Command = class {
    constructor (name, callback) {
        this.name = name;
        this.callback = callback;
    }
}

module.exports = Command;