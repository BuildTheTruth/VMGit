const Repository = require('./Repository');
const File = require('./File');
const MESSAGE = require('./Message');
class Command {
    constructor(locals, remotes) {
        this.map = new Map();
        this.locals = locals;
        this.remotes = remotes;
        this.checkouted = null;
        this.act = null;
        this.opts = null;
        this.run = null;
        this.setMap();
    }

    set(cmd) {
        const [act, ...opts] = cmd.split(' ');
        if (!this.map.has(act)) throw MESSAGE.UNDEFINED_COMMAND;
        this.run = this.map.get(act).bind(this, opts);
    }

    setMap() {
        this.map.set('init', this.createRepository);
        this.map.set('status', this.showStatus);
        this.map.set('checkout', this.checkoutRepository);
        this.map.set('new', this.createFile);
        this.map.set('add', this.addStagingArea);
        this.map.set('commit', this.commitGitRepository);
        this.map.set('touch', this.touchFile);
        this.map.set('log', this.showLog);
        this.map.set('push', this.pushRemoteRepository);
    }

    getPrompt() {
        if (this.checkouted) return `/${this.checkouted.name}/`;
        else return "/>";
    }

    createRepository(opts) {
        const repositoryName = opts[0];
        if (!repositoryName) throw MESSAGE.EMPTY_NAME;
        this.locals.set(repositoryName, new Repository(repositoryName, 'local'));
        console.log(`created '${repositoryName}' repository.`);
    }

    showStatus(opts) {
        const [location, repositoryName] = opts;
        if (this.checkouted) {

        } else {
            switch (location) {
                case 'local':
                    if (!this.locals.has(repositoryName)) throw MESSAGE.UNDEFINED_REPOSITOR;
                    const localRepository = this.locals.get(repositoryName);
                    this.showFilesOfRepository(localRepository);
                    break;
                case 'remote':
                    if (!this.remotes.has(repositoryName)) throw MESSAGE.UNDEFINED_REPOSITOR;
                    const remoteRepository = this.remotes.get(repositoryName);
                    this.showFilesOfRepository(remoteRepository);
                    break;
                default:
                    for (const repository of this.locals.values()) {
                        this.showFilesOfRepository(repository);
                    }
            }
        }
    }

    showFilesOfRepository(repository) {
        let result = `/${repository.name}/`;
        const files = repository.files;
        if (files.length > 0) {
            files.forEach((file) => {
                console.log(result + `${file.name}`);
            });
        } else {
            console.log(result);
        }
    }

    checkoutRepository(opts) {
        if (this.checkouted && opts.length == 0) {
            this.checkouted = null;
        } else {
            const repositoryName = opts[0];
            if (!this.locals.has(repositoryName)) throw MESSAGE.UNDEFINED_REPOSITOR;
            this.checkouted = this.locals.get(repositoryName);
        }
    }

    createFile() {

    }

    addStagingArea() {

    }

    commitGitRepository() {

    }

    touchFile() {

    }

    showLog() {

    }

    pushRemoteRepository() {

    }
}

module.exports = Command;
