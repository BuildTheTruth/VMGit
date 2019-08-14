const [Repository, REPOSITORY_LOCATION] = require('./Repository');
const [File, FILE_STATUS] = require('./File');
const MESSAGE = require('./Message');
const Log = require('./Log');
class Command {
    constructor(locals, remotes) {
        this.map = new Map();
        this.locals = locals;
        this.remotes = remotes;
        this.logs = [];
        this.checkouted = null;
        this.run = null;
        this.setMap();
    }

    set(cmd) {
        const [act, ...opts] = cmd.split(' ');
        if (!this.map.has(act)) throw MESSAGE.UNDEFINED_COMMAND;
        this.run = this.map.get(act).run.bind(this, opts);
    }

    setMap() {
        this.map.set('init', { run: this.createRepository, desc: "Create new repository in the local." });
        this.map.set('status', { run: this.showStatus, desc: "Show current situation in the local or remote repository." });
        this.map.set('checkout', { run: this.checkoutRepository, desc: "Select the repository to control" });
        this.map.set('new', { run: this.createFile, desc: "Create new file in checkouted repository." });
        this.map.set('add', { run: this.addStagingArea, desc: "Move a file from working directory to staging area." });
        this.map.set('commit', { run: this.commitGitRepository, desc: "Move the files from staging area to git repository." });
        this.map.set('touch', { run: this.touchFile, desc: "Modify a file." });
        this.map.set('log', { run: this.showLog, desc: "Show logs committed message and list of files." });
        this.map.set('push', { run: this.pushRemoteRepository, desc: "Move the files from local repository to remote repository." });
        this.map.set('help', { run: this.showHelp, desc: "Show the information of commands." });
    }

    getPrompt() {
        if (this.checkouted) return `/${this.checkouted.name}/`;
        else return "/>";
    }

    createRepository(opts) {
        const repositoryName = opts[0];
        if (!repositoryName) throw MESSAGE.EMPTY_NAME;
        this.locals.set(repositoryName, new Repository(repositoryName, REPOSITORY_LOCATION.LOCAL));
        console.log(`created '${repositoryName}' repository.`);
    }

    showStatus(opts) {
        const [location, repositoryName] = opts;
        if (this.checkouted && !location) {
            this.showCheckoutedFiles();
        } else {
            switch (location) {
                case 'local':
                    if (!this.locals.has(repositoryName)) throw MESSAGE.EMPTY_NAME;
                    const localRepository = this.locals.get(repositoryName);
                    this.showFilesOfRepository(localRepository);
                    break;
                case 'remote':
                    if (!this.remotes.has(repositoryName)) throw MESSAGE.EMPTY_NAME;
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

    showCheckoutedFiles() {
        console.log("---Working Directory/");
        this.showFilesByStatus(FILE_STATUS.MODIFIED);
        this.showFilesByStatus(FILE_STATUS.UNTRACKED);
        console.log("---Staging Area/");
        this.showFilesByStatus(FILE_STATUS.STAGED);
        console.log("---Git Repository/");
        this.showFilesByStatus(FILE_STATUS.UNMODIFIED);
        console.log();
    }

    showFilesByStatus(status) {
        this.checkouted.files.forEach((file) => {
            if (file.status === status) {
                console.log(`${file.name}  ${file.date} ${file.time}`)
            }
        });
    }

    showFilesOfRepository(repository) {
        let result = `/${repository.name}/`;
        const files = repository.files;
        if (files.length > 0) {
            files.forEach((file) => {
                console.log(result + file.name);
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
            if (!this.locals.has(repositoryName)) throw MESSAGE.UNDEFINED_REPOSITORY;
            this.checkouted = this.locals.get(repositoryName);
        }
    }

    createFile(opts) {
        if (!this.checkouted) throw MESSAGE.UNCHECKOUTED_REPOSITORY;
        const fileName = opts[0];
        const file = new File(fileName);
        this.checkouted.files.push(file);
        console.log(`created '${fileName}' file in ${this.checkouted.name}.`);
    }

    addStagingArea(opts) {
        const fileName = opts[0];
        const target = this.checkouted.files.filter((file) => {
            return file.name === fileName;
        })[0];
        if (!target) throw MESSAGE.UNDEFINED_FILE;
        target.status = FILE_STATUS.STAGED;
        this.showCheckoutedFiles();
    }

    commitGitRepository(opts) {
        const msg = opts.reduce((total, current) => {
            return total + current + ' ';
        }, "").slice(0, -1);
        const stagingFiles = this.checkouted.files.filter((file) => {
            return file.status === FILE_STATUS.STAGED;
        });
        stagingFiles.forEach((file) => {
            file.status = FILE_STATUS.UNMODIFIED;
        });
        this.showCheckoutedFiles();
        this.logs.push(new Log(msg, stagingFiles));
    }

    touchFile(opts) {
        const fileName = opts[0];
        const target = this.checkouted.files.filter((file) => {
            return file.name === fileName;
        })[0];
        if(!target) throw MESSAGE.UNDEFINED_FILE;
        target.status = FILE_STATUS.MODIFIED;
        this.showCheckoutedFiles();
    }

    showLog() {
        this.logs.forEach((log) => {
            console.log(`commit "${log.msg}"    ${log.date} ${log.time}`);
            log.files.forEach((file) => {
                console.log(`${file.name}   ${file.date} ${file.time}`);
            });
        });
    }

    pushRemoteRepository() {

    }

    showHelp() {
        console.log();
        for (const [key, value] of this.map) {
            console.log(`${key}: ${value.desc}`);
        }
        console.log();
    }
}

module.exports = Command;
