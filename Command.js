const Repository = require('./Repository');
const File = require('./File');
const MESSAGE = require('./Message');
class Command {
    constructor(cmd, locals, remotes) {
        this.map = new Map();
        [this.act, ...this.opts] = cmd.split(' ');
        this.locals = locals;
        this.remotes = remotes;
        this.setMap();
        this.run = this.map.get(this.act);
        this.checkoutedRepositoryName = null;
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

    createRepository() {
        const repositoryName = this.opts[0];
        if (!repositoryName) throw MESSAGE.EMPTY_NAME;
        this.locals.set(repositoryName, new Repository(repositoryName, 'local'));
        console.log(`created '${repositoryName}' repository.`);
    }

    showStatus() {
        const [location, repositoryName] = this.opts;
        if(this.checkoutedRepositoryName) {

        } else {
            switch (location) {
                case 'local':
                    if (!repositoryName) throw MESSAGE.UNDEFINED_REPOSITOR;
                    const localRepository = this.locals.get(repositoryName);
                    this.showFilesOfRepository(localRepository);
                    break;
                case 'remote':
                    if (!repositoryName) throw MESSAGE.UNDEFINED_REPOSITOR;
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

    checkoutRepository() {

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
