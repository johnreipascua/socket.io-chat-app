const app = require('express')();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
const client = process.env.CLIENT || 'http://localhost:3000';
console.log(`Client: ${client}`)

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: client
    }
});

io.on('connection', (socket) => {
    console.log('User Connected: ', socket.id);
    let user = '';
    let roomId = 

    socket.on('join', ({ username, room }) => {
        user = username;
        roomId = room;
        console.log(`${username} joined room ${room}`)

        const message = { notif: `${username} joined the room.` }
        socket.join(room);
        socket.to(room).emit('receive', message);
    });

    socket.on('send', message => {
        socket.to(message.room).emit('receive', message);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected: ', socket.id);
        const message = { notif: `${user} left the room.` }
        socket.to(roomId).emit('receive', message);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}...`));