const ERROR = {
    UNDEFINED_COMMAND: "알 수 없는 명령어입니다.",
    UNDEFINED_REPOSITORY: "존재하지 않는 저장소입니다.",
    UNCHECKOUTED_REPOSITORY: "먼저 저장소를 선택해주세요.",
    UNDEFINED_FILE: "존재하지 않는 파일입니다.",
    EMPTY_NAME: "이름이 입력되지 않았습니다.",
    EMPTY_COMMIT: "커밋 메시지가 입력되지 않았습니다."
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
