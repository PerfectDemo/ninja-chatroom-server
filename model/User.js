class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.currentRoomId = null;
    }
    
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    setCurrentRoom(id) {
        this.currentRoomId = id;
    }

    getCurrentRoomId() {
        return this.currentRoomId;
    }
}

module.exports = User;