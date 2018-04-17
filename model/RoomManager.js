var Room = require("./Room");

class RoomManager {
    constructor() {
       this.rooms = [];
    }

    addRoom (room) {
        this.rooms.push(room);
    }
    
    removeRoom (id) {
        this.rooms = this.rooms.filter((item, index, arr) => item.id != id);
    }

    getRoomList() {
        return this.rooms;
    }
}

let roomManager = new RoomManager();
module.exports =  roomManager; 

