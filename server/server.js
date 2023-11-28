require('dotenv').config()
const PORT = process.env.PORT;
const express = require('express')
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'index.html'))
})

io.on('connection', (socket) => {
    console.log('User conncted');
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    })
})

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});