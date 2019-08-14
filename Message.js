const ERROR = {
    UNDEFINED_COMMAND: "This is undefined command.",
    UNDEFINED_REPOSITORY: "The repository of input name is undefined.",
    UNCHECKOUTED_REPOSITORY: "Select the repository you want to checkout at first.",
    UNDEFINED_FILE: "The file of input name is undefined.",
    EMPTY_NAME: "You should input the name.",
    EMPTY_COMMIT: "You should input a message for commit."
}

const DESC = {
    INIT: "Create new repository in the local.",
    STATUS: "Show current situation in the local or remote repository.",
    CHECKOUT: "Select the repository to control",
    NEW: "Create new file in checkouted repository.",
    ADD: "Move a file from working directory to staging area.",
    COMMIT: "Move the files from staging area to git repository.",
    TOUCH: "Modify the file.",
    LOG: "Show logs committed message and list of files.",
    PUSH: "Move the files from local repository to remote repository.",
    HELP: "Show the information of commands."
};

module.exports = [ERROR, DESC];
