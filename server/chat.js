var express = require('express');
var router = express.Router();
var server = require('http').Server(global.app);
var io = require('socket.io')(server);
var chatPort = 7050;

server.listen(chatPort, function () {
  console.log("Server listening on: http://localhost:%s", chatPort);
});

var usernames = {};
var rooms = [];
var roomsUsers = [];

io.sockets.on('connection', function (socket) {

  var createRoom = function(data) {
    console.log('data server',data);
      var new_room = data.room;
      rooms.push(new_room);
      if(roomsUsers.indexOf(data.username) === -1) {
        roomsUsers.push(data.username);
      }
      data.room = new_room;
      socket.emit('roomcreated', data);
  };

    socket.on('adduser', function (data) {
        var username = data.username;
        var room = data.room;

        if (rooms.indexOf(room) != -1) {
            socket.username = username;
            socket.room = room;
            usernames[username] = username;
            if(roomsUsers.indexOf(data.username) === -1) {
              roomsUsers.push(data.username);
            }
            socket.join(room);
            socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting', roomsUsers);
            socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
        } else {
          createRoom(data);
        }
    });

    socket.on('sendchat', function (data) {
        io.sockets.in(socket.room).emit('updatechat', socket.username, data, roomsUsers);
    });

    socket.on('userconnect', function (data) {
      io.sockets.emit('userconnection', data);
    });

    socket.on('disconnect', function () {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        if (socket.username !== undefined) {
            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected', roomsUsers);
            socket.leave(socket.room);
        }
    });
});

router.get('/chat', function(req, res, next) {
  res.json({
     success: true,
     data: io.sockets
   });
});

module.exports = router;
