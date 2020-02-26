const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',(client) => {
  client.emit('send', 'abc')
  client.broadcast.emit('list', 'test')
  client.on('backend', msg =>{
    console.log(msg)
  })
  client.on('receive', msg =>{
    console.log(msg)
    client.broadcast.emit('message', msg)
  })

})


server.listen(8081, '0.0.0.0', ()=>{
  console.log('server start')
})