const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const io = socketio(server);
app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, "public")));
require('dotenv').config();
const {PORT, HOST} = process.env;

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data})
    })
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id)
    })
});


app.get('/', (req, res)=>{
    res.render('index.js');
})
server.listen(PORT,()=>{ console.log('the server is running at '+ HOST+ PORT)}
);