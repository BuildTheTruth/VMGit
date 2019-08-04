const Repository = require('./Repository');
const File = require('./File');
const Command = require('./Command');
const Repository = require('./Repository');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function VMGitContoller() {
    this.FILE_STATUS = ['untracked', 'modified', 'staged', 'unmodified'];
    this.commands = [];
    this.remoteRepositories = new Map();
    this.localRepositories = new Map();
    this.prmt = "/>";
}

VMGitContoller.prototype = {
    runVmGit: function () {
        console.log("run...");
        rl.setPrompt(this.prmt);
        rl.prompt();
        rl.on('line', (cmd) => {
            if (cmd === "quit") {
                rl.close();
            } else {
                this.setCommand();
                this.runCommand(cmd);
            }
        });
    },
    setCommand: function() {

    }
    ,
    runCommand: function (cmd) {
        
    }
}

module.exports = VMGitContoller;