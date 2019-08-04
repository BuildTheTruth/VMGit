const MESSAGE_MAP = new Map();

MESSAGE_MAP.set("UNDEFINED_COMMAND", "알 수 없는 명령어입니다.");
MESSAGE_MAP.set("UNDEFINED_REPOSITORY", "존재하지 않는 저장소입니다.");
MESSAGE_MAP.set("EMPTY_NAME", "이름이 입력되지 않았습니다.");
MESSAGE_MAP.set("EMPTY_MSG", "커밋 메시지가 입력되지 않았습니다.");

module.exports = MESSAGE_MAP;