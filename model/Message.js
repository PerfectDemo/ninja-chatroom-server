class Message {
    constructor(content, user) {
        this.content = content;
        this.user = user;
    }

    getContent() {
        return this.content;
    }

    getUser() {
        return this.user;
    }
}

module.exports = Message;