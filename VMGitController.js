const Repository = require('./Repository');
const File = require('./File');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function VMGitContoller() {
    this.FILE_STATUS = ['untracked', 'modified', 'staged', 'unmodified'];
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
                this.runCommand(cmd);
            }
        });
    },
    runCommand: function (cmd) {
        
    }
}

module.exports = VMGitContoller;