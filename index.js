import express from 'express'
import { Server } from 'socket.io'
const app = express() 
import { createServer } from 'http'


const server = createServer(app)

const io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

io.on('connection',(socket)=>{
    console.log("user connected ==>",socket.id);
    socket.on('join_room',(room)=>{
        socket.join(room)
        console.log('user join a room ',room);
    })
    socket.on('send_message',(message)=>{
        console.log('send message',message);
io.to(message.room).emit('new_message',{id:new Date().getTime(),...message})
    })
    socket.on('disconnect',()=>{
        console.log("user disconnected",socket.id);
    })
})

app.get('/',(req,res)=>{
    res.send('<h1>Hello world</h1>')
})

server.listen(4000,()=>{
    console.log("server runing ....");
})