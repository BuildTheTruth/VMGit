const Command =require('./Command');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function VMGitContoller() {
    this.FILE_STATUS = ['untracked', 'modified', 'staged', 'unmodified'];
    this.localRepositories = new Map();
    this.remoteRepositories = new Map();
    this.prmt = "/>";
}

VMGitContoller.prototype = {
    runVmGit: function () {
        console.log("run...");
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
            command = new Command(cmd,  this.localRepositories, this.remoteRepositories);
            command.run();
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = VMGitContoller;
