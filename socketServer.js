const User = require( './model/User');
const Room = require( './model/Room');
const Message = require('./model/Message');
const RoomManager = require('./model/RoomManager');
const server = require('socket.io');

var roomMaxId = 0;
var personNum = 0;


module.exports = function(_server) {
    var io = server(_server);

    io.on('connection', function(socket) {  

        var user;

        console.log('hello!');
        
        socket.emit('roomList', RoomManager.getRoomList());

        socket.on('enterName', function(name) {
            personNum++;
            console.log('[NEW USER]:', name);
            user = new User(personNum, name);
            socket.emit('enterName', user);
        });

        socket.on('createRoom', function(_room) {
            roomMaxId ++;
            var room = new Room(roomMaxId, _room.name);
            RoomManager.addRoom(room);
            console.log('[NEW ROOM]:', room);
            console.log('[ROOMLIST]:', RoomManager.getRoomList());
            io.sockets.emit('roomList', RoomManager.getRoomList());
        });

        socket.on('removeRoom', function(room) {
            RoomManager.removeRoom(room.id);
            socket.emit('removeRoom', RoomManager.getRoomList());
        });

        socket.on('joinRoom', function(id) {            
            socket.join(id);
            user.setCurrentRoom(id);
            RoomManager.
            socket.emit('joinRoom', user);
            console.log('[JOIN ROOM]:', id);
        });

        socket.on('leaveRoom', function(id) {           
            socket.leave(id);
            user.setCurrentRoom(null);
            socket.emit('leaveRoom', user);
            console.log('[LEAVE ROOM]:', id);
        });

        socket.on('sendMessage', function(content) {
            var message = new Message(content, user);
            console.log('[MESSAGE]:', message);
            io.sockets.to(message.user.getCurrentRoomId()).emit('sendMessage', message);
        });

        socket.on('disconnect', function() {
            if (user) {
                console.log('[USER LEAVED]:', user.getName());
                personNum--;
            }         
        });

    });
}