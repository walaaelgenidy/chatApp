const express = require('express');
const socket = require('socket.io');
//app setup
const app = express();
const server = app.listen(4000, ()=>{
    console.log('listing to port 4000');
});
 
//static files
app.use(express.static('public'));

// Socket setup & pass server
let io = socket(server);



io.on('connection',(socket)=> {
    console.log('made socket connection' , socket.id);

    // Handle chat event
    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data);
    });

     // Handle typing event
     socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });
});