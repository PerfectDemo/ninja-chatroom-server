class Room {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.users = [];
    }

    addUser (user) {
        users.push(user);
    }

    removeUser (id) {
        this.users = this.users.filter((item, index, arr) => id != item.id);
    }
}

module.exports = Room;