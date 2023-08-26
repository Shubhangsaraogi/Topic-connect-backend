require('dotenv').config();
const express = require('express');
const cors =require('cors');
const http = require('http');
const {Server} = require('socket.io');

const app =express();
app.use(cors());
const server = http.createServer(app);

console.log(process.env.FORNTEND_URI);
const io = new Server(server,{
    cors:{
        origin:process.env.FORNTEND_URI
    }
})

io.on("connection",(socket)=>{
    // console.log(socket.id);
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User with socket ID:${socket.id} joined room id:${data}`);
    })
    socket.on("send_message",(data)=>{
        socket.to(data.Room).emit("received_message",data);
    })
    io.on("disconnect",()=>{
        console.log("disconnect"+socket.id);
    })
})
server.listen(5000,()=>{
    console.log("server is listening on port: 5000");
});