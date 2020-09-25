const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


io.on('connection', socket =>{
    socket.on('message', ({name, message}) =>{
        io.emit('message', {name,message})
    })
})

http.listen(3000, () =>{
    console.log("Escuchando en el puerto 3000")
})