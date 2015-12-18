var socketio = require("socket.io"),
    io,
    guestNumber = 1,
    nickNames = {},
    namesUsed = [],
    currentRoom = {};

    //生产一个guestName
    function assignGuestName(socket, guestNumber, nickNames, namsUsed){
        var name = "Guest" + guestNumber;
        console.log("guestNumber : " + name);
        nickNames[socket.id] = name;

        socket.emit('nameResult', {
            success : true,
            name : name
        })
        namesUsed.push(name);
        return guestNumber + 1
    }

    //加入到聊天室
    function joinRoom(socket, room){
        socket.join(room);
        currentRoom[socket.id] = room;
        socket.emit("joinResult"), {room: room});

        socket.broadcast.to(room).emit("message", {
            text : nickNames[socket.id] + "has joined " + room + "."
        });

        var userInRoom = io.socket.clients(room);
        if(usersInRoom.length > 1){
            var usersInRoomSummary = 'Users currently in ' + room + ": ";
            for (var index in userInRoom){
                var userSocketId = userInRoom[index].id;
                if(userSocketId != socket.id){
                    if(index > 0){
                        usersInRoomSummary += ', ';
                    }
                    usersInRoomSummary += nickNames[userSocketId];
                }
            }
        }

        usersInRoomSummary += '.';
        socket.emit('message', {text : usersInRoomSummary});
    }

    //最终抛出的方法
    exports.listen = function(server){
        //启动io服务器，在已有的http服务器上
        io = socketio.listen(server);
        io.set('log level', 1);

        //建立连接
        io.sockets.on('connection', function(socket){
            //如果有用户连接上，给一个用户名
            guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);

            //加入到lobby 的聊天室里
            joinRoom(socket, 'Lobby');
            //处理用户消息更名，聊天室变更
            handleMesssageBroadcasting(socket, nickNames);
            handleNameChangeAttempts(socket, nickNames, namesUsed);
            handleRoomJoining(socket);

            //获取聊天室列表
            socket.on('rooms', function(){
                socket.emit('room', io.socket.manager.rooms);
            });

            //清除socket逻辑
            handleClientDisconnection(socket, nickNames, namesUsed);
        })
    }