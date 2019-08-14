const ERROR = {
    UNDEFINED_COMMAND: "This is undefined command.",
    UNDEFINED_REPOSITORY: "The repository of input name is undefined.",
    UNCHECKOUTED_REPOSITORY: "Select the repository you want to checkout at first.",
    UNDEFINED_FILE: "The file of input name is undefined.",
    EMPTY_NAME: "You should input the name.",
    EMPTY_COMMIT: "You should input a message for commit."
}

const DESC = {
    INIT: "Create new repository in the local. \n/>init repository_name",
    STATUS: "Show current situation in the local or remote repository. \n/>status local repository_name | status remote repository_name | status",
    CHECKOUT: "Select the repository to control \n/>checkout repository_name",
    NEW: "Create new file in checkouted repository. \n/>new file_name",
    ADD: "Move a file from working directory to staging area. \n/>add file_name",
    COMMIT: "Move the files from staging area to git repository. \n/>commit message",
    TOUCH: "Modify the file. \n/>touch file_name",
    LOG: "Show logs committed message and list of files. \n/>log",
    PUSH: "Move the files from local repository to remote repository. \n/>push",
    HELP: "Show the information of commands. \n/>help"
};

module.exports = [ERROR, DESC];
