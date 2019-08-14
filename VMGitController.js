const Command =require('./Command');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function VMGitContoller() {
    this.localRepositories = new Map();
    this.remoteRepositories = new Map();
    this.command = new Command(this.localRepositories, this.remoteRepositories);
    this.prmt = this.command.getPrompt();
}

VMGitContoller.prototype = {
    runVmGit: function () {
        console.log("***Virtual Machine Git***");
        console.log("/>help: give you command information.");
        rl.setPrompt(this.prmt);
        rl.prompt();
        rl.on('line', (cmd) => {
            if (cmd === "quit" || cmd === 'q') {
                rl.close();
            } else {
                this.runCommand(cmd);
                rl.prompt();
            }
        });
    },
    runCommand: function (cmd) {
        try {
            this.command.set(cmd);
            this.command.run();
            this.prmt = this.command.getPrompt();
            rl.setPrompt(this.prmt);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = VMGitContoller;
